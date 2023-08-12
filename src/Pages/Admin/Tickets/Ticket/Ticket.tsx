
import useAxios from '@/hooks/useAxios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

type Props = {}

interface Documentation {
    id: string
    title: string
    content: string
    content_short: string
    image: string
}

const Ticket = (props: Props) => {

    const { slug } = useParams()

    const { data, loading, errors, get } = useAxios()

    const { loading: loadingImage, errors: errorsImage, getFile: getImage } = useAxios();

    const [imageUrl, setImageUrl] = useState()

    const [documentation, setDocumentation] = useState<Documentation>()

    useEffect(() => {

        get(`admin/documentation/${slug}`)

    }, [slug])

    useEffect(() => {
        if (data) {
            setDocumentation(data?.data)

            if (data?.data?.image) handleFetchImage(data.data.image)

        }

    }, [data])

    const handleFetchImage = async (src: string) => {
        try {
            const imageBlob = await getImage(src);
            const imageSrc = URL.createObjectURL(imageBlob);
            setImageUrl(imageSrc)

        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };

    return (
        <div className='p-2'>
            {
                !loading && documentation &&

                <div>
                    <div className='row mb-4'>
                        <h2 className='col-8'>{documentation.title}</h2>
                        <div className='col-4 d-flex justify-content-end'>
                            <div className='rounded shadow' style={{ width: 240, height: 240 }}>
                                <img src={imageUrl} alt="Doc image" className='border w-100 h-100 rounded' />
                            </div>
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: documentation.content }}></div>
                </div>

            }
        </div>
    )
}

export default Ticket