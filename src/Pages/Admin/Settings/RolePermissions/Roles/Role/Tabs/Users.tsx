import AutoTable from "@/components/AutoTable"
import GeneralModal from "@/components/Modals/GeneralModal"
import useAxios from "@/hooks/useAxios"
import { Icon } from "@iconify/react/dist/iconify.js"
import AsyncSelect from 'react-select/async';
import { debounce } from 'lodash';
import { useState } from "react";
import { RoleData, PermissionData } from "@/interfaces/RolePermissionsInterfaces";

type Props = {
    role: RoleData;
    permissions: PermissionData[];
    loadingPermission: boolean;
}

const Users = ({ role }: Props) => {

    const [key, setKey] = useState(0)

    return (
        <div>
            {
                role && role.id ?
                    <>
                        <div className='d-flex justify-content-end'>
                            <button type="button" className="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#addUserToRole">Add User to Role</button>
                        </div>
                        <AutoTable
                            key={key}
                            baseUri={`/admin/users?role_id=${role.id}`}
                            columns={[
                                {
                                    label: 'ID',
                                    key: 'id',
                                },
                                {
                                    label: 'User Name',
                                    key: 'name',
                                },
                                {
                                    label: 'Roles',
                                    key: 'Roles',
                                },
                                {
                                    label: 'Created At',
                                    key: 'created_at',
                                },
                                {
                                    label: 'Action',
                                    key: 'action',
                                },
                            ]}
                            search={true}
                        />
                        <GeneralModal setKey={setKey} title='Add User to Role' actionUrl={`admin/settings/role-permissions/roles/role/${role.id}/add-user`} id={`addUserToRole`}>
                            <AddUser key={key} role={role} />
                        </GeneralModal>
                    </>

                    :
                    <div>Loading...</div>
            }
        </div>
    )

}

const AddUser = ({ role }: Pick<Props, 'role'>) => {

    const { get } = useAxios()

    const debouncedLoadOptions = (roleId: number) =>
        debounce(async (q: string, callback: (data: any[]) => void) => {
            const { data } = await get(`/admin/users?role_id=${roleId}&negate=1&all=1&q=${q}`);
            callback(data || []);
        }, 1000);

    return (
        <div>
            <div className="form-group mb-2">
                <AsyncSelect
                    className="form-control"
                    name={`user_id`}
                    defaultOptions
                    loadOptions={debouncedLoadOptions(role.id)}
                    getOptionValue={(option) => `${option['id']}`}
                    getOptionLabel={(option) => `${option['name']}`}
                />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-info btn-raised submit-btn"><Icon icon="save"></Icon> Submit</button>
            </div>
        </div>
    )
}

export default Users