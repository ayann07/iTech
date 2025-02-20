import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import carousal1 from "../assets/carousal1.jpg";
import carousal2 from "../assets/carousal2.jpg";
import carousal3 from "../assets/carousal3.jpg";
import carousal4 from "../assets/carousal4.jpg";
import carousal5 from "../assets/carousal5.jpg";
import Products from "../components/Products";

const Home = () => {
    const images = [carousal2, carousal3, carousal4, carousal5,carousal1];

    return (
        <div className="flex flex-col items-center justify-around mt-[60px] w-full">
            <div className="text-center">
                <h1 className="text-5xl font-extrabold">iTech Store</h1>
                <h4 className="text-2xl font-serif">Experience the best of Apple technology</h4>
            </div>

            <div className="w-11/12 mt-6">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="rounded-lg shadow-lg"
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index} className="flex justify-center items-center">
                            <img 
                                src={img} 
                                alt={`Slide ${index + 1}`} 
                                className="w-full h-[600px] md:h-[600px] sm:h-[400px] object-cover rounded-lg"
                                
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <Products/>
        </div>
    );
};

export default Home;


