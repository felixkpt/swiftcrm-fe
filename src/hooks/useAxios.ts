import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { clearErrors, showErrors } from '@/utils/validation-errors';
import { useAuth } from '@/contexts/AuthContext';
import { emitError } from '@/utils/helpers';

axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_API;


interface AxiosResponseWithData<T> extends AxiosResponse {
    data: T;
}

const useAxios = <T = any>() => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    // Create an Axios instance with a request interceptor
    const axiosInstance = axios.create();

    // Assuming you have a useAuth hook that manages user authentication and provides the user object with the token
    const { user, deleteUser } = useAuth();

    // Request interceptor to add Authorization header if user is authenticated
    axiosInstance.interceptors.request.use(
        (config) => {
            if (user) {
                config.headers = {
                    ...config.headers,
                    Authorization: `Bearer ${user.token}`,
                };
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const fetchData = async (config) => {
        clearErrors()

        try {
            setLoading(true);
            const response = await axiosInstance(config);
            setData(response.data?.results);

            setErrors(null);
            return response.data?.results
        } catch (error) {

            const axiosError = error as AxiosErrorWithResponse;

            if (axios.isAxiosError(axiosError)) {

                if (axiosError.response !== undefined) {
                    const status = axiosError.response.status;

                    const msg = axiosError.response?.data?.message || 'An error occurred.'
                    setErrors(msg);

                    if (status && status !== 200 && status !== 201 && status !== 401) {

                        emitError(msg, status)
                    }

                    if (status === 401 && msg === 'Unauthenticated.') {
                        deleteUser()
                    }

                    // Handle validation errors in the response data
                    if (axiosError.response?.data.errors) {
                        showErrors(axiosError.response.data);
                    }


                } else {
                    const msg = 'We are experiencing server connection issues.'
                    setErrors(msg);
                    emitError(msg, 0)
                }
            } else {
                const msg = err?.message || 'An unexpected error occurred.'
                setErrors(msg);
                emitError(msg, 0)
            }

        } finally {
            setLoading(false);
        }
    };

    const get = (url, config = {}) => fetchData({ method: 'GET', url, ...config });
    const post = (url, data = {}, config = {}) => fetchData({ method: 'POST', url, data, ...config });
    const put = (url, data = {}, config = {}) => fetchData({ method: 'POST', url, data, ...config, _method: 'patch' });
    const patch = (url, data = {}, config = {}) => fetchData({ method: 'PATCH', url, data, ...config });
    const destroy = (url, config = {}) => fetchData({ method: 'DELETE', url, ...config });
    const getFile = async (url, config = {}) => {

        try {
            setLoading(true);
            const response = await axiosInstance({
                method: 'GET',
                url: `/admin/file-repo/${url}`,
                responseType: 'blob', // This tells Axios to handle the response as a binary blob
                ...config,
            });

            const file = new Blob([response.data], { type: response.headers['content-type'] });
            return file;
        } catch (error) {
            // Error handling code...
        } finally {
            setLoading(false);
        }
    };


    return { data, loading, errors, get, post, put, patch, destroy, getFile };
};

export default useAxios;
