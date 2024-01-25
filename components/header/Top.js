import styles from './styles.module.scss';
import { MdOutlineSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { RiArrowDropDownFill } from "react-icons/ri";
import Link from 'next/link';
import { useState } from 'react';
import UserMenu from './UserMenu';

export default function Top() {
    const [loggedIn, setLoggedIn] = useState(true);
    const [visible, setVisible] = useState(false);
    return (
        <div className={styles.top}>
            <div className={styles.top__container}>
                <div></div>
                <ul className={styles.top__list}>
                    <li className={styles.top__list_item}>
                        <img
                            src='https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_North_Macedonia.svg'
                            alt='yellow sun on a red background'
                        />
                        <span>Macedonia / USD</span>
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
                            loggedIn ? (
                                <li className={styles.top__list_item}>
                                    <div className={styles.flex}>
                                        <img
                                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBpnouxDuF063trW5gZOyXtyuQaExCQVMYA&usqp=CAU'
                                            alt='user image'
                                        />
                                        <span>OLGICA</span>
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
                            visible && <UserMenu loggedIn={loggedIn} />
                        }
                    </li>
                </ul>
            </div>
        </div>
    );
}