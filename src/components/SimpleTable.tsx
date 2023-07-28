import { convertToTitleCase } from "@/utils/helpers"

type Props = {
    row: any
}

function SimpleTable({ row }: Props) {
    
    return (
        <div>
            <table className="border-collapse">
                <tbody>
                    <tr>
                        <td className="p-4">
                            <div className="flex flex-col space-y-2">
                                {Object.keys(row).map((key) => {
                                    return (
                                        <div className="flex" key={key}>
                                            <span className="font-semibold mr-2">{convertToTitleCase(key)}:</span>
                                            <span>{row[key]}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </td>
                        <td className="w-1"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default SimpleTable