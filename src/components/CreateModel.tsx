import { useEffect, useRef, useState } from 'react';
import { convertToTitleCase, emitAjaxPost } from '@/utils/helpers';

interface ModalProps {
    modelName?: string;
    fillable?: { [key: string]: { input: string; type: string } };
    data: any;
    actionUrl: string;
}

const CreateModel: React.FC<ModalProps> = ({ data, actionUrl }) => {
    const [inputData, setInputData] = useState<{ [key: string]: string }>({});
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [hasFillable, setHasFillable] = useState(false);
    const [fillable, setFillable] = useState([]);
    const [modelName, setModelName] = useState([]);
    const [method, setMethod] = useState("POST");

    function getActionUrl() {
        const baseURL = import.meta.env.VITE_APP_BASE_API;

        // Check if the actionUrl starts with "http" or "https"
        if (!actionUrl.startsWith('http') && baseURL) {
            // Prepend the baseURL if actionUrl does not start with "http"
            actionUrl = baseURL + actionUrl;
        }

        return actionUrl;
    }

    useEffect(() => {
        if (data) {
            setFillable(data?.fillable || []);
            setModelName(data?.model_name || null);
        }
    }, [data]);

    useEffect(() => {
        const transformedObject: { [key: string]: string } = {};
        const keys = Object.keys(fillable);
        keys.forEach((key: string) => {
            transformedObject[key] = '';
        });

        if (keys.length > 0) {
            setHasFillable(true);
            setInputData(transformedObject);
        }

        if (fillable) {
            for (const key in fillable) {
                const { input, type } = fillable[key];
                transformedObject[key] = '';

            }
            setInputData(transformedObject);
        }
    }, [fillable]);

    const errors = {};

    const formRef = useRef<HTMLFormElement>(null);
    const firstErrorRef = useRef<HTMLDivElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);

    const handleInputChange = (key: string, value: string) => {
        setInputData((prevInputData) => ({
            ...prevInputData,
            [key]: value,
        }));
    };

    useEffect(() => {
        setIsModalOpen(true);

    }, [data]);

    useEffect(() => {
        if (errors && Object.keys(errors).length > 0 && !firstErrorRef.current) {
            const firstErrorKey = Object.keys(errors)[0];
            const firstErrorElement = document.getElementById(`form-group-section-${firstErrorKey}`);
            if (firstErrorElement) {
                firstErrorElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [errors]);

    const guessType = (name: string) => {
        if (fillable && fillable[name] && fillable[name].type) {
            return fillable[name].type;
        }
        return 'text';
    };

    return (
        <div ref={rootRef || null}>
            <div ref={rootRef.current ?? undefined} className={`modal fade`} id="createModel" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden={`${isModalOpen ? 'true' : 'false'}`}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        {data && isModalOpen ?
                            <div>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">{`Create ${modelName}`}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form ref={formRef} method='post' action={getActionUrl()} onSubmit={(e: any) => emitAjaxPost(e)} className="flex justify-center">
                                        <input type="hidden" name="_method" value={method} />
                                        <div className="flex max-w-md flex-col gap-4">
                                            {hasFillable ? (
                                                Object.keys(fillable).map((key) => {
                                                    const { input, type } = fillable[key];
                                                    return (
                                                        <div key={key} className="form-group mb-2" id={`form-group-section-${key}`}>
                                                            <div className="mb-2 block">
                                                                <label htmlFor="small">{convertToTitleCase(key)}</label>
                                                            </div>
                                                            {input === 'input' && type !== 'file' && (
                                                                <input
                                                                    className="form-control"
                                                                    id={key}
                                                                    type={guessType(key)}
                                                                    name={key}
                                                                    value={inputData[key] || ''}
                                                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                                                    key={key}
                                                                />
                                                            )}
                                                            {input === 'input' && type === 'file' && (
                                                                <input
                                                                    className="form-control"
                                                                    id={key}
                                                                    type="file"
                                                                    name={key}
                                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                        const files = e.target.files;
                                                                        const fileNames = files ? Array.from(files).map((file) => file.name).join(', ') : '';
                                                                        handleInputChange(key, fileNames);
                                                                    }}
                                                                    key={key}
                                                                />
                                                            )}
                                                            {input === 'select' && (
                                                                <select
                                                                    id={key}
                                                                    className="form-control"
                                                                    name={key}
                                                                    value={inputData[key] || ''}
                                                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                                                    key={key}
                                                                >
                                                                    <option value="">--Please select--</option>
                                                                </select>
                                                            )}
                                                            {input === 'textarea' && (
                                                                <textarea
                                                                    id={key}
                                                                    className="form-control"
                                                                    name={key}
                                                                    value={inputData[key] || ''}
                                                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                                                    key={key}
                                                                    rows={7}
                                                                ></textarea>
                                                            )}
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <p>Model has no fillable fields.</p>
                                            )}
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            : 'Model data incomplete'
                        }
                    </div>
                </div>
                <button type="button" className="d-none" data-bs-toggle="modal" data-bs-target="#createModel"></button>
            </div>
        </div>
    );
};

export default CreateModel;
