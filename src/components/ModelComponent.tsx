import { useEffect, useState } from 'react'
import { subscribe, unsubscribe } from '@/utils/events'
import AutoModal from './AutoModal'

const EditModel = () => {

    const [showAutoModal, setShowAutoModal] = useState(false)
    const [modelDetails, setModelDetails] = useState({})
    const [record, setRecord] = useState<any>(false)
    const [list_sources, setListSources] = useState<object[]>([])

    const [action, setActionUrl] = useState<string>('')

    const prepareEdit = async (event: CustomEvent<{ [key: string]: any }>) => {

        const detail = event?.detail
        if (detail) {
            setModelDetails(detail.modelDetails)
            setRecord(detail.record)
            setActionUrl(detail.action)
            setListSources(detail.list_sources)
        }

        setShowAutoModal(true)

        document.getElementById("showAutoModal")?.click()
        
    }

    useEffect(() => {

        // Add event listener for the custom ajaxPost event
        const prepareEditEventListener: EventListener = (event) => {

            const customEvent = event as CustomEvent<{ [key: string]: any }>;
            if (customEvent.detail) {
                prepareEdit(customEvent);
            }
        };

        subscribe('prepareEdit', prepareEditEventListener);

        // Cleanup the event listener when the component unmounts
        return () => {
            unsubscribe('prepareEdit', prepareEditEventListener);
        };
    }, []);
    return (
        <div>
            <button id='showAutoModal' type="button" className="btn btn-info text-white" data-bs-toggle="modal" data-bs-target="#AutoModal">Create User</button>

            <AutoModal
                modelDetails={modelDetails}
                record={record}
                actionUrl={action}
                list_sources={list_sources}
            />
        </div>
    )
}

export default EditModel