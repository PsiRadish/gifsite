'use client';

import React, { useMemo } from 'react';
import { useGifContext } from '@/components/GifContext/GifContext';
import { categoryOrder, categoryDisplay } from '@/components/GifContext/GifContext.util';
import Layout from '@/components/Layout';
import { GifCard } from '@/components/GifCard/GifCard';
import styles from './sourcePage.module.scss';

const Source: React.FC<{params: Promise<{source: string}>}> = ({ params }) => {
    const { source } = React.use(params);
    const sourceGifs = useGifContext()[source];
    
    const gifJsx = useMemo(() => {
        return categoryOrder.map(category => {
            const gifs = sourceGifs[category];
            return (
                <div key={category}>
                    <h2>{categoryDisplay[category]}</h2>
                    <div className={styles.cards}>
                        {gifs.map((gif, i) => (
                            <GifCard key={i} gifInfo={gif} />
                        ))}
                    </div>
                </div>
            );
        });
    }, [sourceGifs]);
    
    return (
        <Layout>
            <article>
                <h1>{source}</h1>
                {gifJsx}
            </article>
        </Layout>
    );
};

export default Source;