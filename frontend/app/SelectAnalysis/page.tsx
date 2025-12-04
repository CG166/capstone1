 'use client';
 import SelectCard from "../components/SelectCard";
 import Link from "next/link";
 
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalState";

export default function SelectAnalysis() {
    const { analysis, setAnalysis }  = useContext(GlobalContext);
    const router = useRouter();

    const selectAnalysis = (analysistype: string) => {
        if (analysistype != "") {
            setAnalysis(analysistype);
            console.log("Selected analysis type:", analysis);
            router.push("/ColorSource"); 
        }
    };
    return(
        <main className="flex flex-col items-center justify-center h-[92vh] bg-linear-to-b from-blue-900 to-blue-950">
            <h1 className="text-8xl font-extrabold">Choose an analysis</h1>
            <div className="flex gap-8 mt-12">
                <SelectCard title="Face Analyisis" optionButton={
                    <button onClick={() => selectAnalysis("face")} className="bg-linear-to-b from-blue-900 via-blue-800 to-blue-950 px-8 py-2 rounded-xl font-bold text-2xl">Get Analysis</button>
                }/>
                <SelectCard title="Color Analyisis" optionButton={
                    <button onClick={() => selectAnalysis("color")} className="bg-linear-to-b from-blue-900 via-blue-800 to-blue-950 px-8 py-2 rounded-xl font-bold text-2xl">Get Analysis</button>
                }/>
            </div>
        </main>
    )
}