'use client';


export default function Introblock() {
    return(
        <main className="flex items-center justify-center h-[75vh] bg-linear-to-b from-blue-900 via-blue-800 to-blue-950">
            <div
             className="w-1/2">
                <h1 className="text-center text-5xl font-bold">Coloryze</h1>
                <br></br>
                <p className="text-xl font-semibold">Coloryze is an application that allows users to receive a digital color analysis based on an uploaded photograph of themselves. The application will analyze the photo, identify the user’s hair color, eye color, skin tone and undertone, and use that to determine the user’s color profile and what colors would best complement them.</p>
            </div>

        </main>
    )
}