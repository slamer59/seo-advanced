// @ts-nocheck
// "use client"

// https://blog.designly.biz/creating-a-modern-hero-image-using-nextjs-13-images-and-tailwind-css

import Image from "next/legacy/image";
// import { useState } from "react";
// import useDimensions from "react-cool-dimensions";

// function arrayCeil(arr: any[], number: number) {
//     const sorted = arr.sort((a: number, b: number) => a - b);
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] > number) {
//             return sorted[i];
//         }
//     }
//     // If no index found return the last element
//     return sorted[sorted.length - 1];
// }


export default function Hero({ title, heroImage }) { // imageUrl }) {
    // console.log("imageUrl", imageUrl)
    // const [heroImage, setHeroImage] = useState(imageUrl);
    // console.log("heroImage", heroImage)
    // const imageSizes = [600, 1280, 1920];
    // const { observe } = useDimensions({
    //     onResize: ({ observe, unobserve, width }) => {
    //         setHeroImage(`${imageUrl}hero-${arrayCeil(imageSizes, width)}.jpg`);
    //         unobserve(); // To stop observing the current target element
    //         observe(); // To re-start observing the current target element
    //     },
    // });

    return (
        <div
            // ref={observe}
            className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-black"
        >
            <Image
                src={`${heroImage}`}
                alt="Hero Image"
                className="object-cover opacity-60"
                layout="fill"
            />
            <div className="flex flex-col items-center justify-center px-3">
                <h1 className="text-3xl font-bold text-center text-white md:text-5xl drop-shadow-lg">
                    {title}
                </h1>
                <p className="mt-5 text-lg text-center text-white opacity-90">Making tomorrow's widgets today...</p>
                {/* <Button href="/">Get Started</Button> */}
            </div>
        </div>
    );
}
