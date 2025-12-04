'use client';

import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalState";
import SelectFile from "../components/SelectFile";
import TakePhoto from "../components/TakePhoto";

export default function SelectImage() {
    const { source } = useContext(GlobalContext);

    if (!source) {
        return(
            <h1>No source selected</h1>
        )
    } 

    if (source == "camera"){
        return(
            <main>
                <h1>{source}</h1>
                <TakePhoto/>
            </main>  
        )
    }

    return (
        <main>
            <h1>{source}</h1>
            <SelectFile/>
        </main>
    )
}