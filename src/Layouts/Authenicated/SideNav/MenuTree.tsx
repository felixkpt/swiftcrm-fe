import Str from '@/utils/Str';
import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react'
import RoutesList from './RoutesList';

type Props = {}

// Constants used for managing the component behavior
const PARENT_FOLDER_ID_PREFIX = 'menu-parent-folder-';

// The main RoutesTree component
const MenuTree: React.FC<Props> = ({ child, indent, handleToggle }) => {

    indent += 1

    const { routes, children, hidden, icon, folder } = child

    const shouldShowFolder = routes.length > 0 || children.length > 0 && !hidden

    const currentId = Str.slug((folder).replace(/^\//, ''));

    return (
        <ul className='list-unstyled nested-routes main'>
            <li key={currentId} id={`${PARENT_FOLDER_ID_PREFIX}${folder}`}>
                <div className='toggler-section mb-1 px-1 rounded d-flex rounded-lg'>
                    <label className='toggler p-2 text-base d-flex align-items-center gap-1 justify-content-between flex-grow-1' onClick={() => handleToggle(currentId)}>
                        <span className='d-flex align-items-center gap-1'>
                            <Icon icon={`${icon || 'prime:bookmark'}`} />
                            <span>{Str.title(Str.afterLast(folder, '/'))}</span>
                        </span>
                        <Icon icon="bi-chevron-down" />
                    </label>
                </div>

                <ul id={currentId} className={`list-unstyled ms-${indent} d-none my-1`}>
                    <RoutesList routes={routes} />
                    <>
                        {
                            children.length > 0 &&
                            <li className={`has-dropdown ps-${indent}`}>
                                <ul className={`list-unstyled dropdown`}>
                                    {
                                        children.map((child) => <MenuTree key={child.folder} indent={indent} child={child} handleToggle={handleToggle} />)
                                    }
                                </ul>
                            </li>
                        }
                    </>
                </ul>

            </li>
        </ul>
    )
}

export default MenuTree