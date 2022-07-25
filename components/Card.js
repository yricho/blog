import { useRouter } from "next/router"

const Card = ({ item }) => {
    const {
        createdAt,
        title,
        image,
        previewContent,
        content,
        createBy,
        id,
    } = item
    return (
        <div>
            <h1>
                {title}
            </h1>
            <div>
                {image}
            </div>
        </div>
    )
}

export const ListCard = ({ item }) => {
    const router = useRouter()
    const { id, title, image, previewContent } = item
    return (
        <div
            style={{
                border: '1px solid'
            }}
            onClick={() => router.push(`/${id}`)}>
            <h1>
                {title}
            </h1>
            <div>
                <img src={image} />
            </div>
            <div>
                {previewContent}
            </div>
        </div>
    )

}

export default Card