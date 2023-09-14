import Menu from "./Menu";
const Sidebar = () => {
    return (
        <nav className="sb-sidenav accordion sb-sidenav-light" id="sidenavAccordion">
            <div className="sb-sidenav-menu shadow">
                <div className="nav pt-2">
                    <Menu />
                </div>
            </div>
        </nav>
    )
}

export default Sidebar