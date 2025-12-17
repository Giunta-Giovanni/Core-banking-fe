import {navLinks} from "../data/header-data";
import NavBar from "./Navbar";
export default function Header() {
    return(
        <header className="max-h-20">
            <NavBar navLinks = {navLinks} />
        </header>
    )
}