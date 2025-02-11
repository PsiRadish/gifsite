import { PropsWithChildren } from "react";
import styles from './Layout.module.scss';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles.page}>
            <header className={styles.banner}>
                <h1>Reaction GIFs</h1>
            </header>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
};

export default Layout;