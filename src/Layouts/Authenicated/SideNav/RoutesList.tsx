import React from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { NavLink } from 'react-router-dom';
import Str from '@/utils/Str';

function cleanUri(uri: string): string {
    uri = `/${uri.startsWith('admin') ? '' : 'admin/'}${uri}`;
    uri = Str.before(uri, '@');
    return uri;
}

interface Route {
    uri: string;
    icon?: string;
    title: string;
}

interface RoutesListProps {
    routes: Route[];
}

const RoutesList: React.FC<RoutesListProps> = ({ routes }) => {
    return (
        <>
            {routes.length > 0 && (
                <>
                    {routes.map((route, i) => (
                        <li className="link" key={`${i}_${route.uri}`}>
                            <NavLink
                                to={cleanUri(route.uri)}
                                className="form-check-label py-1 text-light text-decoration-none px-3 cursor-pointer d-flex align-items-center gap-1"
                            >
                                <Icon icon={route.icon || 'mdi:leads'} />
                                <span>{route.title}</span>
                            </NavLink>
                        </li>
                    ))}
                </>
            )}
        </>
    );
};

export default RoutesList;
