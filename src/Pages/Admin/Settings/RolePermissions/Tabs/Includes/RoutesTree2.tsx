import Str from '@/utils/Str';
import React from 'react';
import debounce from 'lodash/debounce';
import CheckboxTreeManager from './CheckboxTreeManager';

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
// Define the Props interface for the RoutesTree component
interface Props {
    folderRoutes: {
        routes: Routes,
        children: any
    };
    permissions: string[];
    handleSubmit: ({ folders, permissions }: PermissionsProps) => void;
    saving: boolean;
    indent: number
    counter: number
    isInitialRender: boolean
}

// Constants used for managing the component behavior
const PARENT_FOLDER_ID_PREFIX = 'parent-folder-';
const MAIN_CONTAINER_CLASS = 'nested-routes';
const PARENT_CHILDREN_CLASS = 'parent-children';
const ROUTE_CHECKBOX_CLASS = 'routecheckbox';


const checkboxTreeManager = new CheckboxTreeManager(
    PARENT_FOLDER_ID_PREFIX,
    ROUTE_CHECKBOX_CLASS,
    MAIN_CONTAINER_CLASS
);


// Function to handle toggling the display of child routes
function handleToggle(key: string) {
    const target = document.getElementById(`chld-${PARENT_FOLDER_ID_PREFIX}${key}-${PARENT_CHILDREN_CLASS}`);
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
            checkboxTreeManager.checkUp(targetElement)
        }
        else {
            // should uncheckup recursivley (:- <<<---recursion
            checkboxTreeManager.uncheckUp(targetElement)
        }
    }
}

function handleCheckedSingle(e = null) {

    const action = e?.target.checked

    const parentElement = e.target.closest(`div[id^="${PARENT_FOLDER_ID_PREFIX}"]`)

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

    setTimeout(() => {

        const exists = found(uriMethods, permissions)

        if (exists) {
            const checkbox = document.getElementById(inputId)

            if (checkbox) {
                checkbox.checked = true
                const parentElement = checkbox.closest(`div[id^="${PARENT_FOLDER_ID_PREFIX}"]`)
                if (parentElement) {
                    const key = parentElement.id
                    handleToggleCheck(key, true)
                } else {
                    console.log('no parent')
                }
            }
        }

    }, 200);

}

// Function to get the hidden for a route based on its permissions
function getHiddenState(allPermissions: any[], uri: string) {
    let hidden = false
    if (allPermissions) {

        const res = allPermissions.find((permission) => permission.uri == uri)
        if (res)
            hidden = res.hidden === null ? false : res.hidden

    }

    return hidden

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
const RoutesTree2: React.FC<Props> = ({ child, permissions, allPermissions, handleSubmit, saving, indent, counter, isInitialRender }) => {

    const { routes, children } = child

    indent += 1
    counter += 1

    const folder = child.folder
    const currentId = Str.slug((folder).replace(/^\//, ''));

    const parentFolder = (folder).replace(/^\//, '');

    const parentChecked = !!found(parentFolder, permissions)

    return (
        <div key={currentId} className={`mt-1 parent-folder ps-${indent} border-start border-primary-subtle p-1`} id={`${PARENT_FOLDER_ID_PREFIX}${currentId}`}>
            <div className='folder-section toggler-section mb-2 ms-1 px-1 border bg-white row align-items-center justify-content-between rounded'>
                <div className='col-7 d-flex'>
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
                            value={folder}
                        />
                    </label>
                    <label className='toggler text-base flex-grow-1 border flex-grow-1 py-2 ps-1 pe-0 rounded' onClick={() => handleToggle(currentId)}>
                        <h5>{Str.title(child.folder || '--')}</h5>
                    </label>
                </div>
                <div className='bg-light col-5 d-flex rounded gap-1'>
                    <label className='col-6'>
                        <input placeholder='Icon' defaultValue={getRouteIcon(allPermissions, parentFolder)} style={{ width: '100px' }} type="text" id={`${parentFolder}-folder-icon`} className='folder-icon ms-1 border border-secondary rounded' />
                    </label>
                    <div className='col-6'>
                        <label className='form-check-label w-50 d-flex ms-auto justify-content-end align-items-center cursor-pointer'>
                            <input
                                type='checkbox'
                                id={`${currentId}-folder-hidden`}
                                className='form-check-input me-2 folder-hidden'
                                defaultChecked={getHiddenState(allPermissions, parentFolder)}
                            />
                            Hidden
                        </label>
                    </div>
                </div>
            </div>
            <div>
                {
                    routes.length > 0 &&
                    <div id={`chld-${PARENT_FOLDER_ID_PREFIX}${currentId}-parent-children`} className={`parent-children my-1 ms-3 shadow px-1 py-2`}>
                        <table className='routes-table table table-responsive shadow-sm table-striped table-hover'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th className='align-text-start'>Route name</th>
                                    <th className='align-text-start'>Methods</th>
                                    <th className='align-text-start'>Icon/Hidden</th>
                                </tr>
                            </thead>
                            <tbody>

                                {routes.map((route, i) => {

                                    return (
                                        <tr className='link routes-parent route-section' key={`${i}+${folder}_${route.slug}`}>
                                            <td className='col-1 border border-right cursor-pointer'>
                                                <label className="form-check-label py-1 px-3 d-flex gap-2 rounded w-100 cursor-pointer" title={route.uri_methods}>
                                                    <input
                                                        type='checkbox'
                                                        value={route.uri_methods}
                                                        id={`${Str.uriMethods(route.uri_methods)}-child-checkbox`}
                                                        className={`${ROUTE_CHECKBOX_CLASS} form-check-input me-2`}
                                                        onChange={(e) => debouncedHandleCheckedSingle(e, currentId, true, true)}
                                                        data-checked={(isInitialRender && parentChecked && permissions) && shouldCheckCheckbox(`${Str.uriMethods(route.uri_methods)}-child-checkbox`, route.uri_methods, permissions)}
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
                    </div>
                }

                <>
                    {
                        children.length > 0 &&
                        <div className={`has-dropdown ps-${indent}`}>
                            <div className={`list-unstyled dropdown COUNTER${counter}`}>
                                {
                                    children.map((child) => <RoutesTree2 key={child.folder} indent={indent} child={child} permissions={permissions} allPermissions={allPermissions} counter={counter} isInitialRender={isInitialRender} />)
                                }
                            </div>
                        </div>
                    }
                </>
            </div>
        </div>
    )
}

export default RoutesTree2