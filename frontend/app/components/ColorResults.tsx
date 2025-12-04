'use client';

import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalState";
import ColorPaletteBox from "./ColorPaletteBox";

export default function ColorResults() {
    const {CAresults} = useContext(GlobalContext);
    const testPalette = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#8E44AD", "#1ABC9C","#E74C3C", "#2ECC71", "#3498DB",  "#34495E", '#FF33A8', '#D62728']





    if(!CAresults) {
        return(
            <main className="min-w-screen min-h-screen w-auto h-auto bg-linear-to-b from-blue-900 to-blue-950">
                <h1>Unable to locate results</h1>
            </main>
        )
    }
    return(
        <main className="min-w-screen min-h-screen w-auto h-auto bg-linear-to-b from-blue-900 to-blue-950 flex flex-col items-center">
            <h1 className="text-3xl font-semibold p-5 pb-2">Color Analysis Results</h1>
            <hr className="w-[80vw] border-t-2 p-2"></hr>
            <ColorPaletteBox Hexcodes={testPalette}/>
        </main>
    )
}