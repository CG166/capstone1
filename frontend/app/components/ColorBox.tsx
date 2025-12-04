'use client';

type ColorBoxProps = {
    Hexcode: string;
}

export default function ColorBox({Hexcode} : ColorBoxProps) {
    
    return(
        <main className="max-h-[10vh] max-w-[10vw] w-auto h-auto min-h-[5vh] min-w-[5vw]" style={{ backgroundColor: Hexcode }}>
        </main>
    )
}