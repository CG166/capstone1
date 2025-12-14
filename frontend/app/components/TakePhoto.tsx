'use client';
//References 
//https://www.youtube.com/watch?v=F4GWDaVA9J8  #Webcam
//https://www.youtube.com/watch?v=-_pwtmOZDlY  #base64toFile

import { useRouter } from "next/navigation";
//import { useRef, useContext } from "react";
import { GlobalContext } from "@/context/GlobalState";
import React, { useRef, useContext } from "react";
import Webcam from "react-webcam";


export default function TakePhoto() {
    const { file, setFile }  = useContext(GlobalContext);
    const { displayUrl, setDisplayUrl }  = useContext(GlobalContext);
    const { analysis } = useContext(GlobalContext);
    const router = useRouter();


    const webcamRef = useRef<Webcam | null >(null); 

    const takePhoto = () => {
        if(webcamRef.current) {
            const image = webcamRef.current.getScreenshot()

            if(!image) {
                return;
            }
            const imageData = image.split(',')[1];
            const imageBinary = window.atob(imageData);
            const length = imageBinary.length;
            const bytes = new Uint8Array(length)
            for (let i = 0; i < length; i++) {
                bytes[i] = imageBinary.charCodeAt(i);
            }
            const imageFile = new File([bytes], 'image.jpeg', { type: 'image/jpeg' });
            setFile(imageFile);
            const url = URL.createObjectURL(imageFile);
            setDisplayUrl(url);

        }
    };

    const submit = () => {
        if(analysis) {
            if(analysis == "color") {
                router.push("/ColorAna"); 
            } else if (analysis == "face") {
                router.push("/FaceAna"); 
            }
        }
    }


   
    return (
        <main className="flex flex-col items-center justify-center bg-linear-to-tr from-orange-700 via-orange-400 to-orange-600 h-[92vh]">
            <h1 className="text-5xl font-extrabold">Take a Photo</h1>
            <div className="flex flex-row m-10">
                <div className="min-w-[30vw] min-h-[50vh] max-w-[50vw] max-h-[60vh]">
                    {file ? (
                        <img src={displayUrl} alt="Image Source" className="max-h-full max-w-full object-contain" />
                    ) : (
                        <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        />
                    )}
                </div>
                <div className="min-w-[30vw] min-h-[50vh] flex flex-col justify-center items-center mt-10">
                    <button onClick={takePhoto} className="bg-linear-to-b from-blue-900 via-blue-800 to-blue-950 px-8 py-2 rounded-xl font-bold text-2xl">Take Photo</button>
                    <h1 className="text-3xl font-bold pt-10 pb-5">Remember ...</h1>
                    <ul className="list-[square] pl-10 text-xl font-bold">
                        <li>Face must be unobscured and facing the camera straight on</li>
                        <li>Only one face per image</li>
                        <li>Face must be bare</li>
                        <li>All hair must be pulled away from face</li>
                        <li>Image must have adequate lighting</li>
                    </ul>
                    <div className="flex pt-10 justify-end w-full">
                         {file && 
                            <button onClick={() => submit()} className="bg-linear-to-b from-blue-900 via-blue-800 to-blue-950 px-8 py-2 rounded-xl font-bold text-xl">Submit</button>
                         }
                        
                    </div>
                </div>
                
            </div>

        </main>
    )

}