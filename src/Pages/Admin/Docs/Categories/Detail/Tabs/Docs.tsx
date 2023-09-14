import Documentation from '../../../Index'

type Props = {
    category: any
}

const Docs = (props: Props) => {
    return (
        <div>
            <Documentation key={props.category?.id || 0} category={props.category} />
        </div>
    )
}

export default Docs