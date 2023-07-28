import React, { useEffect, useState } from 'react'
import AutoModal from './Modals/AutoModal'

type Props = {}

const EditModel = (props: Props) => {

    const [showAutoModal, setShowAutoModal] = useState(false)
    const [data, setData] = useState<any>(false)
    const [row, setRow] = useState<any>(false)
    const [action, setActionUrl] = useState<string>('')

    const prepareEdit = async (event: CustomEvent<{ [key: string]: any }>) => {

        const detail = event?.detail
        if (detail) {
            setData(detail.data)
            setRow(detail.row)
            setActionUrl(detail.action)
        }

        setShowAutoModal(true)
    }

    useEffect(() => {

        // Add event listener for the custom ajaxPost event
        const prepareEditEventListener = (event: CustomEvent<{ [key: string]: any }>) => {
            prepareEdit(event);
        };

        window.addEventListener('prepareEdit', prepareEditEventListener as EventListener);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener('prepareEdit', prepareEditEventListener as EventListener);
        };
    }, []);
    return (
        <div>
            {
                showAutoModal && <>
                    <AutoModal
                        action='Edit'
                        data={data}
                        row={row}
                        actionUrl={action}
                        response
                    />
                </>
            }
        </div>
    )
}

export default EditModel