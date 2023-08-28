import Str from "@/utils/Str";

type Props = {
    record: any
    exclude?: string[]
}

function SimpleTable({ record, exclude }: Props) {
    return (
        <div>
            <table className="table table-striped table-bordered rounded">
                <tbody>
                    {Object.keys(record).map((key) => {
                        if (exclude && exclude.length > 0 && exclude.includes(key)) {
                            return null; // Skip this key if it's in the exclude array
                        }
                        return (
                            <tr key={key}>
                                <td className="p-2">
                                    <div className="d-flex flex-column gap-2">
                                        <div className="d-flex">
                                            <span className="fw-bold me-2">{Str.title(key)}:</span>
                                            <span>{record[key]}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="w-1"></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

        </div>
    );
}

export default SimpleTable;
