import { NavLink } from "react-router-dom"
export default function NavBar({navLinks}){
    return (
        <nav className="flex gap-4 justify-center bg-green-500 p-4">
            {navLinks.map(link =>
                (
                    <NavLink key={link.id} to={link.path}>{link.name}</NavLink>
            ))}
        </nav>
    )
}