import Str from '@/utils/Str';
import React, { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

// Define the Route interface
interface Route {
  uri: string;
  uri_methods: string;
  slug: string;
  title: string;
  folder: string;
  hidden: boolean;
  methods: string[];
  children?: Routes;
}

// Define the RouteWithChildren interface
interface RouteWithChildren {
  routes: Route[];
  children: Routes;
}

// Define the Routes interface as a dictionary with string keys and RouteWithChildren values
interface Routes {
  [key: string]: RouteWithChildren;
}

// Define the PermissionsProps interface for handling permissions
interface PermissionsProps {
  folders: string[];
  permissions: any[];
  allPermissions: any[];
}

// Define the Props interface for the RoutesTree component
interface Props {
  routes: Routes;
  permissions: string[];
  handleSubmit: ({ folders, permissions }: PermissionsProps) => void;
  saving: boolean;
}

// Constants used for managing the component behavior
const PARENT_FOLDER_ID_PREFIX = 'parent-folder-';
const MAIN_CONTAINER_CLASS = 'nested-routes';
const PARENT_CHILDREN_CLASS = 'parent-children';
const ROUTE_CHECKBOX_CLASS = 'routecheckbox';

// Function to handle toggling the display of child routes
function handleToggle(key: string) {
  const target = document.getElementById(`${PARENT_FOLDER_ID_PREFIX}${key}-${PARENT_CHILDREN_CLASS}`);
  target?.classList.toggle('d-none');
}

// Function to handle toggling checkboxes for parent routes
function handleToggleCheck(parentId: string, action: boolean | null = null) {

  const targetElement = document.getElementById(parentId) as HTMLInputElement; // Narrow the type to HTMLInputElement
  const targetCheckbox = targetElement.querySelector(`.parent-checkbox`) as HTMLInputElement;

  if (targetCheckbox) {

    // real user clicking on handleToggleCheck
    if (typeof action !== 'boolean') {

      action = targetCheckbox.checked

      const inputs = targetElement.querySelectorAll<HTMLInputElement>(`input[id$="-child-checkbox"], input[id$="-parent-checkbox"]`);
      inputs.forEach((input) => {
        input.indeterminate = false
        if (action !== null)
          input.checked = action
      });

      targetCheckbox.indeterminate = false

    } else {
      // assist programmatic click

      const checked = targetElement.querySelectorAll(`input[type="checkbox"]:checked.${ROUTE_CHECKBOX_CLASS}`).length;
      const unchecked = targetElement.querySelectorAll(`input[type="checkbox"]:not(:checked).${ROUTE_CHECKBOX_CLASS}`).length;
      if (checked === 0) {
        targetCheckbox.checked = false;
        targetCheckbox.indeterminate = false;

      } else {
        if (unchecked === 0) {
          targetCheckbox.checked = true;
          targetCheckbox.indeterminate = false;
        } else
          targetCheckbox.indeterminate = true;
      }

    }

    if (action === true) {
      // should checkup recursivley -:) <<<---recursion
      checkUpRecursivley(targetElement)
    }
    else {
      // should uncheckup recursivley (:- <<<---recursion
      uncheckUpRecursivley(targetElement)
    }
  }
}

// Recursive function to handle checking parent checkboxes upwards in the tree
function checkUpRecursivley(parentElement: HTMLElement) {
  // Find the closest grandparent
  let grandParent = parentElement;

  // this will help us not repeat the action on targetFolder
  let targetFolderId = grandParent.id

  while (grandParent) {

    if (grandParent.id.match(new RegExp("^" + PARENT_FOLDER_ID_PREFIX)) && grandParent.classList.contains('parent-folder') && grandParent.id != targetFolderId) {

      grandParent.querySelector('.toggler')?.classList.toggle('bg-info-subtle');

      const grandParentCheckbox = grandParent.querySelector(`input[id$="-parent-checkbox"]`) as HTMLInputElement;

      if (grandParentCheckbox) {

        const unchecked = grandParent.querySelectorAll(`input[type="checkbox"]:not(:checked).${ROUTE_CHECKBOX_CLASS}`).length;

        if (unchecked === 0) {
          grandParentCheckbox.checked = true;
          grandParentCheckbox.indeterminate = false;

        } else {
          grandParentCheckbox.checked = false;
          grandParentCheckbox.indeterminate = true;
        }

      }

    }
    

    grandParent = grandParent.parentElement;

    if (grandParent?.classList.contains(MAIN_CONTAINER_CLASS)) {
      break;
    }

  }
}

function uncheckUpRecursivley(targetElement: any) {

  // Find the closest grandparent
  let grandParent = targetElement;

  // this will help us not repeat the action on targetFolder
  let targetFolderId = grandParent.id

  while (grandParent) {

    if (grandParent.id.match(new RegExp("^" + PARENT_FOLDER_ID_PREFIX)) && grandParent.classList.contains('parent-folder') && grandParent.id != targetFolderId) {

      grandParent.querySelector('.toggler').classList.toggle('bg-success-subtle');

      const grandParentCheckbox = grandParent.querySelector(`input[id$="-parent-checkbox"]`);

      if (grandParentCheckbox) {

        const checked = grandParent.querySelectorAll(`input[type="checkbox"]:checked.${ROUTE_CHECKBOX_CLASS}`).length;
        const unchecked = grandParent.querySelectorAll(`input[type="checkbox"]:not(:checked).${ROUTE_CHECKBOX_CLASS}`).length;

        if (checked === 0) {
          grandParentCheckbox.checked = false;
          grandParentCheckbox.indeterminate = false;

        } else {
          if (unchecked === 0) {
            grandParentCheckbox.checked = true;
            grandParentCheckbox.indeterminate = false;
          } else
            grandParentCheckbox.indeterminate = true;
        }

      }

    }

    grandParent = grandParent.parentElement;

    if (grandParent?.classList.contains(MAIN_CONTAINER_CLASS)) {
      break;
    }

  }
}

function handleCheckedSingle(e = null) {

  const action = e?.target.checked

  const parentElement = e.target.closest(`li[id^="${PARENT_FOLDER_ID_PREFIX}"]`)
  const parentCheckbox = parentElement.querySelector<HTMLInputElement>(`input[id$="-parent-checkbox"]`);

  const checked = parentElement.querySelectorAll<HTMLInputElement>(`input[type="checkbox"]:checked.${ROUTE_CHECKBOX_CLASS}`).length;
  const unchecked = parentElement.querySelectorAll<HTMLInputElement>(`input[type="checkbox"]:not(:checked).${ROUTE_CHECKBOX_CLASS}`).length;

  if (unchecked === 0) {
    parentCheckbox.indeterminate = false;
    parentCheckbox.checked = true;
  } else {
    if (checked > 0) {
      parentCheckbox.indeterminate = true;
      parentCheckbox.checked = false;
    } else {
      parentCheckbox.indeterminate = false;
      parentCheckbox.checked = false;
    }

  }

  const key = parentElement.id

  handleToggleCheck(key, action)

}

// Use the debounce function for checkbox checking logic
const debouncedHandleCheckedSingle = debounce(handleCheckedSingle, 100);

// Function to find a permission based on uriMethods
function found(uriMethods: string, permissions: any) {
  return !!permissions?.find((permission) => permission.uri === uriMethods);
}

// Function to determine whether a checkbox should be checked or not
function shouldCheckCheckbox(inputId: string, uriMethods: string, permissions: string[]): boolean {

  const exists = found(uriMethods, permissions)

  if (exists) {
    const checkbox = document.getElementById(inputId)
    if (checkbox) {
      checkbox.checked = true
      const parentElement = checkbox.closest(`li[id^="${PARENT_FOLDER_ID_PREFIX}"]`)
      if (parentElement) {
        const key = parentElement.id
        handleToggleCheck(key, true)
      } else {
        console.log('no parent')
      }
    }
  }

}

// Recursive function to construct the menu tree structure
function constructMenuRecursively(folderElement: HTMLElement, counter: number) {
  counter += 1

  const childrenContainers = folderElement?.querySelectorAll(`.COUNTER${counter}>li[id^="${PARENT_FOLDER_ID_PREFIX}"]`)


  const nestedRoutes = [];

  for (const container of childrenContainers) {
    const input = container.querySelector(`input[id$="-parent-checkbox"]`);

    if (input && (input.checked || input.indeterminate)) {
      const children = constructMenuRecursively(container, counter);

      const title = container.querySelector('.folder-title').value
      const icon = container.querySelector('input.folder-icon').value
      const hidden = container.querySelector('input.folder-hidden').checked

      nestedRoutes.push({ folder: input.value, title, icon, hidden, children, routes: getRoutes(container) });
    }
  }

  return nestedRoutes;
}

// Function to get the selected routes for a given parent container
function getRoutes(container: any) {
  const id = container.id
  const routes = container.querySelectorAll(`#${id}-parent-children>.routes-table .route-section`)

  const items = []
  for (const route of routes) {

    const input = route.querySelector('input[type="checkbox"]')

    if (input.checked) {
      const title = route.querySelector('input.route-title').value
      const icon = route.querySelector('input.folder-icon').value
      const hidden = route.querySelector('input.folder-hidden').checked

      if (hidden === false)
        items.push({ uri: input.value, title, icon })
    }
  }

  return items
}


// Function to construct the menu structure
function constructMenu() {
  const topLevelFolders = document.querySelectorAll(`ul.${MAIN_CONTAINER_CLASS}.main-tree>li[id^="${PARENT_FOLDER_ID_PREFIX}"]`);
  const nestedRoutes = [];

  const counter = 0
  for (const container of topLevelFolders) {
    const input = container.querySelector(`input[id$="-parent-checkbox"]`);

    if (input && (input.checked || input.indeterminate)) {
      const title = container.querySelector('.folder-title').value
      const children = constructMenuRecursively(container, counter);
      const icon = container.querySelector('input.folder-icon').value
      const hidden = container.querySelector('input.folder-hidden').checked

      nestedRoutes.push({ folder: input.value, title, icon, hidden, children, routes: getRoutes(container) });
    }
  }

  return nestedRoutes;
}

// Function to get the icon for a route based on its permissions
function getRouteIcon(allPermissions: any[], uri: string) {
  let icon = ''
  if (allPermissions) {

    const res = allPermissions.find((permission) => permission.uri == uri)
    if (res)
      icon = res.icon === null ? '' : res.icon

  }

  return icon

}

// The main RoutesTree component
const RoutesTree: React.FC<Props> = ({ routes, permissions, allPermissions, handleSubmit, saving }) => {

  const [isInitialRender, setIsInitialRender] = useState(true);

  // Run checkbox checking logic once on component render
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false); // Set isInitialRender to false after the initial render
    }
  }, []);

  return (
    <div className='bg-gray-50 shadow w-100 p-2'>
      <form
        action=''
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          handleSubmit(constructMenu());
        }}
      >
        <ul className={`list-unstyled ${MAIN_CONTAINER_CLASS} main-tree COUNTER0`}>
          {allPermissions && renderRoutes(routes, 0, '', permissions, allPermissions, isInitialRender, 0)}
        </ul>
      </form>
    </div>
  );
};

const renderRoutes = (
  routes: Routes,
  indent = 0,
  prevFolderName = '',
  permissions: string[],
  allPermissions: any,
  isInitialRender: boolean,
  counter: number,
) => {
  indent += 1;
  counter += 1;

  return Object.keys(routes).map((key) => {
    let { children } = routes[key];
    const routeList = children?.routes ?? [];

    let others;
    if (children) {
      const { routes: unwanted, ...rest } = children;
      others = rest;
    }

    children = others;

    const currentId = Str.slug((prevFolderName + '/' + key).replace(/^\//, ''));

    const parentFolder = (prevFolderName + '/' + key).replace(/^\//, '');

    const parentChecked = !!found(parentFolder, permissions)

    return (
      <li key={currentId} className={`mt-1 parent-folder`} id={`${PARENT_FOLDER_ID_PREFIX}${currentId}`}>
        <div className='folder-section toggler-section mb-2 px-1 border bg-white d-flex align-items-center justify-content-between rounded gap-2'>
          <div className='col-8 d-flex'>
            <label className='form-check-label px-0.5 d-flex align-items-center cursor-pointer'>
              <input
                type='checkbox'
                id={`${currentId}-parent-checkbox`}
                value={parentFolder}
                className='form-check-input me-2 parent-checkbox'
                onChange={() => handleToggleCheck(`${PARENT_FOLDER_ID_PREFIX}${currentId}`)}
              />
              <input
                type='hidden'
                className='folder-title'
                value={key}
              />
            </label>
            <label className='toggler text-base flex-grow-1 border flex-grow-1 py-2 ps-1 pe-0 rounded' onClick={() => handleToggle(currentId)}>{key}</label>
          </div>
          <div className='bg-light col-4 d-flex justify-content-between rounded gap-1'>
            <label>
              <input placeholder='Icon' style={{ width: '100px' }} type="text" id={`${parentFolder}-folder-icon`} className='folder-icon ms-1 border border-secondary rounded' />
            </label>
            <label className='form-check-label d-flex align-items-center cursor-pointer'>
              <input
                type='checkbox'
                id={`${currentId}-folder-hidden`}
                className='form-check-input me-2 folder-hidden'
              />
              Hidden
            </label>
          </div>
        </div>

        <ul id={`${PARENT_FOLDER_ID_PREFIX}${currentId}-parent-children`} className={`parent-children list-unstyled ms-${indent} d-none my-1`}>
          {
            routeList.length > 0 &&
            <table className='routes-table table table-responsive shadow-sm table-striped table-hover ms-3'>
              <thead>
                <tr>
                  <th></th>
                  <th className='align-text-start'>Route name</th>
                  <th className='align-text-start'>Methods</th>
                  <th className='align-text-start'>Icon/Hidden</th>
                </tr>
              </thead>
              <tbody>

                {routeList.map((route, i) => {

                  return (
                    <tr className='link routes-parent route-section' key={`${i}+${key}_${route.slug}`}>
                      <td className='col-1 border border-right cursor-pointer'>
                        <label className="form-check-label py-1 px-3 d-flex gap-2 rounded w-100 cursor-pointer" title={route.uri_methods}>
                          <input
                            type='checkbox'
                            value={route.uri_methods}
                            id={`${Str.uriMethods(route.uri_methods)}-child-checkbox`}
                            className={`${ROUTE_CHECKBOX_CLASS} form-check-input me-2`}
                            onChange={(e) => debouncedHandleCheckedSingle(e, currentId, true, true)}
                            data-checked={parentChecked && shouldCheckCheckbox(`${Str.uriMethods(route.uri_methods)}-child-checkbox`, route.uri_methods, permissions)}
                          />
                          <input
                            type='hidden'
                            className='route-title'
                            value={route.title}
                          />
                          <input
                            type='hidden'
                            className='folder-hidden'
                            value={route.hidden}
                          />
                        </label>
                      </td>
                      <td className='col-6 align-text-start' title={route.uri_methods}>
                        {route.title}
                      </td>
                      <td className='col-3 align-text-start' title={route.methods || 'GET'}>
                        <span className="d-inline-block text-truncate" style={{ maxWidth: '170px' }}>
                          {route.methods || 'GET'}
                        </span>
                      </td>
                      <td className='col-2 align-text-start'>
                        <div className='bg-light col-4 d-flex justify-content-between rounded gap-1'>
                          <label>
                            <input placeholder='Icon' defaultValue={getRouteIcon(allPermissions, route.uri_methods)} style={{ width: '100px' }} type="text" className='folder-icon ms-1 border border-secondary rounded' />
                          </label>
                          <label className='form-check-label d-flex align-items-center cursor-pointer'>
                            <input
                              type='checkbox'
                              defaultChecked={route.hidden}
                              className='d-none folder-hidden'
                            />
                            {route.hidden ? 'True' : 'False'}
                          </label>
                        </div>
                      </td>
                    </tr>
                  )
                })
                }
              </tbody>
            </table>
          }

          {children && Object.keys(children).length > 0 && (
            <li className={`has-dropdown ms-${indent}`}>
              <ul className={`list-unstyled dropdown COUNTER${counter}`}>
                {renderRoutes(children, indent, prevFolderName + '/' + key, permissions, allPermissions, isInitialRender, counter,)}
              </ul>
            </li>
          )}
        </ul>
      </li>
    );
  });
};

export default RoutesTree;
