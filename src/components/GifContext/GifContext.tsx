'use client';

import React from "react";
import { SourceFolders } from "./GifContext.util";

export const GifContext = React.createContext<SourceFolders | undefined>(undefined);

export function useGifContext()
{
    const context = React.useContext(GifContext);
    if (!context)
    {
        throw new Error('useGifContext must be used within a GifContextProvider');
    }
    
    return context;
}

export const GifContextProvider: React.FC<{ contextData: SourceFolders, children: React.ReactNode }> = ({ contextData, children }) =>
{
    return (
        <GifContext.Provider value={contextData}>
            {children}
        </GifContext.Provider>
    );
}