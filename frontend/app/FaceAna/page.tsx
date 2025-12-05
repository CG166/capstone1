"use client";

import { useContext, useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context/GlobalState";
import Image from "next/image";

type FAnalyzeResult = {
  error?: string;
  faceshape: string;
  focalpoints: string[];
  proportions: number[];
  
};

export default function FaceAna() {
    const { file, faceshape, setFaceshape, focalpoints, setFocalpoints, proportions, setProportions } = useContext(GlobalContext);
    const router = useRouter();
    const [FAresults, setFAresults] = useState<FAnalyzeResult | null>(null);
    const [fPoints, setFPoints] = useState<string>("");


    useEffect(() => {
    if (!file) return;

    const analyze = async () => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("http://localhost:8000/FaceAna", {
        method: "POST",
        body: formData,
        });
        const data: FAnalyzeResult = await res.json();
        setFAresults(data)
        setFaceshape(data.faceshape)
        setFocalpoints(data.focalpoints)
        setProportions(data.proportions)

        if (data.focalpoints.length == 0) {
            setFPoints("you having no particular facial focal point");
        } 
        if (data.focalpoints.length == 1) {
            const focalP = data.focalpoints[0];
            const sentence = "your facial focal point being your " + focalP;
            setFPoints(sentence)
        }
        if (data.focalpoints.length == 2) {
            const f1 = data.focalpoints[0];
            const f2 = data.focalpoints[1];
            const sentence = "you facial focal points being your " + f1 + " and " + f2;
            setFPoints(sentence)
        }


    };

    analyze();
    }, [file]);

    
    if (!file) {
        return(
            <h1>No Image Source Found</h1>
        )
    }

    const submit = () => {
        router.push("/Results"); 
    }

    //URL for image display
   const url = URL.createObjectURL(file);


    return (
        <main className="flex flex-col items-center justify-center bg-linear-to-tr from-orange-700 via-orange-400 to-orange-600 h-[92vh]">
            <h1 className="text-5xl font-extrabold">Facial Analysis</h1>
            <div className="flex flex-row m-10">
                <Image src={url} alt="Image Source" width={450} height={350} className="border-2 border-blue-950 m-10" priority/>
                <div className="flex flex-col items-center justify-start">
                    <h1 className="text-4xl font-semibold">Analysis Results</h1>
                    <div className=" bg-blue-950 mt-10 p-10 text-xl rounded-2xl">
                        {FAresults?.error && 
                        <p>Error: {FAresults.error}</p>}
                        <><h1 className="pb-2">Face Shape: {faceshape}</h1>
                        <h1>Face Focal Points: {focalpoints.join(", ")}</h1>
                        <h1 className="pt-10">Your facial analysis has been completed!</h1>
                        <p>The analysis has determined that you have a {faceshape} face shape, with {fPoints}.</p>
                        </>
                    </div>
                    <button onClick={() => submit()} className="text-3xl font-bold pt-10">Expand results → </button>
                </div>
            </div>
        </main>
    )
}