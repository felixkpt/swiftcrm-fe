
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

// Event emitter to emit error to the parent component
export const emitNotification = (messsage: string, type?: 'success' | 'info' | 'light' | 'warning' | 'error') => {
    const event = new CustomEvent('notification', {
        detail: { message: messsage, type: type },
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