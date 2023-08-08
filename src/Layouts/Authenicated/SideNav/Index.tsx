import SideNavItem from "./SideNavItem"
// import items from '../../data/sidenav.json'
import { useRef } from "react";
import Header from "./Header";
import Menu from "./Menu";
import SidebarMenu from "./SidebarMenu";

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {

    const sidebar = useRef<any>(null);

    return (
        <aside
            ref={sidebar}
            className={`text-light text-opacity-75`} id="sidebar-wrapper">

            <Header sidebar={sidebar} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
            <div className="ps-2 sidebar w-100">
                <Menu />
            </div>
        </aside>
    )
}

export default Sidebar