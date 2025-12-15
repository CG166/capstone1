 'use client';
 import SelectCard from "../components/SelectCard";
 
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalState";

//Requirements Fullfilled//
/*2. When the user clicks on the start button the system shall present the option to begin a new color analysis or begin a new facial feature analysis to the user.
Description: On the start screen a button to begin a new color analysis is presented.
Precondition: The user must be on the start screen.
Postcondition: The user will redirected to the next screen */

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