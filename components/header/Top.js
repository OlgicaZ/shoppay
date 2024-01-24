import styles from './styles.module.scss';
import { MdOutlineSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { RiArrowDropDownFill } from "react-icons/ri";
import Link from 'next/link';

export default function Top() {
    return (
        <div className={styles.top}>
            <div className={styles.top__container}>
                <div></div>
                <ul className={styles.top__list}>
                    <li className={styles.top__list_item}>
                        <img
                            className={styles.top__country_img}
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
                    <li className={styles.top__list_item}>
                        <div className={styles.flex}>
                            <RiAccountPinCircleLine />
                            <span>Account</span>
                            <RiArrowDropDownFill />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}