import { useMemo } from "react";
import type { Metadata } from "next";
import { getAllTheGifs } from "@/util/getAlltheGifs";
import { GifContextProvider } from "@/components/GifContext/GifContext";
import "@/styles/globals.scss";


export const metadata: Metadata = {
    title: "Reaction GIFs",
    description: "For Radish",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>)
{
    const gifContext = useMemo(() => getAllTheGifs(), []);

    console.log(gifContext);
    
    return (
        <html lang="en">
            <body>
                <GifContextProvider contextData={gifContext}>
                    {children}
                </GifContextProvider>
            </body>
        </html>
    );
}
