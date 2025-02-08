import { PropsWithChildren } from "react";
import styles from './Layout.module.scss';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <h1>Reaction GIFs</h1>
                {children}
            </main>
        </div>
    );
};

export default Layout;