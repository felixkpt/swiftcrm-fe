import { Outlet } from 'react-router-dom';
import Footer from '../Authenicated/Footer/Index';

export default function GuestLayout() {
	return (
		<>
			<main className='main-content h-100vh'>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}
