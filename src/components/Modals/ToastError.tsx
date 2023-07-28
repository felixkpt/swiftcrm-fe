import React, { useEffect, useRef, useCallback } from 'react';

const ToastError: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [title, setTitle] = React.useState<string | React.ReactNode>('');
  const [body, setBody] = React.useState<React.ReactNode>(null);
  const toastNotificationRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to handle the emitted error event
  const handleAxiosError = useCallback((errorMsg: string, statusCode: number) => {
    console.error('Error in useAxios:', errorMsg);

    setTitle(`${statusCode !== 0 ? 'Error ' + statusCode : 'Connection error'}`);
    setBody(<div className="error-modal" dangerouslySetInnerHTML={{ __html: `${errorMsg}` }} />);
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
    // Add event listener for the custom axiosError event
    const eventListener = (event: CustomEvent<{ message: string; statusCode: number }>) => {
      const { message, statusCode } = event.detail;
      handleAxiosError(message, statusCode);
    };

    window.addEventListener('axiosError', eventListener as EventListener);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('axiosError', eventListener as EventListener);
      // Clear the timeout when the component unmounts to avoid potential memory leaks
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleAxiosError]);

  useEffect(() => {
    const notification = toastNotificationRef.current;

    if (!showModal) {
      notification?.querySelector('.toast')?.classList.remove('show');
    }

  }, [showModal, toastNotificationRef]);

  return (
    <div ref={toastNotificationRef} aria-live="polite" aria-atomic="true" className="position-absolute z-1060 right-0 top-0 d-flex justify-content-end align-items-center w-100">

      <div className="toast m-2 bg-danger-subtle" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-header">{title || 'Toast title'}
        </div>
        <div className="toast-body">{ body || 'This is a toast message.'}</div>
      </div>
    </div>
  );
};

export default ToastError;
