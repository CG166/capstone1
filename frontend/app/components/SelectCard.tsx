'use client';

type SelectCardProps = {
    title: string;
    optionButton: React.ReactNode;
}

export default function SelectCard({title, optionButton} : SelectCardProps) {
    return (
        <main className="flex flex-col items-center justify-center h-[35vh] w-[35vw] bg-linear-to-tr from-orange-700 via-orange-400 to-orange-600 rounded-3xl p-8">
            <h1 className="text-4xl font-semibold text-blue-950">{title}</h1>
            <div className="mt-4">{optionButton}</div>

        </main>
    )
}