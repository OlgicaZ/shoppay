import Link from 'next/link';
import styles from './styles.module.scss';

export default function UserMenu({ loggedIn }) {
    return (
        <div className={styles.menu}>
            <h4>Welcome to Shoppay!</h4>
            {
                loggedIn ? (
                    <div>
                        <img
                            className={styles.menu__img}
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzBpnouxDuF063trW5gZOyXtyuQaExCQVMYA&usqp=CAU'
                            alt='user image'
                        />
                        <div className={styles.col}> 
                            <span>Welcome back,</span>
                            <h3>OLGICA</h3>
                            <span>Sign Out</span>
                        </div>
                    </div>
                ) : (
                    <div className={styles.flex}>
                        <button className={styles.btn_primary}>Register</button>
                        <button className={styles.btn_outlined}>Login</button>
                    </div>
                )
            }
            <ul>
                <li>
                    <Link href="/profile">Account</Link>
                </li>
                <li>
                    <Link href="/profile/orders">My Orders</Link>
                </li>
                <li>
                    <Link href="/profile/messages">Message Center</Link>
                </li>
                <li>
                    <Link href="/profile/address">Address</Link>
                </li>
                <li>
                    <Link href="/profile/wishlist">Wishlist</Link>
                </li>
            </ul>
        </div>
    );
}