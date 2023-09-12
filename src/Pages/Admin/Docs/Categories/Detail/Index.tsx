import PageHeader from '@/components/PageHeader'
import useAxios from '@/hooks/useAxios'
import useLoadAssets from '@/hooks/useLoadAssets'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import '@/assets/prismjs/prism'
import '@/assets/prismjs/prism.css'
import AutoTable from '@/components/AutoTable'
import AutoModal from '@/components/AutoModal'
import { ListSourceInterface } from '@/interfaces/UncategorizedInterfaces'

type Props = {}

interface Docs {
  id: string
  title: string
  content: string
  content_short: string
  image: string
}

const Index = (props: Props) => {

  const { slug } = useParams()

  const { data, loading, get } = useAxios()
  const { get:getCats } = useAxios()

  const [doc, setDoc] = useState<Docs>()

  useEffect(() => {

    if (slug && !data)
      get(`/admin/docs/categories/${slug}`)
    else {
      setDoc(data?.data)
    }

  }, [slug, data])

  const [modelDetails, setModelDetails] = useState({})

  const list_sources = {
    async categoryId() {
      const res = await getCats('/admin/docs/categories?all=1').then((res) => res)
      return res.data || [] as ListSourceInterface[];
    }
  };

  return (
    <div className=''>
      {
        !loading && doc &&

        <div>
          <PageHeader title={doc.title} action="button" actionText="Edit Category" actionTargetId="AutoModal" permission='/admin/docs/categories' />

          <PageHeader title={'Topics List'} action="button" actionText="Create Topic" actionTargetId="AutoModal" permission='/admin/docs/categories/topics' />

          <AutoTable
            baseUri={`/admin/docs/categories/${slug}/topics`}
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
            modelDetails && <><AutoModal modelDetails={modelDetails} actionUrl={`/admin/docs/categories/topics`} list_sources={list_sources} /></>
          }
        </div>

      }
    </div>
  )
}

export default Index