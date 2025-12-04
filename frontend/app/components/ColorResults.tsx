'use client';

//References
//https://www.youtube.com/watch?v=J2s45eUXwc0  #html2pdf

import { useContext, useRef } from "react";
import { GlobalContext } from "@/context/GlobalState";
import ColorPaletteBox from "./ColorPaletteBox";

import html2pdf from "html2pdf.js";

export default function ColorResults() {
    const {CAresults} = useContext(GlobalContext);
    const resultRef = useRef(null);

    const saveResults = () => {
        const resultFormat = {
            margin: 1,
            filename: "ColorAnalysisResults.pdf",
            html2canvas: { scale: 2 },
            jsPDF: {
                unit: "in" as const,
                format: "letter" as const,
                orientation: "portrait" as const
            }
        }

        if(!resultRef.current){
            return;
        }

        html2pdf().from(resultRef.current).set(resultFormat).save()
    }

    //Pallete Suite
    const coolBold = ["#0A2F51","#19376D","#2F195F","#3A0CA3","#5A1E76","#7A1C4E","#8A1C3F","#184A45","#0F4C3A","#1B5E6A","#264653","#1C2C3E"];
    const coolSoft = ["#3F4E6B", "#5A628C", "#6E5A89", "#7A6C9B", "#8B6F96", "#9A6A81", "#A15779", "#5E726B", "#4C7065", "#527F89", "#617B86", "#4A5566"];
    const coolClear = ["#335C90", "#4666B1", "#6740C3", "#7A52E0", "#9848C6", "#B43E79", "#C43B63", "#2D7A64", "#1F8A72", "#2997AC", "#3A8FA3", "#2E3F68"];
    const coolVibrant = ["#0B3FAE", "#234FFF", "#5A1BE4", "#8120FF", "#B418E5", "#D4137A", "#E11C57", "#007F5F", "#008F7C", "#00A8C6", "#007FAF", "#0A1F5A"];

    const warmSoft = ["#E6C4A8", "#ECCDAD", "#EEC3A2", "#F1BDB0", "#F0B2A0", "#E9A290", "#E39C88", "#EFC29D", "#E6B288", "#F0C3A5", "#EAB39A", "#E3A78B"];
    const warmClear = ["#F0B152", "#FDB66B", "#FCA06F", "#FF8C7B", "#FF7569", "#F65B4B", "#E24D3F", "#F9B33B", "#EFA237", "#FFBB7D", "#F5845B", "#D96B48"];
    const warmVibrant = ["#FF9A00", "#FFB300", "#FF6A00", "#FF3E00", "#F21C0D", "#E40029", "#C8002B", "#FF8C00", "#FF7200", "#FF5A36", "#F53A2B", "#B8181A"];
    const warmBold = ["#8E4B16", "#A2601E", "#9C3C1C", "#8B291A", "#74201A", "#5A1715", "#4A1212", "#7A481F", "#6A3A18", "#8F5330", "#7C3424", "#5B2519"];

    const neutralSoft = ["#A8B7CE", "#D1AAB1", "#C8B195", "#E1C1A0", "#C9B0D1", "#E0BFD4", "#A6C9BF", "#94BEB1", "#B0CBE1", "#D9C4A7", "#D3A0A6", "#9BB1CB"];
    const neutralClear = ["#7892B0", "#C07C87", "#B48C5E", "#D19A6E", "#A784B0", "#C893AE", "#6FA194", "#579687", "#7FAACE", "#B89971", "#B96D7A", "#5E88B0"];
    const neutralVibrant = ["#5E7CA0", "#A95B6A", "#946438", "#B87752", "#875FA0", "#B16C99", "#539382", "#417B6F", "#5F91C0", "#9B7D56", "#9A5360", "#4B6C95"];
    const neutralBold = ["#344A6A", "#703C48", "#604621", "#7C5033", "#5D4070", "#813C65", "#34625A", "#2A544D", "#3C658F", "#725D3E", "#6D3940", "#2F4F76"];

    const coolNeutralSoft = ["#AEB6C4", "#A9B1BB", "#B2A8BC", "#C0A9C0", "#B9A1B3", "#A993A7", "#9DA3A5", "#9FB1B2", "#8BA1A4", "#90A7B5", "#A0A8C0", "#9C93A8"];
    const coolNeutralClear = ["#C7D3E8", "#B9C6E0", "#C8BDE4", "#D6BEE8", "#DABAD9", "#CFA8C7", "#AFC8D1", "#9FC4C7", "#A6D0DE", "#B6C9E4", "#C8C0E2", "#B9AECF"];
    const coolNeutralVibrant = ["#708DB4", "#6A7FA7", "#7C68B3", "#905EBE", "#8E4FA3", "#7B4E8F", "#5F7882", "#4D8892", "#4E9BA3", "#5C82B9", "#716BC5", "#68579E"];
    const coolNeutralBold = ["#2F3C52", "#263449", "#3A2E53", "#4A2D61", "#4B244A", "#391D3A", "#243A3E", "#1F454A", "#184D53", "#263C63", "#332F6A", "#2B254D"];






    if(!CAresults) {
        return(
            <main className="min-w-screen min-h-screen w-auto h-auto bg-linear-to-b from-blue-900 to-blue-950">
                <h1>Unable to locate results</h1>
            </main>
        )
    }
    return(
        <main className="min-w-screen min-h-screen w-auto h-auto bg-linear-to-b from-blue-900 to-blue-950 flex flex-col items-center">
            <div className="flex pt-10 justify-end w-full mr-15">
                <button onClick={saveResults} className="bg-linear-to-tr from-orange-700 via-orange-400 to-orange-600 px-8 py-2 rounded-xl font-bold text-2xl">Save Results</button>
            </div>
            <div ref={resultRef} className="">
                <h1 className="text-3xl font-semibold p-5 pb-2">Color Analysis Results</h1>
                <hr className="w-[80vw] border-t-2 p-2"></hr>
                <ColorPaletteBox Hexcodes={coolSoft}/>
                <ColorPaletteBox Hexcodes={coolClear}/>
                <ColorPaletteBox Hexcodes={coolVibrant}/>
                <ColorPaletteBox Hexcodes={coolBold}/>
                <ColorPaletteBox Hexcodes={warmSoft}/>
                <ColorPaletteBox Hexcodes={warmClear}/>
                <ColorPaletteBox Hexcodes={warmVibrant}/>
                <ColorPaletteBox Hexcodes={warmBold}/>
                <ColorPaletteBox Hexcodes={neutralSoft}/>
                <ColorPaletteBox Hexcodes={neutralClear}/>
                <ColorPaletteBox Hexcodes={neutralVibrant}/>
                <ColorPaletteBox Hexcodes={neutralBold}/>
                <ColorPaletteBox Hexcodes={coolNeutralSoft}/>
                <ColorPaletteBox Hexcodes={coolNeutralClear}/>
                <ColorPaletteBox Hexcodes={coolNeutralVibrant}/>
                <ColorPaletteBox Hexcodes={coolNeutralBold}/>
            </div>
        </main>
    )
}