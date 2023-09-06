import { useEffect, useRef, useState } from 'react';
import { publish, subscribe, unsubscribe } from '@/utils/events';
import RenderAsyncSelect from './RenderAsyncSelect';
import { CollectionItemsInterface } from '@/interfaces/UncategorizedInterfaces';
import Str from '@/utils/Str';
interface ModalProps {
    modelDetails?: any;
    record?: CollectionItemsInterface | null
    modelName?: string;
    fillable?: { [key: string]: { input: string; type: string } };
    actionUrl: string;
    list_sources?: any;
    id?: string
    setKey?: React.Dispatch<React.SetStateAction<number>>; // Use React.Dispatch type for setKey
    size?: 'modal-sm' | 'modal-lg' | 'modal-xl'
}

const AutoModal: React.FC<ModalProps> = ({ modelDetails, record, actionUrl, size, id, setKey, list_sources }) => {

    const [inputData, setInputData] = useState<{ [key: string]: string }>({});
    const [isModalOpen, setIsModalOpen] = useState(true);
    const [hasFillable, setHasFillable] = useState(false);
    const [fillable, setFillable] = useState([]);
    const [modelName, setModelName] = useState([]);
    const [method, setMethod] = useState("POST");

    const [computedSize, setComputedSize] = useState<string>('')

    useEffect(() => {
        if (modelDetails) {
            setFillable(modelDetails?.fillable || []);
            setModelName(modelDetails?.model_name || null);
        }
    }, [modelDetails]);

    useEffect(() => {
        const transformedObject: { [key: string]: string } = {};
        const keys = Object.keys(fillable);
        keys.forEach((key: string) => {
            transformedObject[key] = '';
        });

        let length = keys.length
        if (length > 0) {
            setHasFillable(true);
            setInputData(transformedObject);

            if (size)
                setComputedSize(size)
            else if (length < 8)
                setComputedSize('modal-sm')
            else if (length < 16)
                setComputedSize('modal-lg')
            else if (length > 16)
                setComputedSize('modal-xl')
        }

        if (fillable && record) {

            for (const key in record) {
                transformedObject[key] = record[key];
                setMethod('put')
            }

            setInputData(transformedObject);
        }

    }, [fillable, record]);

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

    }, [modelDetails]);

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

    useEffect(() => {

        subscribe('ajaxPostDone', handleAjaxPostDone as EventListener);

        return () => unsubscribe('ajaxPostDone', handleAjaxPostDone as EventListener);

    }, [])

    
    const handleAjaxPostDone = (event: CustomEvent<{ [key: string]: any }>) => {
   
        if (event.detail) {
            const detail = event.detail;

            if (detail.results) {
                if (detail.elementId === id && setKey) {
                    setTimeout(() => {
                        setKey((curr) => curr + 1);
                    }, 300);
                } else {
                    publish('reloadAutoTable', { tableId: modelDetails.tableId });
                }
            }
        }
    };

    return (
        <div ref={rootRef || null}>
            <div className={`modal fade`} id={`${id || 'AutoModal'}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden={`${isModalOpen ? 'true' : 'false'}`}>
                <div className={`modal-dialog ${computedSize}`}>
                    <div className="modal-content">
                        {modelDetails && isModalOpen ?
                            <div>
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">{`${record && record.id ? 'Edit' : 'Create'} ${modelName}`}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form ref={formRef} method='post' action-url={actionUrl} onSubmit={(e: any) => publish('ajaxPost', e)} className="flex justify-center">
                                        <div className="container-fluid">
                                            <input type="hidden" name="_method" value={method} />
                                            <div className="row">
                                                {hasFillable ? (
                                                    Object.keys(fillable).map((key) => {
                                                        const { input, type } = fillable[key];
                                                        const current_key = key.replace(/_multilist$/, '_list')

                                                        return (
                                                            <div key={current_key} className={`col-12 ${computedSize !== 'modal-sm' ? 'col-md-6 col-xl-6' : ''}`}>
                                                                <div className="form-group mb-2" id={`form-group-section-${current_key}`}>
                                                                    <div className="mb-2 block">
                                                                        <label htmlFor="small">{Str.title(current_key)}</label>
                                                                    </div>
                                                                    {input === 'input' && type !== 'file' && (
                                                                        <input
                                                                            className="form-control"
                                                                            id={current_key}
                                                                            type={guessType(current_key)}
                                                                            name={current_key}
                                                                            value={inputData[current_key] || ''}
                                                                            onChange={(e) => handleInputChange(current_key, e.target.value)}
                                                                            key={current_key}
                                                                        />
                                                                    )}
                                                                    {input === 'input' && type === 'file' && (
                                                                        <input
                                                                            className="form-control"
                                                                            id={current_key}
                                                                            type="file"
                                                                            name={current_key}
                                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                                const files = e.target.files;
                                                                                const fileNames = files ? Array.from(files).map((file) => file.name).join(', ') : '';
                                                                                handleInputChange(current_key, fileNames);
                                                                            }}
                                                                            key={current_key}
                                                                        />
                                                                    )}

                                                                    {input === 'select' && <RenderAsyncSelect list_sources={list_sources} current_key={current_key} inputData={inputData} isMulti={false} />}

                                                                    {input === 'multiselect' && <RenderAsyncSelect list_sources={list_sources} current_key={current_key} inputData={inputData} isMulti={true} />}

                                                                    {input === 'textarea' && (
                                                                        <textarea
                                                                            id={current_key}
                                                                            className="form-control"
                                                                            name={current_key}
                                                                            value={inputData[current_key] || ''}
                                                                            onChange={(e) => handleInputChange(current_key, e.target.value)}
                                                                            key={current_key}
                                                                            rows={7}
                                                                        ></textarea>
                                                                    )}
                                                                </div>
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
                                        </div>
                                    </form>
                                </div>
                            </div>
                            : 'Model data incomplete'
                        }
                    </div>
                </div>
                <button type="button" className="d-none" data-bs-toggle="modal" data-bs-target="#AutoModal"></button>
            </div>
        </div>
    );
};

export default AutoModal;
