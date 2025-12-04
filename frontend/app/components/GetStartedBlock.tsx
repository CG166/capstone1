'use client';
import Link from "next/link";


export default function GetStartedblock() {
    return(
        <main className="flex items-center justify-center h-[75vh] bg-linear-to-tr from-orange-700 via-orange-400 to-orange-600">
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-blue-950 text-7xl font-bold">Get Started</h1>
                <Link href="/SelectAnalysis">
                    <button className="bg-linear-to-b from-blue-900 via-blue-800 to-blue-950 px-8 py-2 rounded-2xl text-xl m-10">Start</button>
                </Link>
                
            </div>
        </main>
    )
}