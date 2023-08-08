import Str from '@/utils/Str'
import { Icon } from '@iconify/react/dist/iconify.js'

import { NavLink } from 'react-router-dom'



const isResolvableURI = (uri: string) => {
    const urisWithParams = uri.split('|').filter(uri => uri.includes('{'));
    const hasGetOrHead = uri.includes('@GET') || uri.includes('@HEAD');
    return urisWithParams.length === 0 && hasGetOrHead;
};

function cleanUri(uri) {

    uri = `/${uri.startsWith('admin') ? '' : 'admin/'}${uri}`

    uri = Str.before(uri, '@')

    return uri

}

const filteredRouteList = (routeTest) => {
    if (routeTest?.length > 0)
        return routeTest?.filter((route) => isResolvableURI(route.uri) && !route.hidden)
    else return []
}

const RoutesList = ({ routes }) => {


    const filteredRoutes = filteredRouteList(routes)

    return (
        <>
            {
                filteredRoutes.length > 0
                &&
                <>
                    {
                        filteredRoutes.map((route, i) =>
                            <li className='link' key={`${i}+_${route.uri}`}>
                                <NavLink
                                    to={cleanUri(route.uri)}
                                    className="form-check-label py-1 text-light text-decoration-none px-3 cursor-pointer d-flex align-items-center gap-1"
                                >
                                    <Icon icon={`${route.icon || 'mdi:leads'}`} />
                                    <span>{route.title}</span>
                                </NavLink>
                            </li>)
                    }
                </>
            }
        </>

    )
}

export default RoutesList