import clsx from "clsx";
import { GifInfo } from "../GifContext/GifContext.util";
import styles from './GifCard.module.scss';

export type GifCardProps = {
    gifInfo: GifInfo;
}

export const GifCard: React.FC<GifCardProps> = ({ gifInfo }) => {
    return (
        <span className={styles['gif-card']}>
            <img src={gifInfo.url} alt={gifInfo.url} />
            <span className={styles.info}>
                {gifInfo.personishTags.map((tag, i) => (
                    <span key={i} className={clsx(styles.tag, styles.person)}>{tag}</span>
                ))}
                {gifInfo.otherTags.map((tag, i) => (
                    <span key={i} className={styles.tag}>{tag}</span>
                ))}
            </span>
        </span>
    );
};