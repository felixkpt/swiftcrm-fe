import { useEffect } from "react";
import AutoTabs from "@/components/AutoTabs";
import Permissions from "./Tabs/Permissions";
import Users from "./Tabs/Users";
import useAxios from "@/hooks/useAxios";
import { useParams } from "react-router-dom";

export default function Index(): JSX.Element {

    const { id } = useParams<{ id: string }>();

    const roleUri = `admin/settings/role-permissions/roles/role/${id}`;

    const { data: role, loading, get } = useAxios();

    useEffect(() => {

        get(roleUri)

    }, [])

    const permissionsUri = `admin/settings/role-permissions/permissions/role/${id}`;

    const { data: permissions, get: getPermissions, loading: loadingPermission } = useAxios<PermissionData[]>();

    useEffect(() => {
        doGetPermissions()
    }, [])

    function doGetPermissions() {
        getPermissions(permissionsUri, { uri: 1 });
    }

    const tabs = [
        {
            name: "Permissions",
            link: "permissions",
            content: <Permissions role={role} permissions={permissions} loadingPermission={loadingPermission} doGetPermissions={doGetPermissions} />,
        },
        {
            name: "Users",
            link: "users",
            content: <Users role={role} permissions={permissions} loadingPermission={loadingPermission} />,
        },
    ];

    return (
        <div className="mb-3">
            {
                !loading && role && <h2>{role.name}</h2>
            }
            <AutoTabs tabs={tabs} active="permissions" />
        </div>
    );
}
