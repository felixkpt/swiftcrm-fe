import Str from '@/utils/Str';
import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react'
import RoutesList from './RoutesList';

type Props = {
    child: RoutesSection
    indent: number
    handleToggle: () => void
    prevId: string
}

// The main RoutesTree component
const MenuTree: React.FC<Props> = ({ child, indent, handleToggle, prevId }) => {

    indent += 1

    const { routes, children, hidden, icon, folder } = child

    const shouldShowFolder = routes.length > 0 || children.length > 0 && !hidden

    const currentId = Str.slug((folder).replace(/^\//, ''));

    return (

        <>
            {
                shouldShowFolder &&

                <div key={currentId}>
                    <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target={`#${currentId}`} aria-expanded="false" aria-controls="pagesCollapseAuth">
                        <span className='d-flex align-items-center gap-1'>
                            <Icon icon={`${icon || 'prime:bookmark'}`} />
                            <span>{Str.title(Str.afterLast(folder, '/'))}</span>
                        </span>
                        <div className="sb-sidenav-collapse-arrow"><Icon className='arrow-section' icon={`bi-chevron-down`} /></div>
                    </a>
                    <div className="collapse" id={`${currentId}`} aria-labelledby="headingOne" data-bs-parent={`#${prevId}`}>
                        <nav className="sb-sidenav-menu-nested nav">
                            <RoutesList routes={routes} />
                            {
                                children.length > 0 &&
                                <>
                                    {
                                        children.map((child) => <MenuTree key={child.folder} indent={indent} child={child} handleToggle={handleToggle} prevId={currentId} />)
                                    }
                                </>
                            }
                        </nav>
                    </div>
                </div>
                // <li key={currentId} id={`${PARENT_FOLDER_ID_PREFIX}${folder}`}>
                //     <a href="#" aria-expanded="true" className='has-arrow mb-1 px-1 rounded d-flex rounded-lg'>
                //         <label className='toggler p-2 text-base d-flex align-items-center gap-1 justify-content-between flex-grow-1' onClick={() => handleToggle(currentId)}>
                //             <span className='d-flex align-items-center gap-1'>
                //                 <Icon icon={`${icon || 'prime:bookmark'}`} />
                //                 <span>{Str.title(Str.afterLast(folder, '/'))}</span>
                //             </span>
                //             {/* <Icon icon="bi-chevron-down" /> */}
                //         </label>
                //     </a>

                //     <ul aria-expanded="true" id={currentId} className={`list-unstyled ms-${indent} my-1`}>
                //         <RoutesList routes={routes} />
                //         {
                //             children.length > 0 &&
                //             <>
                //                 {
                //                     children.map((child) => <MenuTree key={child.folder} indent={indent} child={child} handleToggle={handleToggle} />)
                //                 }
                //             </>
                //         }
                //     </ul>
                // </li>
            }
        </>
    )
}

export default MenuTree