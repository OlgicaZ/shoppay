import styles from './styles.module.scss';
import { MdOutlineSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { RiArrowDropDownFill } from "react-icons/ri";
import Link from 'next/link';
import { useState } from 'react';
import UserMenu from './UserMenu';
import { useSession } from "next-auth/react";

export default function Top({ country }) {
    //const [loggedIn, setLoggedIn] = useState(true);
    const { data: session } = useSession();
    const [visible, setVisible] = useState(false);
    return (
        <div className={styles.top}>
            <div className={styles.top__container}>
                <div></div>
                <ul className={styles.top__list}>
                    <li className={styles.top__list_item}>
                        <img
                            src={country.flag}
                            alt='yellow sun on a red background'
                        />
                        <span>{country.name} / USD</span>
                    </li>
                    <li className={styles.top__list_item}>
                        <MdOutlineSecurity />
                        <span>Buyer Protection</span>
                    </li>
                    <li className={styles.top__list_item}>
                        <span>Customer Service</span>
                    </li>
                    <li className={styles.top__list_item}>
                        <span>Help</span>
                    </li>
                    <li className={styles.top__list_item}>
                        <BsSuitHeart />
                        <Link href='/profile/wishlist'>
                            <span>Wishlist</span>
                        </Link>
                    </li>
                    <li 
                        className={styles.top__list_item}
                        onMouseOver={() => setVisible(true)}
                        onMouseLeave={() => setVisible(false)}
                    >
                        {
                            session ? (
                                <li className={styles.top__list_item}>
                                    <div className={styles.flex}>
                                        <img
                                            src={session.user.image}
                                            alt='user image'
                                        />
                                        <span>{session.user.name}</span>
                                        <RiArrowDropDownFill />
                                    </div>
                                </li>
                            ) : (
                                <li className={styles.top__list_item}>
                                    <div className={styles.flex}>
                                        <RiAccountPinCircleLine />
                                        <span>Account</span>
                                        <RiArrowDropDownFill />
                                    </div>
                                </li>
                            )
                        }
                        {
                            visible && <UserMenu session={session} />
                        }
                    </li>
                </ul>
            </div>
        </div>
    );
}