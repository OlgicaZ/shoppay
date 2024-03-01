import { useSession } from 'next-auth/react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineClipboardList } from "react-icons/hi";
import { AiOutlineMessage } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import React, { useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards, Navigation } from 'swiper/modules';
import { userSwiperArray } from '@/data/home';

export default function User() {
    const { data: session } = useSession();
    return (
        <div className={styles.user}>
            <img className={styles.user__header} src='./../../../images/userheader.jpg' alt='light pink background' />
            <div className={styles.user__container}>
                {
                    session ?
                        <div className={styles.user__infos}>
                            <img src={session.user?.image} alt='user profile picture' />
                            <h4>{session.user?.name}</h4>
                        </div> :
                        <div className={styles.user__infos}>
                            <img src='https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/user-male-circle-blue-512.png' alt='user profile picture' />
                            <div className={styles.user__infos_btns}>
                                <button>Register</button>
                                <button>Login</button>
                            </div>
                        </div>
                }
                <ul className={styles.user__links}>
                    <li>
                        <Link href='/'>
                            <IoSettingsOutline />
                        </Link>
                    </li>
                    <li>
                        <Link href='/'>
                            <HiOutlineClipboardList />
                        </Link>
                    </li>
                    <li>
                        <Link href='/'>
                            <AiOutlineMessage />
                        </Link>
                    </li>
                    <li>
                        <Link href='/'>
                            <BsHeart />
                        </Link>
                    </li>
                </ul>
                <div className={styles.user__swiper}>
                    <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        navigation={true}
                        modules={[EffectCards, Navigation]}
                        className="userMenu__swiper"
                        style={{maxWidth: '180px', height: '230px', marginTop: '2rem'}}
                    >
                        {
                            userSwiperArray.map((item) => (
                                <Link>
                                    <SwiperSlide>
                                        <img src={item.image} />
                                    </SwiperSlide>
                                </Link>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
            <img className={styles.user__footer} src='./../../../images/userheader.jpg' alt='light pink background' />
        </div>
    )
}