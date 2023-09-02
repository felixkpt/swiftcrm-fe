import useAxios from '@/hooks/useAxios';
import { publish, subscribe, unsubscribe } from '@/utils/events';
import { baseURL } from '@/utils/helpers';
import { useEffect, useState } from 'react'

const AjaxPost = () => {

    const { data, post, put, destroy, patch } = useAxios();

    const [form, setForm] = useState();

    const handleEvent = async (event: CustomEvent<{ [key: string]: any }>) => {

        const files = event.detail?.files ?? []

        const rawForm = event.detail.target
        setForm(rawForm);

        const formElement = event.detail.nativeEvent.target; // Get the form element
        const formData = new FormData(formElement); // Create a FormData object from the form

        // Append files to the FormData as an array
        files.forEach((file) => {
            formData.append('files_array[]', file);
        });

        // Specify the URL where the post request will be sent
        let url = rawForm?.getAttribute('action-url') || ''; // Get the baseUri from the event detail
        url = baseURL(url);

        const method = (rawForm?.querySelector('input[name="_method"]')?.value || 'post').toLowerCase(); // Get the form's HTTP method
        const button = rawForm?.querySelector('button[type="submit"]')

        if (button) {
            button.disabled = true
            button.classList.add('disabled')
        }

        let results

        // Make the request
        if (method == 'post') {
            results = await post(url, formData);
        } else if (method == 'put') {
            results = await put(url, formData);
        } else if (method == 'patch') {
            results = await patch(url, formData);
        } else if (method == 'delete') {
            results = await destroy(url, formData);
        }

        publish('ajaxPostDone', { elementId: rawForm.id || rawForm?.closest('.modal')?.id || null, results })

        if (button) {
            button.disabled = false
            button.classList.remove('disabled')
        }

    };

    useEffect(() => {

        if (data && form) {
            const modal = form?.closest('.modal')

            if (modal && !modal.classList.contains('persistent-modal')) {

                const modalToggleBtn = modal.querySelector('button[data-bs-dismiss="modal"]') || modal.querySelector('button[data-bs-toggle="modal"]');

                if (modalToggleBtn) {
                    modalToggleBtn.click();
                }
            }
        }

    }, [data])

    const eventListener = (event: CustomEvent<{ [key: string]: any }>) => {
        event.preventDefault()
        handleEvent(event);
    };

    useEffect(() => {

        subscribe('ajaxPost', eventListener as EventListener);

        // Cleanup the event listener when the component unmounts
        return () => {
            unsubscribe('ajaxPost', eventListener as EventListener);
        };

    }, []);

    return null
}

export default AjaxPost