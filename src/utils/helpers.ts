export function generateRoutes(routesInit) {
    const routes = [];

    for (const index in routesInit) {
        const route = routesInit[index];

        // Skip hidden routes
        if (route.hidden) {
            continue;
        }

        const data = {
            path: route.path,
            slug: route.slug,
            title: route.title,
            children: []
        };

        if (route.routes?.length > 0) {
            data.children = childrenWithRoutes(route.routes);
        }

        // Recursive child routes
        if (route.children && Object.keys(route.children).length > 0) {
            const children = generateRoutes(route.children);
            data.children = [...data.children, ...children];
        }

        routes.push(data);
    }

    return routes;
}

function childrenWithRoutes(children) {
    const output = [];

    for (const index in children) {
        const child = children[index];

        if (child.routes?.length > 0) {
            child.children = childrenWithRoutes(child.routes);
        }

        output.push(child);
    }

    return output;
}

export function generatePermissions(routesInit, basePath = '/') {
    const permissions = [];

    for (const route of routesInit) {
        // Skip hidden routes
        if (route.hidden) {
            continue;
        }

        const data = {
            path: path.resolve(basePath, route.path),
            slug: route.slug
        };

        permissions.push(data);

        // Recursive child routes
        if (route.children) {
            const children = route.children.map(child => {
                const p = path.resolve(data.path, child.path);
                const s = (data.slug + '.' + child.slug).replace(/\.+/g, '.');
                return {
                    ...child,
                    path: p,
                    slug: s
                };
            });

            permissions.push(...generatePermissions(children, data.path));
        }
    }

    return permissions;
}



export function convertToTitleCase(str: string) {
    return str.toLowerCase().replace(/_/g, ' ').replace(/(^|\s)\w/g, function (match: string) {
        return match.toUpperCase();
    });
}


// Event emitter to emit error to the parent component
export const emitError = (errorMsg: string, status?: number) => {
    const event = new CustomEvent('axiosError', {
        detail: { message: errorMsg, statusCode: status },
    });
    window.dispatchEvent(event);
};

// Event emitter to emit PrepareEdit to the parent component
export const emitPrepareEdit = (row: any, action: any, data: any) => {
    const event = new CustomEvent('prepareEdit', {
        detail: { row, action, data }
    });
    window.dispatchEvent(event);
};

// Event emitter to emit statusUpdate to the parent component
export const emitStatusUpdate = (e: Event) => {
    e.preventDefault()
    const event = new CustomEvent('statusUpdate', {
        detail: e,
    });
    window.dispatchEvent(event);
};

// Event emitter to emit emitAjaxPost to the parent component
export const emitAjaxPost = (e: Event) => {
    e.preventDefault()
    const event = new CustomEvent('ajaxPost', {
        detail: e,
    });
    window.dispatchEvent(event);
};

// Event emitter to emit emitAjaxPost to the parent component
export const emitAjaxPostDone = (response: any) => {
    const event = new CustomEvent('ajaxPostDone', {
        detail: response,
    });
    window.dispatchEvent(event);
};