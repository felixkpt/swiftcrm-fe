import AutoModel from '@/components/AutoModel';
import useAxios from '@/hooks/useAxios'
import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

type Props = {}

const Index = (props: Props) => {

  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState(null)
  const [data, setData] = useState(null)

  const { data: userData, loading, errors, get } = useAxios()
  const { data: roles, loading: loadingRoles, errors: errorsRoles, get: getRoles } = useAxios()

  useEffect(() => {
    get('admin/settings/users/user/' + id)
  }, [id])

  useEffect(() => {
    if (!loading && userData) {
      setUser(userData.data)
      setData(userData)
    }

  }, [user, loading])

  function loginUser() {

    console.log(user.id)
    // {`admin/settings/users/user/login/${user.id}`}
  }


  const list_sources = {

    async rolesList() {
      const res = await getRoles('admin/settings/role-permissions/roles?all=1').then((res) => res)
      return res || []

    },

    async directPermissionsList(role_id: string) {
      console.log(333, role_id)
      const res = await getRoles('admin/settings/role-permissions/permissions?all=1').then((res) => res)
      return res || []
    },

  }

  class ListSources {
    constructor() {
      this.results = {};
    }

    async rolesList() {
      const res = await getRoles('admin/settings/role-permissions/roles?all=1');
      this.results.rolesList = res;
      return this;
    }

    async directPermissionsList(role_id: string) {
      console.log(333, role_id);
      const res = await getRoles('admin/settings/role-permissions/permissions?all=1');
      this.results.directPermissionsList = res;
      return this;
    }

    get(key: string) {
      return this.results[key] || [];
    }

  }

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            {
              user ?
                <div className="row">
                  <div className="col-md-6">
                    <div className="model-view">
                      <table className="table">
                        <tbody><tr>
                          <th>NAME</th>
                          <td>
                            {user.name}
                          </td>
                        </tr>
                          <tr>
                            <th>EMAIL</th>
                            <td>
                              {user.email}
                            </td>
                          </tr>
                          <tr>
                            <th>PHONE</th>
                            <td>
                              {user.phone || 'N/A'}
                            </td>
                          </tr>
                          <tr>
                            <th>Roles</th>
                            <td>
                              {user.roles.reduce((prev, role) => (prev ? prev + ', ' : prev) + role.name, '')}
                            </td>
                          </tr>
                          <tr>
                            <th>CREATED AT</th>
                            <td>
                              {user.created_at}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h3>Main Actions</h3>

                    <div className='d-flex gap-1'>

                      <button type="button" className="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#AutoModel">
                        <Icon fontSize={26} icon="streamline:interface-user-edit-actions-close-edit-geometric-human-pencil-person-single-up-user-write" />
                        <span className='ms-2'>Edit User</span>
                      </button>
                      <button type="button" className="btn btn-info text-white btn-lg" data-bs-toggle="modal" data-bs-target="#update_password">
                        <Icon fontSize={26} icon={`ooui:edit-lock`} />
                        <span className='ms-2'>Change Password</span>
                      </button>
                      <button onClick={loginUser} className="btn btn-outline-primary btn-lg">
                        <Icon fontSize={26} icon={`uiw:login`} />
                        <span className='ms-2'>Login</span>
                      </button>
                    </div>
                  </div>
                </div>
                : <div>Loading user info</div>
            }

            <div className={`modal fade`} id="update_password" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden={`true`}>

              <div className="modal-dialog modal-dialog-top animated zoomIn animated-3x   ">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title title" id="update_password_label">New Password</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>

                  <div className="modal-body">
                    <div className="section">
                      <form encType="" className="ajax-post model_form_id" method="post" action="http://mkinjucrm.local/admin/settings/users/user/update-password">
                        <input type="hidden" name="id" value="" />
                        <div className="form-group password"><label className="form-label label_password">Password</label>
                          <div className="form-control-wrap">
                            <input type="password" name="password" className="form-control" />

                          </div>
                        </div>
                        <div className="form-group password_confirmation">
                          <label className="form-label label_password_confirmation">Password Confirmation</label>
                          <div className="form-control-wrap">
                            <input type="password" name="password_confirmation" className="form-control" />

                          </div>
                        </div>
                        <input type="hidden" name="user_id" value="8" />
                        <div className="form-group">
                          <button type="submit" className="btn  btn-primary submit-btn ">Save Information</button>
                        </div>
                      </form>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {
              data && <><AutoModel data={data} actionUrl={`/admin/settings/users/user/${data?.data?.id || 0}`} ListSources={ListSources} list_depends_on={list_depends_on} /></>
            }

            <div className={`modal fade`} id="edit_user" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden={`true`}>

              <div className="modal-dialog animated zoomIn animated-3x   ">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title" id="add_user_label">EDIT USER</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>

                  <div className="modal-body">
                    <div className="section">
                      <form className="ajax-post model_form_id row" method="post" autoComplete="off" action="http://mkinjucrm.local/admin/settings/users/user/update">

                        <input type="hidden" name="user_id" value="8" />
                        <div className="fg-line">
                          <label className="fg-label control-label label_first_name">
                            Name</label>
                          <input value="" type="text" name="name" className="form-control" autoComplete="off" />
                        </div>


                        <div className="form-group col-md-6">
                          <div className="fg-line">
                            <label className="fg-label control-label label_email">Email</label>
                            <input value="" type="text" name="email" className="form-control" autoComplete="off" />
                          </div>
                        </div>
                        <div className="form-group col-md-6 phone">
                          <div className="fg-line">
                            <label className="fg-label control-label label_phone">Phone</label>
                            <input type="text" name="phone" className="form-control" />
                          </div>
                        </div>
                        <div className="form-group col-md-6 permission_group_id">
                          <div className="fg-line">
                            <label className="fg-label control-label">Roles</label>
                            <select>
                              <option>--Select--</option>
                            </select>
                          </div>
                        </div>

                        <div className="form-group col-md-12 mt-3">
                          <button type="submit" className="btn btn-info submit-btn">
                            <b>Submit</b> &nbsp;<em className="icon ni ni-save"></em></button>
                        </div>

                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index