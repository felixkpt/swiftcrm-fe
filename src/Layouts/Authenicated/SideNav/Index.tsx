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

    const i =

        [
            {
                "folder": "admin",
                "title": "admin",
                "icon": null,
                "hidden": false,
                "children": [],
                "routes": [
                    {
                        "route": "admin@GET|@HEAD",
                        "title": "Index"
                    },
                    {
                        "route": "admin\/dashboard@GET|@HEAD",
                        "title": "Index"
                    },
                    {
                        "route": "admin\/search@GET|@HEAD",
                        "title": "Search"
                    },
                    {
                        "route": "admin\/ticket-count-by-issue-sources@GET|@HEAD",
                        "title": "Getticketsbyissuesource"
                    },
                    {
                        "route": "admin\/social-media-stats@GET|@HEAD",
                        "title": "Getsocialmediastats"
                    },
                    {
                        "route": "admin\/tickets\/stats@GET|@HEAD",
                        "title": "Getticketscount"
                    },
                    {
                        "route": "admin\/last-five-tickets@GET|@HEAD",
                        "title": "Getlastfivetickets"
                    },
                    {
                        "route": "admin\/last-five-leads@GET|@HEAD",
                        "title": "Getlastfiveleads"
                    },
                    {
                        "route": "admin\/tickets\/status\/stats@GET|@HEAD",
                        "title": "Getticketstatuscounts"
                    },
                    {
                        "route": "admin\/tickets\/channels\/stats@GET|@HEAD",
                        "title": "Getticketschannelcounts"
                    },
                    {
                        "route": "admin\/tickets\/categories\/stats@GET|@HEAD",
                        "title": "Getticketcategoriescounts"
                    },
                    {
                        "route": "admin\/tickets-due-today@GET|@HEAD",
                        "title": "Ticketsduetoday"
                    },
                    {
                        "route": "admin\/tickets@GET|@HEAD",
                        "title": "Tickets Dashboard"
                    }
                ]
            },
            {
                "folder": "settings",
                "title": "settings",
                "icon": null,
                "hidden": false,
                "children": [
                    {
                        "folder": "settings\/role-permissions",
                        "title": "role-permissions",
                        "icon": null,
                        "hidden": false,
                        "children": [
                            {
                                "folder": "settings\/role-permissions\/permissions",
                                "title": "permissions",
                                "icon": null,
                                "hidden": false,
                                "children": [],
                                "routes": [
                                    {
                                        "route": "settings\/role-permissions\/permissions@GET|@HEAD",
                                        "title": "Index"
                                    },
                                    {
                                        "route": "settings\/role-permissions\/permissions@POST",
                                        "title": "Store"
                                    },
                                    {
                                        "route": "settings\/role-permissions\/permissions\/role\/{id}@GET|@HEAD",
                                        "title": "Getrolepermissions"
                                    },
                                    {
                                        "route": "settings\/role-permissions\/permissions\/user\/{id}@GET|@HEAD",
                                        "title": "Getuserpermissions"
                                    },
                                    {
                                        "route": "settings\/role-permissions\/permissions\/routes@GET|@HEAD",
                                        "title": "Routes List"
                                    },
                                    {
                                        "route": "settings\/role-permissions\/permissions\/routes@POST",
                                        "title": "Store Route"
                                    }
                                ]
                            },
                            {
                                "folder": "settings\/role-permissions\/roles",
                                "title": "roles",
                                "icon": null,
                                "hidden": false,
                                "children": [],
                                "routes": [
                                    {
                                        "route": "settings\/role-permissions\/roles@GET|@HEAD",
                                        "title": "Index"
                                    },
                                    {
                                        "route": "settings\/role-permissions\/roles@POST",
                                        "title": "Store"
                                    },
                                    {
                                        "route": "settings\/role-permissions\/roles\/generateJson@GET|@HEAD",
                                        "title": "Generatejson"
                                    },
                                    {
                                        "route": "settings\/role-permissions\/roles\/{id}@GET|@HEAD",
                                        "title": "Show"
                                    },
                                    {
                                        "route": "settings\/role-permissions\/roles\/{id}@PUT",
                                        "title": "Update"
                                    },
                                    {
                                        "route": "settings\/role-permissions\/roles\/{id}\/save-permissions@GET|@HEAD|@POST|@PUT|@PATCH|@DELETE|@OPTIONS",
                                        "title": "Storepermissions"
                                    }
                                ]
                            }
                        ],
                        "routes": []
                    },
                    {
                        "folder": "settings\/users",
                        "title": "users",
                        "icon": null,
                        "hidden": false,
                        "children": [],
                        "routes": [
                            {
                                "route": "settings\/users@GET|@HEAD",
                                "title": "Index"
                            },
                            {
                                "route": "settings\/users\/create@GET|@HEAD",
                                "title": "Create"
                            },
                            {
                                "route": "settings\/users@POST",
                                "title": "Store"
                            },
                            {
                                "route": "settings\/users\/{user}\/edit@GET|@HEAD",
                                "title": "Edit"
                            },
                            {
                                "route": "settings\/users\/{user}@PUT",
                                "title": "Update"
                            },
                            {
                                "route": "settings\/users\/{user}@DELETE",
                                "title": "Destroy"
                            }
                        ]
                    }
                ],
                "routes": []
            }
        ]


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