import Carousel from "nuka-carousel"

const Banner = ({ items }) => {
    return (
        <div>
            <Carousel
                autoplay
                wrapAround
                renderBottomCenterControls={false} >
                {
                    items.map((item, index) => (
                        <img
                            alt={item.title}
                            className="w-full h-80 object-cover"
                            key={index}
                            src={item.images} />
                    ))
                }
            </Carousel>
        </div>
    )
}

export default Banner