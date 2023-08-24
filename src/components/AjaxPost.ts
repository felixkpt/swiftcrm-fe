import useAxios from '@/hooks/useAxios';
import { baseURL, emitAjaxPostDone } from '@/utils/helpers';
import { useEffect, useState } from 'react'

const AjaxPost = () => {

    const { data, post, put, destroy, patch } = useAxios();

    const [form, setForm] = useState();

    const ajaxPost = async (event: CustomEvent<{ [key: string]: any }>) => {

        const rawForm = event.detail.target
        setForm(rawForm);

        const formElement = event.detail.nativeEvent.target; // Get the form element
        const formData = new FormData(formElement); // Create a FormData object from the form
        // console.log('Form Data:', formData); // Log the form data

        // Specify the URL where the post request will be sent
        let url = rawForm?.getAttribute('action-url') || ''; // Get the baseUri from the event detail
        url = baseURL(url);

        const method = (rawForm?.querySelector('input[name="_method"]')?.value || 'post').toLowerCase(); // Get the form's HTTP method
        const button = rawForm?.querySelector('button[type="submit"]')

        if (button) {
            button.disabled = true
            button.classList.add('disabled')
        }

        // Dynamically append data to the FormData based on event details
        Object.entries(event.detail).forEach(([key, value]) => {
            formData.append(key, value);
        });

        let response

        // Make the request
        if (method == 'post') {
            response = await post(url, formData);
        } else if (method == 'put') {
            response = await put(url, formData);
        } else if (method == 'patch') {
            response = await patch(url, formData);
        } else if (method == 'delete') {
            response = await destroy(url, formData);
        }

        emitAjaxPostDone({ elementId: rawForm.id || rawForm?.closest('.modal')?.id || null, response })

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

            emitAjaxPostDone(data)
        }

    }, [data])


    useEffect(() => {
        // Add event listener for the custom ajaxPost event
        const eventListener = (event: CustomEvent<{ [key: string]: any }>) => {
            ajaxPost(event);
        };

        window.addEventListener('ajaxPost', eventListener as EventListener);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('ajaxPost', eventListener as EventListener);
        };
    }, []);

    return null

}

export default AjaxPost