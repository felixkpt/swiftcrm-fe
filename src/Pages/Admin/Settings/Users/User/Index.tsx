import AutoModal from '@/components/AutoModal';
import useAxios from '@/hooks/useAxios'
import { UserInterface } from '@/interfaces/UserInterface';
import { emitAjaxPost } from '@/utils/helpers';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

type Props = {}

const Index = (props: Props) => {

  const { id } = useParams<{ id: string }>();

  const [user, setUser] = useState<UserInterface>()
  const [data, setData] = useState(null)

  const navigate = useNavigate();

  const { data: userData, loading, errors, get } = useAxios()
  const { data: roles, loading: loadingRoles, errors: errorsRoles, get: getRoles } = useAxios()
  const { data: dataLoggedIn, loading: loggingIn, errors: errorsLoggingIn, post: postLogin } = useAxios()

  const [modelDetails, setModelDetails] = useState({})

  useEffect(() => {
    get('admin/users/user/' + id)
  }, [id])

  useEffect(() => {
    if (!loading && userData) {
      const { data, ...others } = userData
      setUser(userData.data)
      setModelDetails(others)
    }

  }, [user, loading])

  async function loginUser() {

    if (user) {
      await postLogin(`admin/users/user/login/${user.id}`);

    }

  }

  useEffect(() => {

    if (loggingIn === false && dataLoggedIn) {
      const user = dataLoggedIn;

      if (user) {

        setUser(user);
        // Redirect the user to the home page
        navigate('/admin');

      }
    }

  }, [dataLoggedIn, loggingIn]);

  const list_sources = {

    async rolesList() {
      const res = await getRoles('admin/settings/role-permissions/roles?all=1').then((res) => res)
      return res || []

    },

    async directPermissionsList() {
      const res = await getRoles('admin/settings/role-permissions/permissions?all=1').then((res) => res)
      return res || []

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
                              {user.roles.reduce((prev, item) => (prev ? prev + ', ' : prev) + item.name, '')}
                            </td>
                          </tr>
                          <tr>
                            <th>Direct permissions</th>
                            <td>
                              {user.direct_permissions.reduce((prev, item) => (prev ? prev + ', ' : prev) + item.name, '')}
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

                      <button type="button" className="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#AutoModal">
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

                  <div className={`modal fade`} id="update_password" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden={`true`}>

                    <div className="modal-dialog modal-dialog-top animated zoomIn animated-3x   ">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title title" id="update_password_label">New Password</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                          <div className="section">
                            <form encType="" method="post" action-url={'/admin/users/user/update-others-password'} onSubmit={(e: any) => emitAjaxPost(e)} >
                              <input type="hidden" name="user_id" value={id} />
                              <input type="hidden" name="_method" value="patch" />
                              <div className="form-group password">
                                <label className="form-label label_password">Password</label>
                                <input type="password" name="password" className="form-control" />
                              </div>
                              <div className="form-group password_confirmation">
                                <label className="form-label label_password_confirmation">Password Confirmation</label>
                                <input type="password" name="password_confirmation" className="form-control" />
                              </div>
                              <div className="form-group mt-2">
                                <button type="submit" className="btn  btn-primary submit-btn ">Save Information</button>
                              </div>
                            </form>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>
                : <div>Loading user info</div>
            }

            {
              user && <><AutoModal modelDetails={modelDetails} record={user} actionUrl={`/admin/users/user/${data?.data?.id || 0}`} list_sources={list_sources} size='modal-lg' /></>
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default Index