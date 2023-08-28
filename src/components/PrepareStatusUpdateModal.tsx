import { useEffect, useState } from 'react'
import { subscribe, unsubscribe } from '@/utils/events'
import AutoModal from './AutoModal'
import { emitAjaxPost } from '@/utils/helpers'

const PrepareStatusUpdateModal = () => {

    const [modelDetails, setModelDetails] = useState({})
    const [record, setRecord] = useState<any>(false)

    const [actionUrl, setActionUrl] = useState<string>('')

    const prepareStatusUpdate = async (event: CustomEvent<{ [key: string]: any }>) => {

        const detail = event?.detail
        if (detail) {
            setModelDetails(detail.modelDetails)
            setRecord(detail.record)
            setActionUrl(detail.action)
        }

        document.getElementById("showStatusUpdate")?.click()

    }

    useEffect(() => {

        // Add event listener for the custom ajaxPost event
        const prepareEventListener: EventListener = (event) => {

            const customEvent = event as CustomEvent<{ [key: string]: any }>;
            if (customEvent.detail) {
                prepareStatusUpdate(customEvent);
            }
        };

        subscribe('prepareStatusUpdate', prepareEventListener);

        // Cleanup the event listener when the component unmounts
        return () => {
            unsubscribe('prepareStatusUpdate', prepareEventListener);
        };
    }, []);
    return (
        <div>
            <button id='showStatusUpdate' type="button" className="btn btn-info text-white d-none" data-bs-toggle="modal" data-bs-target="#StatusUpdate"></button>
            <div className={`modal fade`} id="StatusUpdate" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden={`true`}>

                <div className="modal-dialog modal-dialog-top animated zoomIn animated-3x   ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title title" id="StatusUpdate_label">Status update</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="section">
                                <form encType="" method="post" action-url={actionUrl} onSubmit={(e: any) => emitAjaxPost(e)} >
                                    <input type="hidden" name="_method" value="patch" />

                                    <div>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique non reprehenderit doloremque ducimus corporis! Assumenda laudantium recusandae exercitationem possimus sed magni harum eveniet ut earum omnis eos, aperiam soluta odit.
                                    </div>
                                    <div className="form-group mt-2">
                                        <button type="submit" className="btn  btn-primary submit-btn ">Save Information</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrepareStatusUpdateModal