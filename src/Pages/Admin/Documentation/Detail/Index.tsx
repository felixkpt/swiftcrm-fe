import PageHeader from '@/components/PageHeader'
import useAxios from '@/hooks/useAxios'
import useLoadAssets from '@/hooks/useLoadAssets'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import '@/assets/prismjs/prism'
import '@/assets/prismjs/prism.css'

type Props = {}

interface Docs {
    id: string
    title: string
    content: string
    content_short: string
    image: string
}

const Index = (props: Props) => {

    const { id } = useParams()

    const { data, loading, get } = useAxios()

    const { loadImage } = useLoadAssets();

    const [imageUrl, setImageUrl] = useState()

    const [doc, setDoc] = useState<Docs>()

    useEffect(() => {

        if (id && !data)
            get(`admin/documentation/detail/${id}`)
        else {
            setDoc(data?.data)

            if (data?.data?.image) {
                loadImage(data.data.image).then(blob => setImageUrl(blob))                
            }
        }

    }, [id, data])

    return (
        <div className=''>
            {
                !loading && doc &&

                <div>
                    <PageHeader title={doc.title} action="link" actionText="Edit Doc" actionLink={`/admin/documentation/detail/${doc.id}/edit`} permission='/admin/documentation/detail/{id}' method='put' listUrl='/admin/documentation' />
                    <div className='row mb-4'>
                        <div className='col-12 gap-2 d-inline float-left'>
                            <img style={{ width: '320px', height: 240 }} src={imageUrl} alt="Doc image" className='border featured-image p-2 me-3 mb-2 rounded' />
                            <div className='d-block float-left'>
                                <p dangerouslySetInnerHTML={{ __html: String(doc.content) }}></p>
                            </div>
                        </div>
                    </div>
                </div>

            }
        </div>
    )
}

export default Index