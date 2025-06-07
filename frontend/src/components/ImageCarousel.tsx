// src/components/ImageCarousel.tsx
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const ImageCarousel = () => {
    return (
        <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            showArrows={false}
            interval={4000}
        >
            <div>
                <img src="src/images/banner1.jpg" alt="Banner 1" />
            </div>
            <div>
                <img src="src/images/banner2.jpg" alt="Banner 2" />
            </div>
            <div>
                <img src="src/images/banner3.jpg" alt="Banner 3" />
            </div>
        </Carousel>
    );
};

export default ImageCarousel;
