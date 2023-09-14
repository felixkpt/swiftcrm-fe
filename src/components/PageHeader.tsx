import usePermissions from '@/hooks/usePermissions';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  title: string;
  action?: 'button' | 'link'; // Specify the type of action (button or link)
  actionText?: string;
  actionLink?: string;
  permission?: string; // Permission name
  method?: string; // Method name
  actionTargetId?: string
  listUrl?: string
};

const PageHeader = ({ title, action, actionText, actionLink, permission, method = 'post', actionTargetId, listUrl }: Props) => {
  const [textPermission, setTextPermission] = useState(permission)
  const { checkPermission } = usePermissions()
  const isButton = action === 'button';

  const renderAction = () => {
    if (isButton) {
      return (
        <button type="button" className="btn btn-info text-white" data-bs-toggle="modal" data-bs-target={`#${actionTargetId || 'ActionButton'}`}>{actionText}</button>
      );
    } else if (actionLink) {
      return (
        <NavLink to={actionLink} className="btn btn-info text-white">{actionText}</NavLink>
      );
    }
  };

  useEffect(() => {
    if (!permission) {
      setTextPermission(listUrl)
    }
  }, [permission])

  const isAllowed = () => {
    if (!textPermission) return false
    const hasPermission = checkPermission(textPermission, method)
    return hasPermission;
  };

  return (
    <div className='header-title shadow-sm p-2 rounded mb-3 row justify-content-between'>
      {
        listUrl && isAllowed() &&
        <div className={`col-6 ${isAllowed() ? 'col-md-1 col-lg-2 col-xl-1' : 'col-md-2 col-lg-2 col-xl-1'} d-flex justify-content-start gap-2`}>
          <div>
            <NavLink to={listUrl} className=' btn btn-outline-light shadow view-list'>
              <span className='d-flex align-items-center gap-1 text-dark'>View list
                <Icon className='font-large' icon={`humbleicons:arrow-go-back`} />
              </span>
            </NavLink>
          </div>
        </div>
      }
      <h3 className={`col-12 col-md-10 ${isAllowed() ? 'col-lg-8 col-xl-10' : 'col-lg-10 col-xl-11'} order-3 order-md-2 mt-3 mt-md-0`}>{title}</h3>
      {isAllowed() && (
        <div className='col-6 col-md-1 col-lg-2 col-xl-2 order-2 text-end'>
          {renderAction()}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
