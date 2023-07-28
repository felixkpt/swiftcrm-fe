import { ResponseData } from "@/interfaces";
import { Modal as M } from "flowbite-react";
import { useEffect, useState } from "react";
import SimpleTable from "../SimpleTable";

type ModalShowProps = {
    row: object | null
    size: string | undefined
    response: (data: ResponseData) => ResponseData | void;
}

const ViewModal: React.FC<ModalShowProps> = ({ row, size, response }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {

        if (row && Object.keys(row).length > 0) {
            setIsModalOpen(true)
            console.log(row)
        }

    }, [row])

    const handleCancelClick = () => {
        response({ type: 'cancelled', message: 'Process was cancelled', data: null })
    }

    return (

        <div>
            <M show={isModalOpen} onClose={handleCancelClick} size={size} className="z-9999">
                <M.Header>
                    Match Details
                </M.Header>
                <M.Body>
                    {row &&
                        <div className="text-gray-200">
                            <SimpleTable row={row} />
                        </div>
                    }
                </M.Body>
            </M>
        </div>
    )
}

export default ViewModal