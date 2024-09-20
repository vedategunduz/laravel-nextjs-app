import Link from "next/link";

const Nav = () => {
    return (
        <nav className="shadow-md">
            <div className="container mx-auto flex items-center justify-between py-4">
                {/* Brand */}
                <Link href={"/"} className="uppercase text-3xl font-semibold">Brand</Link>

                <div className="space-x-12">
                    <Link href={"/#"}>Etkinlikler</Link>
                    <Link href={"/#"}>Oyunlar</Link>
                    <Link href={"/#"}>Ekip</Link>
                    <Link href={"/#"}>Destek</Link>
                    <Link href={"/#"}>Giriş yap</Link>
                </div>
            </div>
        </nav>
    );
}

export default Nav;