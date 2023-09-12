import AutoTable from '@/components/AutoTable';
import AutoModal from '@/components/AutoModal';
import { useState } from 'react';
import { ListSourceInterface } from '@/interfaces/UncategorizedInterfaces';
import PageHeader from '@/components/PageHeader';
import useAxios from '@/hooks/useAxios';

const Index = () => {
    const [modelDetails, setModelDetails] = useState({})
    const { get } = useAxios()

    const list_sources = {
        async sectionId() {
            const res = await get('/admin/docs/categories?all=1').then((res) => res)
            return res.data || [] as ListSourceInterface[];
        }
    };

    return (
        <div>
            <PageHeader title={'Topics List'} action="button" actionText="Create Topic" actionTargetId="AutoModal" permission='/admin/docs/categories/topics' />
            <AutoTable
                baseUri='/admin/docs/categories/topics'
                columns={[
                    {
                        label: 'ID',
                        key: 'id',
                    },
                    {
                        label: 'Topic Title',
                        key: 'title',
                    },
                    {
                        label: 'Topic Slug',
                        key: 'slug',
                    },
                    {
                        label: 'Action',
                        key: 'action',
                    }

                ]}
                getModelDetails={setModelDetails}
                search={true}
            />
            {
                modelDetails && <><AutoModal modelDetails={modelDetails} actionUrl='/admin/docs/categories/topics' list_sources={list_sources} /></>
            }
        </div>
    );
};

export default Index;

