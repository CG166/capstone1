'use client';

import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalState";
import SelectFile from "../components/SelectFile";
import TakePhoto from "../components/TakePhoto";

//Requirements Fullfilled//
/*3. When the user clicks on either the begin new color analysis button or the begin a new facial feature analysis, the system shall display the options of either taking a photo with the web camera or uploading an image.
Description: The user will be prompted to select either the take photo button or upload an image button.
Precondition: The user must have clicked the begin new color analysis button .
Postcondition: The user will be directed to either the take a photo screen or the upload an image screen.

4. When the user clicks on the upload an image button, the system shall present the user with the file upload screen.
Description: The system will display the file upload screen, and prompt the user to select an image from their files.
Precondition: The user must have clicked the upload an image button, and have an existing image.
Postcondition: The file upload screen will be displayed to the user.

6.When the user selects the take a photo button, the system will present the user with the take a photo screen.
Description: The system will display the take a photo screen. 
Precondition: The user must have clicked on the take a photo button instead of clicking on the upload an image button.
Postcondition: The system will display the take a photo screen.
 */

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
                <TakePhoto/>
            </main>  
        )
    }

    return (
        <main>
            <SelectFile/>
        </main>
    )
}