import AjaxPost from '@/components/AjaxPost';
import ToastError from '@/components/Modals/ToastError';
import ToastNotification from '@/components/Modals/ToastNotification';
import EditModel from '@/components/ModelComponent';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Footer() {

    return (
        <>
            <footer className="py-4 bg-light mt-auto">
                <div className="container-fluid px-4">
                    <div className="d-flex align-items-center justify-content-between small">
                        <div className="text-muted">Copyright &copy; Your Website 2023</div>
                        <div>
                            <a href="#">Privacy Policy</a>
                            &middot;
                            <a href="#">Terms &amp; Conditions</a>
                        </div>
                    </div>
                </div>
            </footer>
            <div>
                <ToastNotification />
                <ToastError />
                <EditModel />
                <AjaxPost />
            </div>
        </>
    );
}
