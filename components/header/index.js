import Main from './Main';
import Top from './Top';
import Ad from './Ad';
import styles from './styles.module.scss';

export default function Header() {
    return (
        <header className={styles.header}>
            <Ad />
            <Top />
            <Main />
        </header>
    );
}