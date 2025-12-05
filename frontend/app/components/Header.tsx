import Link from "next/link";

export default function Header() {

    return(
        <header className=" flex items-center h-[8vh] justify-between bg-blue-950 p-8">
            <h1 className="text-5xl font-semibold" >Coloryze</h1>
            <Link href="/" className="bg-linear-to-tr from-orange-700 via-orange-400 to-orange-600 px-8 py-2 rounded-2xl text-xl font-semibold">Home</Link>
        </header>
    )
}