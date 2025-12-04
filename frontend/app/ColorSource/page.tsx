'use client';

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalState";


export default function ColorSource() {
    const { setSource }  = useContext(GlobalContext);
    const router = useRouter();

    const selectSource = (sourcetype: string) => {
        if (sourcetype != "") {
            setSource(sourcetype);
            router.push("/SelectImage"); 
        }
    };

    return (
        <main className=" flex flex-col items-center justify-center h-[92vh] bg-linear-to-tr from-orange-700 via-orange-400 to-orange-600">
            <h1 className="text-blue-950 text-8xl font-extrabold">Choose an image source</h1>
            <div className="m-10">
                <button onClick={() => selectSource("image")} className="bg-linear-to-b from-blue-900 via-blue-800 to-blue-950 px-8 py-2 rounded-xl font-bold text-2xl">Select an Image</button>
            </div>
            <hr className="border-2 border-blue-950 w-[70vw]"></hr>
            <div className="m-10">
                <button onClick={() => selectSource("camera")} className="bg-linear-to-b from-blue-900 via-blue-800 to-blue-950 px-8 py-2 rounded-xl font-bold text-2xl">Take a Photo</button>
            </div>
            
            
        </main>
    )
}