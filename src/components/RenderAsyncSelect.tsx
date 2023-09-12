import Select, { PropsValue } from 'react-select';
import Str from '@/utils/Str';
import { useEffect, useState } from "react";
import { ListSourceInterface } from '@/interfaces/UncategorizedInterfaces';

interface RenderAsyncSelectProps {
    current_key: string;
    currentData: { };
    isMulti?: boolean;
    list_sources: ListSourceInterface[];
}

const RenderAsyncSelect = ({ list_sources, current_key, currentData, isMulti = false }: RenderAsyncSelectProps) => {

    console.log('loaded')
    async function getOptions(current_key: string, rawSelected: PropsValue<object> | undefined) {
        try {
            const fn = Str.camel(current_key);
            const options = await list_sources[fn]();

            let selected = rawSelected
            if (typeof rawSelected === 'string') {
                selected = options.find((option: any) => String(option.id) === rawSelected)
            }

            return { options, selected };
        } catch (e) {
            console.log(e);
        }
        return {};

    }

    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState<PropsValue<object> | undefined>();

    useEffect(() => {

        if (current_key) {

            async function fetchData() {
                const currentValue = currentData || (isMulti ? [] : '');
                const { options: fetchedOptions, selected: fetchedSelected } = await getOptions(current_key, currentValue);

                setOptions(fetchedOptions);
                setSelected(fetchedSelected);
            }

            fetchData();
        }

    }, [current_key, currentData, isMulti]);

    return (
        <Select
            id={current_key}
            className="form-control"
            name={isMulti ? `${current_key}[]` : current_key}
            key={current_key}
            defaultValue={selected}
            value={selected}
            isMulti={isMulti}
            options={options}
            onChange={(val) => setSelected(val)}
            getOptionValue={(option) => `${option['id']}`}
            getOptionLabel={(option) => `${option['name']}`}
        />
    );
};

export default RenderAsyncSelect