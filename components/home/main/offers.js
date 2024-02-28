import styles from "./styles.module.scss";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from 'swiper/modules';
import { offersArray } from './../../../data/home.js';
import Link from "next/link";

export default function Offers() {
    return (
        <div className={styles.offers}>
            <Swiper
                slidesPerView={3}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="offersSwiper"
            >
                {
                    offersArray.map((offer) => (
                        <SwiperSlide>
                            <Link href=''>
                                <img src={offer.image} alt='Discounted Item'/>
                            </Link>
                            <span>${offer.price}</span>
                            <span>-{offer.discount}%</span>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}