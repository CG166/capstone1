'use client';

//References
//https://www.youtube.com/watch?v=mI2xMUMvr0E&t=444s  #html2canvas

import { useContext, useRef } from "react";
import { GlobalContext } from "@/context/GlobalState";
import ColorPaletteBox from "./ColorPaletteBox";

import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

//Requirements Fullfilled//
/*16. When the user clicks the save button, the system shall save the result in the specified format, at the specified location.
Description: The system shall save the result in the specified format, at the specified location.
Precondition: The user must have selected a format and selected a location in which to store the results.
Postcondition: The results will have been saved in the user’s specified location.

19. When the user clicks the return to homepage button, the system shall redirect them to the start screen..
Description: The system shall redirect the user to the start screen.
Precondition: The application must be running, and the user cannot already be on the start screen..
Postcondition: The user will have been redirected to the start screen.
 */


export default function ColorResults() {
    const {CAresults} = useContext(GlobalContext);
    const resultRef = useRef<HTMLDivElement>(null);
    let primaryPalette: string[] = [];
    let secondaryPalette: string[] = [];
    let fraternalIncompatiblePalette: string[] = [];
    let oppositeIncompatiblePalette1: string[] = [];
    let oppositeIncompatiblePalette2: string[] = [];
    let oppositeIncompatiblePalette3: string[] = [];
    let oppositeIncompatiblePalette4: string[] = [];

    
    const saveResults = async () => {
        if (!resultRef.current) return;

        const colorAnalysisResults = resultRef.current;

        const canvas = await html2canvas(colorAnalysisResults, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("portrait", "px", "a4");
        pdf.addImage(imgData,"PNG",0,0, pdf.internal.pageSize.getWidth(),(canvas.height * pdf.internal.pageSize.getWidth()) / canvas.width);
        pdf.save("ColorAnalysisResults.pdf");
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


    if(!CAresults?.color_analysis_results) {
        return;
    }
    const undertone = CAresults.color_analysis_results[0];
    const tones = CAresults.color_analysis_results[1];
    const depth = CAresults.color_analysis_results[2];

    if(undertone == "cool" && depth == "soft") {
        primaryPalette = coolSoft;
        secondaryPalette = coolClear;
        fraternalIncompatiblePalette =coolBold;
        oppositeIncompatiblePalette1 = warmSoft;
        oppositeIncompatiblePalette2 = warmClear;
        oppositeIncompatiblePalette3 = warmVibrant;
        oppositeIncompatiblePalette4 =  warmBold;
    }
    if(undertone == "cool" && depth == "clear") {
        primaryPalette = coolClear;
        secondaryPalette = coolVibrant;
         fraternalIncompatiblePalette = coolBold;
        oppositeIncompatiblePalette1 = warmSoft;
        oppositeIncompatiblePalette2 = warmClear;
        oppositeIncompatiblePalette3 = warmVibrant;
        oppositeIncompatiblePalette4 =  warmBold;
    }
    if(undertone == "cool" && depth == "vibrant") {
        primaryPalette = coolVibrant;
        secondaryPalette = coolClear;
         fraternalIncompatiblePalette = coolSoft;
        oppositeIncompatiblePalette1 = warmSoft;
        oppositeIncompatiblePalette2 = warmClear;
        oppositeIncompatiblePalette3 = warmVibrant;
        oppositeIncompatiblePalette4 =  warmBold; 
    }
    if(undertone == "cool" && depth == "bold") {
        primaryPalette = coolBold;
        secondaryPalette = coolVibrant;
         fraternalIncompatiblePalette = coolSoft;
        oppositeIncompatiblePalette1 = warmSoft;
        oppositeIncompatiblePalette2 = warmClear;
        oppositeIncompatiblePalette3 = warmVibrant;
        oppositeIncompatiblePalette4 =  warmBold;
    }

    if(undertone == "warm" && depth == "soft") {
        primaryPalette = warmSoft;
        secondaryPalette = warmClear;
         fraternalIncompatiblePalette = warmBold;
        oppositeIncompatiblePalette1 = coolSoft;
        oppositeIncompatiblePalette2 = coolClear;
        oppositeIncompatiblePalette3 = coolVibrant;
        oppositeIncompatiblePalette4 =  coolBold;
    }
    if(undertone == "warm" && depth == "clear") {
        primaryPalette = warmClear;
        secondaryPalette = warmVibrant;
         fraternalIncompatiblePalette = warmBold;
        oppositeIncompatiblePalette1 = coolSoft;
        oppositeIncompatiblePalette2 = coolClear;
        oppositeIncompatiblePalette3 = coolVibrant;
        oppositeIncompatiblePalette4 =  coolBold;
        
    }
    if(undertone == "warm" && depth == "vibrant") {
        primaryPalette = warmVibrant;
        secondaryPalette = warmClear;
         fraternalIncompatiblePalette = warmSoft;
        oppositeIncompatiblePalette1 = coolSoft;
        oppositeIncompatiblePalette2 = coolClear;
        oppositeIncompatiblePalette3 = coolVibrant;
        oppositeIncompatiblePalette4 =  coolBold;
    }
    if(undertone == "warm" && depth == "bold") {
        primaryPalette = warmBold;
        secondaryPalette = warmVibrant;
         fraternalIncompatiblePalette = warmSoft;
        oppositeIncompatiblePalette1 = coolSoft;
        oppositeIncompatiblePalette2 = coolClear;
        oppositeIncompatiblePalette3 = coolVibrant;
        oppositeIncompatiblePalette4 =  coolBold;
    }

    if(undertone == "cool-neutral" && depth == "soft") {
        primaryPalette = coolNeutralSoft;
        secondaryPalette = coolNeutralClear;
        fraternalIncompatiblePalette = coolNeutralBold;
        oppositeIncompatiblePalette1 = warmSoft;
        oppositeIncompatiblePalette2 = warmClear;
        oppositeIncompatiblePalette3 = warmVibrant;
        oppositeIncompatiblePalette4 = warmBold;
    }
    if(undertone == "cool-neutral" && depth == "clear") {
        primaryPalette = coolNeutralClear;
        secondaryPalette =  coolNeutralVibrant;
        fraternalIncompatiblePalette = coolBold;
        oppositeIncompatiblePalette1 = warmSoft;
        oppositeIncompatiblePalette2 = warmClear;
        oppositeIncompatiblePalette3 = warmVibrant;
        oppositeIncompatiblePalette4 = warmBold;
    }
    if(undertone == "cool-neutral" && depth == "vibrant") {
        primaryPalette = coolNeutralVibrant;
        secondaryPalette = coolNeutralClear;
        fraternalIncompatiblePalette = coolNeutralSoft;
        oppositeIncompatiblePalette1 = warmSoft;
        oppositeIncompatiblePalette2 = warmClear;
        oppositeIncompatiblePalette3 = warmVibrant;
        oppositeIncompatiblePalette4 = warmBold;
    }
    if(undertone == "cool-neutral" && depth == "bold") {
        primaryPalette = coolNeutralBold;
        secondaryPalette = coolNeutralVibrant;
        fraternalIncompatiblePalette = coolNeutralSoft;
        oppositeIncompatiblePalette1 = warmSoft;
        oppositeIncompatiblePalette2 = warmClear;
        oppositeIncompatiblePalette3 = warmVibrant;
        oppositeIncompatiblePalette4 = warmBold;
    }

    if(undertone == "neutral" && depth == "soft") {
        primaryPalette = neutralSoft;
        secondaryPalette = neutralClear;
        fraternalIncompatiblePalette = neutralBold;
        oppositeIncompatiblePalette1 = warmBold;
        oppositeIncompatiblePalette2 = coolBold;
        oppositeIncompatiblePalette3 = coolNeutralBold;
        oppositeIncompatiblePalette4 = []
    }
    if(undertone == "neutral" && depth == "clear") {
        primaryPalette = neutralClear;
        secondaryPalette = neutralVibrant;
        fraternalIncompatiblePalette = neutralBold;
        oppositeIncompatiblePalette1 = warmBold;
        oppositeIncompatiblePalette2 = coolBold;
        oppositeIncompatiblePalette3 = coolNeutralBold;
        oppositeIncompatiblePalette4 = []
    }
    if(undertone == "neutral" && depth == "vibrant") {
        primaryPalette = neutralVibrant;
        secondaryPalette = neutralClear;
        fraternalIncompatiblePalette = neutralSoft
        oppositeIncompatiblePalette1 = warmSoft;
        oppositeIncompatiblePalette2 = coolSoft;
        oppositeIncompatiblePalette3 = coolNeutralSoft;
        oppositeIncompatiblePalette4 = []
    }
    if(undertone == "neutral" && depth == "bold") {
        primaryPalette = neutralBold;
        secondaryPalette = neutralVibrant;
        fraternalIncompatiblePalette = neutralSoft;
       oppositeIncompatiblePalette1 = warmSoft;
        oppositeIncompatiblePalette2 = coolSoft;
        oppositeIncompatiblePalette3 = coolNeutralSoft;
        oppositeIncompatiblePalette4 = []
    }


    if(!CAresults) {
        return(
            <main className="min-w-screen min-h-screen w-auto h-auto bg-linear-to-b from-blue-900 to-blue-950">
                <h1>Unable to locate results</h1>
            </main>
        )
    }

    if (!CAresults?.color_analysis_results) {
    return (
            <main className="text-white p-6">
                <h2>No color results found.</h2>
            </main>
        );
    }

    return(
        <main className="min-w-screen min-h-screen w-auto h-auto bg-linear-to-tr from-blue-900 via-blue-800 to-blue-950 flex flex-col items-center">
            <div className="flex pt-10 justify-end w-full mr-15 mb-5">
                <button onClick={saveResults} className="bg-linear-to-tr from-orange-700 via-orange-400 to-orange-600 px-8 py-2 rounded-xl font-bold text-2xl">Save Results</button>
            </div>
            <div ref={resultRef} className="p-6 rounded-lg flex flex-col items-center" style={{ backgroundColor: "#1e3a8a"}}>
                <h1 className="text-3xl font-semibold p-5 pb-2">Color Analysis Results</h1>
                <hr className="w-[60vw] border-t-2 p-2 mx-auto mt-2"></hr>
                <div className="max-h-[30vh] max-w-[70vw] w-auto h-auto min-h-[15vh] min-w-[60vw]">
                    <p className="text-xl text-center font-mono pb-4">The results of the analysis show that you have a {undertone} toned color profile with {tones} tones,
                     as well as complexion that lends itself best to {depth} colors. These are some example palettes of colors
                      that will best flatter you, as well a palettes containing colors that can be unflattering.</p>
                </div>
                <div className="max-h-[30vh] max-w-[70vw] w-auto h-auto">
                    <h1 className="text-2xl font-semibold text-center">Primary Color Group</h1>
                    <hr className="w-[40vw] border-t-2 p-2 mx-auto mt-2" />
                    <p className="font-mono">This is an example palette of the sort of color that match you best. They share your {undertone} tone, and also
                        fall into the {depth} section of the saturation spectrum, which is the most suited for your complexion.
                    </p>
                </div>
                <ColorPaletteBox Hexcodes={primaryPalette}/>
                <div className="max-h-[30vh] max-w-[70vw] w-auto h-auto">
                    <h1 className="text-2xl font-semibold text-center">Next Best Option</h1>
                    <hr className="w-[40vw] border-t-2 p-2 mx-auto mt-2" />
                    <p className="font-mono">This is an example palette of the next best sort of colors that suit you.Like your primary color, these colors also share your {undertone} tone, 
                        however they do not fall into the {depth} section of the saturation spectrum, which is your ideal, but are still close enough that they will look well on you.
                    </p>
                </div>
                <ColorPaletteBox Hexcodes={secondaryPalette}/>
                <div className="max-h-[30vh] max-w-[70vw] w-auto h-auto">
                    <h1 className="text-2xl font-semibold text-center">Some {undertone} colors to Avoid</h1>
                    <hr className="w-[40vw] border-t-2 p-2 mx-auto mt-2"/>
                    <p className="font-mono">This is an example palette of the color that, although they share the same {undertone} as you, have the potential to be unflattering on you due to the fact that
                        their level of staturation is considerably removed from the {depth} colors that you are best suited for.
                    </p>
                </div>
                <ColorPaletteBox Hexcodes={fraternalIncompatiblePalette}/>
                <div className="max-h-[30vh] max-w-[70vw] w-auto h-auto">
                    <h1 className="text-2xl font-semibold text-center">Colors to Steer Clear Of</h1>
                    <hr className="w-[40vw] border-t-2 p-2 mx-auto mt-2" />
                    <p className="font-mono">These are example palettes of colors are best to avoid as they tend to clash with the {undertone} tone of your skin.</p>
                </div>
                <ColorPaletteBox Hexcodes={oppositeIncompatiblePalette1}/>
                <ColorPaletteBox Hexcodes={oppositeIncompatiblePalette2}/>
                <ColorPaletteBox Hexcodes={oppositeIncompatiblePalette3}/>
                <ColorPaletteBox Hexcodes={oppositeIncompatiblePalette4}/>
            </div>
        </main>
    )
}