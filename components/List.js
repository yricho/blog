import { ListCard } from "./Card"

const List = ({ items }) => {
    return (
        <div>
            {items?.map((item, index) => (
                <div key={index}>
                    <ListCard item={item} />
                </div>
            ))}
        </div>
    )
}

export default List