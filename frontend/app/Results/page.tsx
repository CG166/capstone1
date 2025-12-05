'use client';

import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalState";
import ColorResults from "../components/ColorResults";
import FaceResults from "../components/FaceResults";

export default function Results() {
    const {analysis} = useContext(GlobalContext);
    if(!analysis) {
        return(
            <main>
                <h1>Unable to locate results</h1>
            </main>
        )
    }
    if (analysis == "face"){
        return(
        <main>
            <FaceResults/>
        </main>
        )
    }

    return(
        <main>
            <ColorResults/>
        </main>
    )
}