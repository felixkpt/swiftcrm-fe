import { useAuth } from '@/contexts/AuthContext'
import { emitAjaxPost } from '@/utils/helpers'
import { useEffect } from 'react'

type Props = {}

const Profile = (props: Props) => {

	const { user, setUser } = useAuth()

	useEffect(() => {

		window.addEventListener('ajaxPostDone', function (event: Event) {
			if (event?.detail) {
				const { formId, response } = event.detail

				if (formId === 'profile-update') {
					console.log(formId)
					setUser(response)
				}

			}
		})

	}, [])

	return (
		<div>
			<div className="container-xxl">
				<div className="section-image" data-image="/storage/../img/faces/margot.jpg">
					<div className="row">
						<div className="card col-md-8 mb-4">
							<div className="card-header">
								<div className="row align-items-center">
									<div className="col-md-8">
										<h3 className="mb-0">Edit Profile</h3>
									</div>
								</div>
							</div>
							<div className="card-body">
								{
									user ?
										<form id='profile-update' method='post' action-url={`admin/users/user/profile-update`} onSubmit={(e: any) => emitAjaxPost(e)} className="flex justify-center">
											<input type="hidden" name="_method" value="patch" />
											<h6 className="heading-small text-muted mb-4">User information</h6>
											<div className="pl-lg-4">
												<div className="form-floating mb-3">
													<input type="text" name="name" id="input-name" className="form-control" placeholder="Name" defaultValue={`${user.name}`} autoFocus />
													<label className="form-label" htmlFor="input-name">
														<i className="w3-xxlarge fa fa-user"></i>Name
													</label>
												</div>
												<div className="form-floating mb-3">
													<input type="email" name="email" id="input-email" className="form-control" placeholder="Email" defaultValue={user.email} />
													<label className="form-label" htmlFor="input-email"><i className="w3-xxlarge fa fa-envelope-o"></i>Email</label>
												</div>
												<div className="form-floating mb-3">
													<div className="pb-2">
														<img className="resize-image" src="/storage/../img/faces/margot.jpg" alt="profile" />
													</div>
													<div className="custom-file">
														<input type="file" name="photo" className="form-control-file " id="input-picture" accept="image/*" />
													</div>
												</div>
												<div className="text-center">
													<button type="submit" className="btn btn-warning mt-4">Save</button>
												</div>
											</div>
										</form>
										:
										<div>Loading...</div>
								}

								<hr className="my-4" />

								<form method='post' action-url={`admin/users/user/update-password`} onSubmit={(e: any) => emitAjaxPost(e)} className="flex justify-center">
									<input type="hidden" name="_method" value="patch" />
									<h6 className="heading-small text-muted mb-4">Password</h6>
									<div className="pl-lg-4">
										<div className="form-floating mb-3">
											<input type="password" name="current_password" id="input-current-password" className="form-control" placeholder="Current Password" defaultValue="" />
											<label className="form-label" htmlFor="input-current-password">
												<i className="w3-xxlarge fa fa-eye-slash"></i>Current Password
											</label>
										</div>
										<div className="form-floating mb-3">
											<input type="password" name="password" id="input-password" className="form-control" placeholder="New Password" defaultValue="" />
											<label className="form-label" htmlFor="input-password">
												<i className="w3-xxlarge fa fa-eye-slash"></i>New Password
											</label>
										</div>
										<div className="form-floating mb-3">
											<input type="password" name="password_confirmation" id="input-password-confirmation" className="form-control" placeholder="Confirm New Password" defaultValue="" />
											<label className="form-label" htmlFor="input-password-confirmation">
												<i className="w3-xxlarge fa fa-eye-slash"></i>Confirm New Password
											</label>
										</div>
										<div className="text-center">
											<button type="submit" className="btn btn-warning mt-4">Change password</button>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div className="col-md-4">
							<div className="card card-user">
								<div className="card-header no-padding">
									<div className="card-image">
										<img src="https://light-bootstrap-dashboard-pro-laravel.creative-tim.com/img/full-screen-image-3.jpg" alt="..." />
									</div>
								</div>
								<div className="card-body ">
									<div className="author">
										<a href="#">
											<img className="avatar border-gray" src="/storage/../img/faces/margot.jpg " alt="..." />
											<h5 className="card-title">Admin</h5>
										</a>
										<p className="card-description">
											...
										</p>
									</div>
									<p className="card-description text-center">
										Hey there! As you can see,
										<br /> it is already looking great.
									</p>
								</div>
								<div className="card-footer ">
									<hr />
									<div className="button-container text-center">
										<button href="#" className="btn btn-simple btn-link btn-icon">
											<i className="fa fa-facebook-square"></i>
										</button>
										<button href="#" className="btn btn-simple btn-link btn-icon">
											<i className="fa fa-twitter"></i>
										</button>
										<button href="#" className="btn btn-simple btn-link btn-icon">
											<i className="fa fa-google-plus-square"></i>
										</button>
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

export default Profile