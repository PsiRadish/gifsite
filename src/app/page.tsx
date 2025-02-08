'use client';

import React, { useMemo } from "react";
import Link from "next/link";

import Layout from "@/components/Layout";
import { useGifContext } from "@/components/GifContext/GifContext";

export default function Home() {
    const gifContext = useGifContext();
    
    const sourceFolders = useMemo(() => Object.keys(gifContext), [gifContext]);
    
    return (
        <Layout>
            {sourceFolders.map((source, i) => (
                <Link key={i} href={`/from/${source}`}>
                    {source}
                </Link>
            ))}
        </Layout>
    );
}
