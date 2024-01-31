import styles from './styles.module.scss';

export default function Payment() {
    return (
        <div className={styles.footer__payment}>
            <h3>WE ACCEPT</h3>
            <div className={styles.footer__flexwrap}>
                <img src='./../../images/payment/visa.webp' alt='visa logo' />
                <img src='./../../images/payment/mastercard.webp' alt='mastercard logo' />
                <img src='./../../images/payment/paypal.webp' alt='paypal logo' />
            </div>
        </div>
    )
}