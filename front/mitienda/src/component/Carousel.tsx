'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

const images = [
  "/img1.png",
  "/img2.png",
  "/img3.png",
];

export default function Carousel() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="rounded-lg shadow-lg"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-80 relative">
              <Image src={src} alt={`Slide ${index + 1}`} layout="fill" objectFit="cover" className="rounded-lg" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
