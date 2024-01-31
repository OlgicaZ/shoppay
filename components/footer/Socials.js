import styles from './styles.module.scss';
import { BsFacebook, BsInstagram, BsPinterest, BsSnapchat, BsTwitter, BsYoutube } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";

export default function Socials() {
    return (
        <div className={styles.footer__socials}>
            <section>
                <h3>STAY CONNECTED</h3>
                <ul>
                    <li>
                        <a href='' target='_blank' rel='noopener noreferrer'>
                            <BsFacebook />
                        </a>
                    </li>
                    <li>
                        <a href='' target='_blank' rel='noopener noreferrer'>
                            <BsInstagram />
                        </a>
                    </li>
                    <li>
                        <a href='' target='_blank' rel='noopener noreferrer'>
                            <BsTwitter />
                        </a>
                    </li>
                    <li>
                        <a href='' target='_blank' rel='noopener noreferrer'>
                            <BsYoutube />
                        </a>
                    </li>
                    <li>
                        <a href='' target='_blank' rel='noopener noreferrer'>
                            <BsPinterest />
                        </a>
                    </li>
                    <li>
                        <a href='' target='_blank' rel='noopener noreferrer'>
                            <BsSnapchat />
                        </a>
                    </li>
                    <li>
                        <a href='' target='_blank' rel='noopener noreferrer'>
                            <FaTiktok />
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    )
}