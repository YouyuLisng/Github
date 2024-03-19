"use client";

import Container from "@/components/Container";
import Logo from "@/components/Navbar/Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

const Navbar = () => {
    return(
        <div className="fixed w-full bg-headerblue z-10 shadow-sm">
            <Container>
                <div className="flex flex-row items-center justify-between gap-3 md:-gap-0">
                    <div className="flex items-center">
                        <Logo />
                        <div className="hidden md:block">
                            <Search />
                        </div>
                    </div>
                    <UserMenu />
                </div>
            </Container>
        </div>
    )
}

export default Navbar;