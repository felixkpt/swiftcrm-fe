import AjaxPost from '@/components/AjaxPost';
import ToastError from '@/components/Modals/ToastError';
import ToastNotification from '@/components/Modals/ToastNotification';
import EditModel from '@/components/ModelComponent';

export default function Footer() {

    return (
        <>
            <footer className="mt-4 bg-body-secondary text-center dark:bg-neutral-700 lg:text-left">
                <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
                    <span>© 2023 Copyright: </span>
                    <a className="text-neutral-800 dark:text-neutral-400" href="/">CRM BASE</a>
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
