import Card from "./Card"

const List = ({ items }) => {
    return (
        <div className="grid sm:grid-cols-2 gap-4">
            {items?.map((item, index) => (
                <div key={index}>
                    <Card item={item} />
                </div>
            ))}
        </div>
    )
}

export default List