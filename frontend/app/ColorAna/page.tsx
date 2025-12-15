"use client";

import { useContext, useEffect} from "react";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context/GlobalState";
import Image from "next/image";

//Requirements Fullfilled//
/*11. When the user clicks the view in-depth results, the system shall display a screen displaying the in-depth results of the color analysis.
Description: The system shall display a screen displaying the in-depth results of the color analysis.
Precondition: The user must have been on the color analysis general results page.
Postcondition: The in-depth color analysis results page will be displayed.
 */

type CAnalyzeResult = {
  error?: string;
  color_analysis_results?: string[];
};

export default function ColorAna() {
    const { file, CAresults, setCAresults } = useContext(GlobalContext);
	const router = useRouter();


    useEffect(() => {
	if (!file) return;

	const analyze = async () => {
		const formData = new FormData();
		formData.append("file", file);

		const res = await fetch("http://localhost:8000/ColorAna", {
		method: "POST",
		body: formData,
		});
		const data: CAnalyzeResult = await res.json();
		setCAresults(data);
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
			<h1 className="text-5xl font-extrabold">Color Profile Analysis</h1>
			<div className="flex flex-row m-10">
				<Image src={url} alt="Image Source" width={450} height={350} className="border-2 border-blue-950 m-10" priority/>
				<div className="flex flex-col items-center justify-start">
					<h1 className="text-4xl font-semibold">Analysis Results</h1>
					<div className=" bg-blue-950 mt-10 p-10 text-xl rounded-2xl">
						{CAresults?.error && 
						<p>Error: {CAresults.error}</p>}
						{CAresults?.color_analysis_results && 
						<><h1 className="pb-2">General Undertone: {CAresults.color_analysis_results[0]}</h1>
						<h1>Specific Undertones: {CAresults.color_analysis_results[1]}</h1>
						<h1 className="pt-10">Your color analysis has been completed!</h1>
						<p>The analysis has determined that you have {CAresults.color_analysis_results[0]}-toned skin, with {CAresults.color_analysis_results[1]} undertones.
							 The analysis has also concluded that the depth of your skin means that you would look best in {CAresults.color_analysis_results[2]} colors.</p>
						</>
						}
					</div>
					<button onClick={() => submit()} className="text-3xl font-bold pt-10">Expand results → </button>
				</div>
			</div>
        </main>
    )
}