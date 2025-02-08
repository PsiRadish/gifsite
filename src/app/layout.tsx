import { useMemo } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getAllTheGifs } from "@/util/getAlltheGifs";
import { GifContextProvider } from "@/components/GifContext/GifContext";
import "@/styles/globals.scss";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

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
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <GifContextProvider contextData={gifContext}>
                    {children}
                </GifContextProvider>
            </body>
        </html>
    );
}
