import { Outlet } from 'react-router-dom';
import Footer from '../Authenicated/Footer/Index';

export default function GuestLayout() {
	return (
		<>
			<div id="layoutAuthentication" className='bg-secondary-subtle'>
				<main>
					<div className="container">
						<div className="row justify-content-center">
							<Outlet />
						</div>
					</div>
				</main>
				<Footer />
			</div>
		</>
	);
}
