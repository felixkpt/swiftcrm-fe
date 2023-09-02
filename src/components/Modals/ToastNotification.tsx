import { subscribe, unsubscribe } from '@/utils/events';
import React, { useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const ToastNotification: React.FC = () => {

  // Function to handle the emitted error event
  const handleNotification = useCallback((message: string, type: string, status: number) => {

    // Define the CSS classes based on the type of the notification
    let toastCls = 'toast m-2';
    let titleText = 'Toast title';

    if (type == 'success') {
      toastCls += ' bg-success-subtle'; // Add the appropriate class for an error notification
      titleText = `Success notification`;
      toast.success(<Msg title={titleText} content={message} />)

    } else if (type == 'warning') {
      toastCls += ' bg-warning-subtle'; // Add the appropriate class for an error notification
      titleText = `Warning notification`;
      toast.warning(<Msg title={titleText} content={message} />)

    } else if (type == 'error') {
      toastCls += ' bg-danger-subtle'; // Add the appropriate class for an error notification
      titleText = `Error notification ${typeof status === 'number' ? ` (status ${status})` : ''}`;
      toast.error(<Msg title={titleText} content={message} />)

    } else if (type == 'info') {
      toastCls += ' bg-info-subtle'; // Add the appropriate class for an error notification
      titleText = `Info notification`;
      toast.info(<Msg title={titleText} content={message} />)

    } else {
      toastCls += ' bg-light-subtle'; // Add the appropriate class for a connection error notification
      titleText = 'General Notification';
      toast(<Msg title={titleText} content={message} />)

    }


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
    };
  }, [handleNotification]);

  return (
    <>
      <ToastContainer />
    </>
  );
};

interface MsgProps {
  title: string
  content: string
}
const Msg = ({ title, content }: MsgProps) => (
  <div>
    <h6 className='fw-bold'>{title}</h6>
    <div className="error-modal text-sm" dangerouslySetInnerHTML={{ __html: `${content}` }} />
  </div>
)


export default ToastNotification;
