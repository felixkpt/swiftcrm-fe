import { subscribe, unsubscribe } from '@/utils/events';
import React, { useEffect, useRef, useCallback } from 'react';

const ToastNotification: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [title, setTitle] = React.useState<string | React.ReactNode>('');
  const [body, setBody] = React.useState<React.ReactNode>(null);
  const [toastClass, setToastClass] = React.useState('toast m-2'); // Declare the toastClass variable here
  const toastNotificationRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to handle the emitted error event
  const handleNotification = useCallback((message: string, type: string, status: number) => {

    console.log(message)

    // Define the CSS classes based on the type of the notification
    let toastCls = 'toast m-2';
    let titleText = 'Toast title';

    if (type == 'success') {
      toastCls += ' bg-success-subtle'; // Add the appropriate class for an error notification
      titleText = `Success notification`;
    } else if (type == 'warning') {
      toastCls += ' bg-warning-subtle'; // Add the appropriate class for an error notification
      titleText = `Warning notification`;
    } else if (type == 'error') {
      toastCls += ' bg-danger-subtle'; // Add the appropriate class for an error notification
      titleText = `Error notification ${typeof status === 'number' ? ` (status ${status})` : ''}`;
    } else if (type == 'info') {
      toastCls += ' bg-info-subtle'; // Add the appropriate class for an error notification
      titleText = `Info notification`;
    } else {
      toastCls += ' bg-light-subtle'; // Add the appropriate class for a connection error notification
      titleText = 'General Notification';
    }

    setToastClass(toastCls)

    setTitle(titleText);
    setBody(<div className="error-modal" dangerouslySetInnerHTML={{ __html: `${message}` }} />);
    setShowModal(true);

    const notification = toastNotificationRef.current;

    notification?.querySelector('.toast')?.classList.toggle('show');

    // Clear the previous timeout if it exists
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setShowModal(false);
    }, 4000);
  }, []);

  useEffect(() => {
    // Add event listener for the custom notification event
    const eventListener: EventListener = (event) => {
      const customEvent = event as CustomEvent<{ message: string; type: 'success' | 'info' | 'light' | 'warning' | 'error', status: number }>;
      if (customEvent.detail) {
        const { message, type, status } = customEvent.detail;
        handleNotification(message, type, status);
      }
    };

    subscribe("notification", eventListener);

    // Cleanup the event listener when the component unmounts
    return () => {
      unsubscribe("notification", eventListener);
      // Clear the timeout when the component unmounts to avoid potential memory leaks
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleNotification]);

  useEffect(() => {
    const notification = toastNotificationRef.current;

    if (!showModal) {
      notification?.querySelector('.toast')?.classList.remove('show');
    }

  }, [showModal, toastNotificationRef]);

  return (
    <div ref={toastNotificationRef} aria-live="polite" aria-atomic="true" className="position-fixed z-1060 right-0 top-0 d-flex justify-content-end align-items-center w-100">
      <div className={toastClass} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">{title || 'Toast title'}</div>
        <div className="toast-body">{body || 'This is a toast message.'}</div>
      </div>
    </div>
  );
};

export default ToastNotification;
