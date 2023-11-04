import Link from "next/link";
import AuthStatus from "./authstatus";
import ThemeChanger from "./themechanger";

export default function NavBar() {

    return (
        <nav className={"navBar"}>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/bookings">Bookings</Link></li>
                <li><Link href="/new">New Booking</Link></li>
                <div style={{float: "right"}}>
                    <ThemeChanger/>
                    <AuthStatus/>
                </div>
            </ul>

        </nav>
    );
}