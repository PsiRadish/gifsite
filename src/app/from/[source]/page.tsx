'use client';

import React, { useMemo } from 'react';
import { useGifContext } from '@/components/GifContext/GifContext';
import { categoryOrder, categoryDisplay } from '@/components/GifContext/GifContext.util';
import Layout from '@/components/Layout';

const Source: React.FC<{params: Promise<{source: string}>}> = ({ params }) => {
    const { source } = React.use(params);
    const sourceGifs = useGifContext()[source];
    
    const gifJsx = useMemo(() => {
        return categoryOrder.map(category => {
            const gifs = sourceGifs[category];
            return (
                <div key={category}>
                    <h3>{categoryDisplay[category]}</h3>
                    <div>
                        {gifs.map((gif, i) => (
                            <img key={i} src={gif.url} alt={gif.url} />
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