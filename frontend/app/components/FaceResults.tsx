'use client';

//References
//https://www.youtube.com/watch?v=mI2xMUMvr0E&t=444s  #html2canvas

import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "@/context/GlobalState";

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


export default function FaceResults() {
    const {proportions, faceshape} = useContext(GlobalContext);
    const resultRef = useRef<HTMLDivElement>(null);

    /*let fPoints = "";
    if (focalpoints) {
        if (focalpoints.length === 0) {
            fPoints = "you having no particular facial focal point";
        } else if (focalpoints.length === 1) {
            fPoints = `your facial focal point being your ${focalpoints[0]}`;
        } else if (focalpoints.length === 2) {
            fPoints = `your facial focal points being your ${focalpoints[0]} and ${focalpoints[1]}`;
        }
    }

    let hair = "";
    if (faceshape){
        if(faceshape == "oval"){
            hair = "For someone with an oval face shape their are not many restrictions on how you can wear your hair, as most hairstyles and haircuts will be flattering on you due to the well-balanced shape of your face.";
        } else if (faceshape == "oblong") {
            hair = "For someone with an oblong face shape, hairstyles and haircuts offer a way to obtain the illusion of a wider face. Shorter haircuts such a bobs and long pixie cuts will drawn the eye upwards and shorten your precieved face length, while hairstyles such as styled/curled layers of volumptious blowouts will serve to add width to your face.";
        } else if (faceshape == "square"){
            hair = "For someone with a square face shape, hairstlyes and haircuts offer a way to add the illusion of length to your face to help balance out it's width. Avoid haircuts that empathize the width of your face, such as blunt bangs or bobs that end at the chin. Instead opt for hairstyles with long layers that draw the eye downwards and serve to elongate your face.";
        }
    }

    let makeup = "";
    if ((proportions[0] + proportions[1]) > (proportions[2] + proportions[1])) {
        makeup = "Considering your facial focal points, the density of your facial features seems to be top-heavy, meaning that the proportion of your facial features tends to draw attention to the upper half of your face. Makeup can either help you balance out the weight of your facial features by empathizing the lower half of your face with attention-catching shades of lipstick, highlighter or light-reflecting gloss or it can help you maintain the attention on the upper half of your face by with strong eye and eyebrow makeup."
    } else if((proportions[0] + proportions[1]) < (proportions[2] + proportions[1])) {
        makeup = "Considering your facial focal points, the density of your facial features seems to be bottom-heavy, meaning that the proportion of your facial features tends to draw attention to the lower half of your face. This can be played into by using stong lip combos with attention-catching shades of lipstick, highlighter or light-reflecting gloss, or you can attempt to balance out your features by concentrating on the upper half of your face with strong contouring, eye, and eyebrow looks."
    } else if ((proportions[0] + proportions[1]) == (proportions[2] + proportions[1])) {
        makeup = "Considering your facial focal points, the density of your facial features seems to be well balanced with both the upper and lower halves of your face being harmonious. Makeup can be used the either emphathize the upper or lower half of your faced based on what look you are going for, or can be used to maintain the well-balanced appearance of your features.";
    }*/

    let contour = "";
    let highlight = "";
    let lip = "";
    let blush = "";
    if (faceshape) {
        if(faceshape == "round"){
            contour = "For round faces, the recommended contour placement is at the sides of the forehead above the temples, countour beneath the cheekbones, and countour along the jawline."
            highlight = "For round faces, the recommended highlight placement is the the center of the forehead, from the top of the cheekbones towards the temples, and at the center of the chin."
            lip = "For round faces, the recommended lip makeup includes dark berry shades, shades with good contrast, glossy finishes, and defined lip lines."
            blush = "For round faces, the recommended blush placement is slightly above the apples of the cheeks and back towards the temples."
        } else if(faceshape == "rectangle") {
            contour = "For rectangle faces, the recommended contour placement is at the sides of the forehead above the temples and along the hairline, contour beneath the cheekbones, and countour along the jawline."
            highlight = "For rectangle faces, the recommended highlight placement is at the top of the cheekbones, above the brow, and some light application on the chin."
            lip = "For rectangle faces, the recommended lip makeup includes soft corals, warm reds, and glossy finishes."
            blush = "For rectangle faces, the recommended blush placement is concentrated on the outer edges of the cheeks, and back towards the temples."
        } else if(faceshape == "square") {
            contour = "For square faces, the recommended contour placement is at the sides of the forehead above the temples, countour beneath the cheekbones, and countour along the jawline."
            highlight = "For square faces, the recommended highlight placement is at the top of the cheekbones, above the brow, and some light application on the chin."
            lip = "For square faces, the recommended lip makeup includes soft corals, warm reds, and glossy finishes."
            blush = "For square faces, the recommended blush placement is concentrated on the outer edges of the cheeks, and back towards the temples."
        } else if(faceshape == "triangle") {
            contour = "For triangle faces, the recommended contour placement is at the sides of the forehead above the temples, countour beneath the cheekbones, and lightly along the jawline."
            highlight = "For triangle faces, the recommended highlight placement is at the top of the cheekbones, above the brow, and at the center of the chin."
            lip = "For triangle faces, the recommended lip makeup includes either balanced pink/rose tones and nudes or deeper, slightly bold shades."
            blush = "For triangle faces, the recommended blush placement is on the apples of the cheeks and back towards the temples."
        } else if(faceshape == "oblong") {
            contour = "For oblong faces, the recommended contour placement is light contour along the sides of the forehead and along the hairline, beneath the cheekbones, as well as contour along the sides of the nose."
            highlight = "For oblong faces, the recommended highlight placement is at the top of the cheekbones, along the brow bone, and some light application on the chin."
            lip = "For oblong faces, the recommended lip makeup includes bold reds, soft pinks, and nude tones."
            blush = "For oblong faces, the recommended blush placement is horizontally across the cheeks."
        } else if(faceshape == "heart") {
            contour = "For heart-shaped faces, the recommended contour is along the temples and hairline, beneath the cheekbones, and lightly along the jawline."
            highlight = "For heart-shaped faces, the recommended highlight placement is the the center of the forehead, from the top of the cheekbones towards the temples, and at the center of the chin."
            lip = "For heart-shaped faces, the recommended lip makeup includes either balanced pink/rose tones and nudes or deeper, slightly bold shades."
            blush = "For heart-shaped faces, the recommended blush placement is on the apples of the cheek, and back towards the ears."
        } else if(faceshape == "diamond") {
            contour = "For diamond faces, the recommended contour placement is light contour along the sides of the forehead, beneath the cheekbones, and lightly along the jawline."
            highlight = "For diamond faces, the recommended highlight placement is from the top of the cheekbones towards the temples, and at the center of the chin."
            lip = "For diamond faces, the recommended lip makeup includes either balanced pink/rose tones and nudes or deeper, slightly bold shades."
            blush = "For heart-shaped faces, the recommended blush placement is on the apples of the cheek, and back towards the ears."
        } else if(faceshape == "oval") {
            contour = "For oval faces, the recommended contour placement is light contour along the sides of the forehead, and beneath the cheekbones, as well as contour along the sides of the nose."
            highlight = "For oval faces, the recommended highlight placement is at the top of the cheekbones, along the brow bone, and some light application on the chin."
            lip = "For oval faces, the recommended lip makeup includes bold reds, soft pinks, and nude tones."
            blush = "For oval faces, the recommended blush placement is on the apples of the cheeks and back towards the temples."

        } 
    }

    


    
    
    const saveResults = async () => {
        if (!resultRef.current) return;

        const colorAnalysisResults = resultRef.current;

        const canvas = await html2canvas(colorAnalysisResults, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("portrait", "px", "a4");
        pdf.addImage(imgData,"PNG",0,0, pdf.internal.pageSize.getWidth(),(canvas.height * pdf.internal.pageSize.getWidth()) / canvas.width);
        pdf.save("FacialAnalysisResults.pdf");
}


    if(!proportions) {
        return(
            <main className="min-w-screen min-h-screen w-auto h-auto bg-linear-to-b from-blue-900 to-blue-950">
                <h1>Unable to locate results</h1>
            </main>
        )
    }
    return(
        <main className="min-w-screen min-h-screen w-auto h-auto bg-linear-to-tr from-blue-900 via-blue-800 to-blue-950 flex flex-col items-center">
            <div className="flex pt-10 justify-end w-full mr-15 mb-5">
                <button onClick={saveResults} className="bg-linear-to-tr from-orange-700 via-orange-400 to-orange-600 px-8 py-2 rounded-xl font-bold text-2xl">Save Results</button>
            </div>
            <div ref={resultRef} className="p-6 rounded-lg flex flex-col items-center h-auto" style={{ backgroundColor: "#1e3a8a"}}>
                <h1 className="text-3xl font-semibold p-5 pb-2">Facial Analysis Results</h1>
                <hr className="w-[60vw] border-t-2 p-2 mx-auto mt-2"></hr>
                <div className="max-h-[30vh] max-w-[70vw] w-auto h-auto min-h-[15vh] min-w-[60vw]">
                    <p className="text-xl text-center font-mono">The results of the analysis show that you have a {faceshape} face shape. Here are some general styling tips to help you accentuate 
                        your existing face structure.</p>
                </div>
                <div className=" max-w-[70vw] w-auto h-auto">
                    <h1 className="text-2xl font-semibold text-center">Makeup Tips for {faceshape} faces</h1>
                    <hr className="w-[40vw] border-t-2 p-2 mx-auto mt-2" />
                    <div>
                        <h1 className="font-bold font-mono text-xl">Contour Placement:</h1>
                        <p className="font-mono">{contour}</p>
                    </div>
                    <div>
                        <h1 className="font-bold font-mono text-xl">Highlight Placement:</h1>
                        <p className="font-mono">{highlight}</p>
                    </div>
                    <div>
                        <h1 className="font-bold font-mono text-xl">Blush Placement:</h1>
                        <p className="font-mono">{blush}</p>
                    </div>
                    <div>
                        <h1 className="font-bold font-mono text-xl">Lip Makeup:</h1>
                        <p className="font-mono">{lip}</p>
                    </div>

                </div>
            </div>
        </main>
    )
}