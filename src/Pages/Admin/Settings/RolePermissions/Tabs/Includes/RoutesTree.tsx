import Str from '@/utils/Str';
import React, { useEffect, useState } from 'react';
import debounce from 'lodash/debounce'; // Import the debounce function from lodash

interface Route {
  uri: string;
  uri_methods: string;
  slug: string;
  title: string;
  folder: string;
  hidden: boolean;
  methods: string[]; // Add the 'methods' property to the interface
  children?: Routes;

}

interface RouteWithChildren {
  routes: Route[];
  children: Routes;
}

interface Routes {
  [key: string]: RouteWithChildren;
}

interface permissionsProps {
  permissions: string[],
  folder_icons: string[],
  hidden_folders: string[],
}
interface Props {
  routes: Routes;
  permissions: string[]; // array of strings
  handleSubmit: ({ permissions, folder_icons, hidden_folders }: permissionsProps) => void; // Update the type of handleSubmit accordingly
  saving: boolean
}

const PARENT_FOLDER_ID_PREFIX = 'parent-folder-';
const MAIN_CONTAINER_CLASS = 'nested-routes';
const PARENT_CHILDREN_CLASS = 'parent-children';
const ROUTE_CHECKBOX_CLASS = 'routecheckbox';

function handleToggle(key: string) {
  const target = document.getElementById(key);
  target?.classList.toggle('d-none');
}


function handleToggleCheck(key: string) {
  const target = document.getElementById(`${key}-checkbox`) as HTMLInputElement;
  const inputs = document.querySelectorAll<HTMLInputElement>(`#${key} input`);

  if (target) {
    inputs.forEach((input) => (input.checked = target.checked));
    debouncedHandleCheckedSingle(key, false); // Call debouncedHandleCheckedSingle to handle bubbling up
  }
}

function handleCheckedSingle(key: string, indeterminate = true, hideEmptyFolders = false) {
  const parentCheckbox = document.querySelector<HTMLInputElement>(`#${key}-checkbox`);
  const hiddenCheckbox = document.querySelector<HTMLInputElement>(`#${key}-hidden-checkbox`);

  if (parentCheckbox) {
    const checked = document.querySelectorAll<HTMLInputElement>(`#${PARENT_FOLDER_ID_PREFIX}${key} .${PARENT_CHILDREN_CLASS} input[type="checkbox"]:checked.${ROUTE_CHECKBOX_CLASS}`).length;
    const unchecked = document.querySelectorAll<HTMLInputElement>(`#${PARENT_FOLDER_ID_PREFIX}${key} .${PARENT_CHILDREN_CLASS} input[type="checkbox"]:not(:checked).${ROUTE_CHECKBOX_CLASS}`).length;

    if (unchecked === 0) {
      parentCheckbox.indeterminate = false;
      parentCheckbox.checked = true;

      if (hiddenCheckbox && hiddenCheckbox.checked) {
        // Mark the folder as hidden if the hidden checkbox is checked
      }

      // Uncheck parent checkboxes recursively up the tree
      uncheckParentRecursively(parentCheckbox, key);
    } else {
      parentCheckbox.checked = false;
      if (indeterminate === false) parentCheckbox.indeterminate = false;
      else {

        if (checked === 0) {
          parentCheckbox.indeterminate = false
        } else {
          parentCheckbox.indeterminate = true;
        }
      }

      if (checked == 0) {
        console.log(hideEmptyFolders)
        // Should HideEmptyRoutes Folder

        if (hideEmptyFolders) {
          // shouldHideEmptyFolders(parentCheckbox, key)
        }
      }

      // Uncheck parent checkboxes recursively up the tree
      uncheckParentRecursively(parentCheckbox, key);
    }
  }
}

function shouldHideEmptyFolders(parentCheckbox: Element, key: string) {
  const hiddenFolderCheckbox = parentCheckbox.closest(`.folder-section`)?.querySelector(`input#${key}-hidden-folder-toggler`)
  if (hiddenFolderCheckbox) hiddenFolderCheckbox.checked = true

}

// Use the debounce function for checkbox checking logic
const debouncedHandleCheckedSingle = debounce(handleCheckedSingle, 100);

function uncheckParentRecursively(parentCheckbox: HTMLInputElement, key: string) {
  // Find the closest grandparent
  let grandParent = parentCheckbox.closest(`[id="${PARENT_FOLDER_ID_PREFIX}${key}"]`);

  while (grandParent) {
    if (grandParent.id.match(/parent-folder-.*/) && grandParent.id !== `${PARENT_FOLDER_ID_PREFIX}${key}`) {
      const grandParentCheckbox = grandParent.querySelector<HTMLInputElement>('input[type="checkbox"]');

      if (grandParentCheckbox) {

        const unchecked = grandParent.querySelectorAll<HTMLInputElement>(`#${PARENT_FOLDER_ID_PREFIX}${key} .${PARENT_CHILDREN_CLASS} input[type="checkbox"]:not(:checked).${ROUTE_CHECKBOX_CLASS}`).length;

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

function shouldCheckCheckbox(currentId: string, uriMethods: string, permissions: string[]): boolean {

  if (permissions?.includes(uriMethods)) {
    handleCheckedSingle(currentId);
    return true;
  }
  return false;
}

function getAllCheckboxStates() {
  const inputs = document.querySelectorAll<HTMLInputElement>(`.${MAIN_CONTAINER_CLASS} input[type="checkbox"]:not(.hidden-folder-toggler)`);

  const items = [];

  for (const input of inputs) {
    if (input.checked || input.indeterminate) {
      items.push(input.value);
    }
  }

  return items;
}

function getAllHiddenFolders() {
  const inputs = document.querySelectorAll<HTMLInputElement>(`.${MAIN_CONTAINER_CLASS} input[type="checkbox"].hidden-folder-toggler`);

  const items = [];

  for (const input of inputs) {
    if (input.checked) {
      items.push(input.value);
    }
  }

  return items;
}

function getAllFoldersIcons() {
  const inputs = document.querySelectorAll<HTMLInputElement>(`.${MAIN_CONTAINER_CLASS} input[type="text"].folder-icon`);

  const items = [];

  for (const input of inputs) {
    const folder = (input.id).replace(/-icon$/, '')

    items.push([folder, input.value]);
  }

  return items;
}

const RoutesTree: React.FC<Props> = ({ routes, permissions, handleSubmit, saving }) => {
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
          handleSubmit({ permissions: getAllCheckboxStates(), folder_icons: getAllFoldersIcons(), hidden_folders: getAllHiddenFolders() });
        }}
      >
        <ul className={`list-unstyled ${MAIN_CONTAINER_CLASS} main`}>
          {renderRoutes(routes, 0, '', permissions, isInitialRender)}
        </ul>
        <div className='d-flex justify-content-end'>
          <button type="submit" className="btn btn-info text-white">{saving ? 'Saving checked...' : 'Save checked'}</button>
        </div>
      </form>
    </div>
  );
};

const renderRoutes = (
  routes: Routes,
  indent = 0,
  prevFolderName = '',
  permissions: string[],
  isInitialRender: boolean
) => {
  indent += 3;

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

    const parentChecked = permissions && permissions.includes(parentFolder)

    return (
      <li key={currentId} className={`mt-1`} id={`${PARENT_FOLDER_ID_PREFIX}${currentId}`}>
        <div className='folder-section toggler-section mb-2 px-1 border bg-white d-flex align-items-center justify-content-between rounded gap-2'>
          <div className='col-8 d-flex'>
            <label className='bg-body-secondary form-check-label px-2 d-flex align-items-center cursor-pointer'>
              <input
                type='checkbox'
                id={`${currentId}-checkbox`}
                value={[parentFolder, key]}
                className='form-check-input me-2'
                onClick={() => handleToggleCheck(currentId)}
              />
            </label>
            <label className='toggler text-base flex-grow-1 border flex-grow-1 py-2 ps-1 pe-0 rounded' onClick={() => handleToggle(currentId)}>{key}</label>
          </div>
          <div className='col-4 d-flex justify-content-between rounded'>
            <label className='col-6'>Icon
              <input style={{ width: '100px' }} type="text" id={`${parentFolder}-icon`} className='folder-icon ms-1 border border-secondary rounded' />
            </label>
            <label className='col-6 justify-content-end gap-2 pe-4 form-check-label d-flex align-items-center cursor-pointer'>
              <input
                type='checkbox'
                id={`${currentId}-hidden-folder-toggler`}
                value={[parentFolder, key]}
                className='form-check-input hidden-folder-toggler'
              />
              Hidden
            </label>
          </div>

        </div>

        <ul id={currentId} className={`parent-children list-unstyled ms-${indent} d-none my-1`}>
          {
            routeList.length > 0 &&
            <table className='table table-responsive shadow-sm table-striped table-hover ms-3'>
              <thead>
                <tr>
                  <th></th>
                  <th className='align-text-start'>Route name</th>
                  <th className='align-text-start'>Methods</th>
                  <th className='align-text-start'>Hidden</th>
                </tr>
              </thead>
              <tbody>

                {routeList.map((route, i) => {

                  const [isChecked, setIsChecked] = useState(false)

                  useEffect(() => {

                    let c = parentChecked
                      ? shouldCheckCheckbox(currentId, route.uri_methods, permissions)
                      : false;
                    setIsChecked(c)

                  }, [isInitialRender])

                  useEffect(() => {
                    setIsChecked(!isChecked)

                  }, [route, parentChecked])

                  return (
                    <tr className='link routes-parent' key={`${i}+${key}_${route.slug}`}>
                      <td className='col-1 border border-right cursor-pointer'>
                        <label className="form-check-label py-1 px-3 d-flex gap-2 rounded w-100 cursor-pointer" title={route.uri_methods}>
                          <input
                            type='checkbox'
                            value={[route.uri_methods, route.title]}
                            id={Str.uriMethods(route.uri_methods)}
                            className={`${ROUTE_CHECKBOX_CLASS} form-check-input me-2`}
                            checked={isChecked}
                            onClick={() => setIsChecked(!isChecked)}
                            onChange={() => debouncedHandleCheckedSingle(currentId)}
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
                        {route.hidden ? 'True' : 'False'}
                      </td>
                    </tr>
                  )
                })
                }
              </tbody>
            </table>
          }

          {children && Object.keys(children).length > 0 && (
            <li className={`has-dropdown ml-${indent}`}>
              <ul className='list-unstyled dropdown'>
                {renderRoutes(children, indent, prevFolderName + '/' + key, permissions, isInitialRender)}
              </ul>
            </li>
          )}
        </ul>
      </li>
    );
  });
};

export default RoutesTree;
