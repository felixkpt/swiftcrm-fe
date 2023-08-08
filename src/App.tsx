// src/App.tsx

import { Link } from 'react-router-dom';
import { RouterElement } from '@/routes/router';
import './App.css';
import AuthenticatedLayout from './Layouts/Authenicated/AuthenticatedLayout';
import GuestLayout from './Layouts/Guest/GuestLayout';


function App() {
  const isAuthenticated = true; // Replace with your actual authentication logic

  return (
    <div className="App">
      {isAuthenticated ? (
        <AuthenticatedLayout>
          <RouterElement />
        </AuthenticatedLayout>
      ) : (
        <GuestLayout>
          <RouterElement />
        </GuestLayout>
      )}
    </div>
  );
}

export default App;
