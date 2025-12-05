'use client';

import ColorBox from "./ColorBox";

type ColorPaletteBoxProps = {
    Hexcodes: string[];
}

export default function ColorPaletteBox({ Hexcodes }: ColorPaletteBoxProps) {
    if(Hexcodes.length === 0) {
        return;
    }
    return (
        <main className="max-h-[30vh] max-w-[70vw] w-auto h-auto min-h-[15vh] min-w-[60vw] bg-white rounded-xl p-5 m-5">
            <div className="grid grid-cols-6 gap-2 h-full w-full">
                {Hexcodes.map((hexcode, index) => (
                    <div key={index}>
                        <ColorBox Hexcode={hexcode} />
                    </div>
                ))}
            </div>
        </main>
    )
}
