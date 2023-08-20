import SideNavItem from "./SideNavItem"
// import items from '../../data/sidenav.json'
import { useRef } from "react";
import Header from "./Header";
import Menu from "./Menu";
import SidebarMenu from "./SidebarMenu";
import Menuv2 from "./Menuv2";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = () => {
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav pt-2">
                    <Menu />
                </div>
            </div>
        </nav>
    )
}

export default Sidebar