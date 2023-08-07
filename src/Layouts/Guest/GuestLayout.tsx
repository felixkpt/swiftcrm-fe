import { Outlet } from 'react-router-dom';
import Footer from '../Authenicated/Footer/Index';

export default function GuestLayout() {
	return (
		<>
			<main className='main-content h-100vh'>
				<div className="container h-100vh">
					<div className="row justify-content-center mt-5 h-100vh align-items-center">
						<Outlet />
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}
