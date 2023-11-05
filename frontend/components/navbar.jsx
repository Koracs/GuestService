import Link from "next/link";
import AuthStatus from "./authstatus";
import ThemeChanger from "./themechanger";
import isAdmin from "../app/isadmin";
import {getServerSession} from "next-auth";
import {options} from "../app/api/auth/[...nextauth]/options";

export default async function NavBar() {
    const session = await getServerSession(options);
    const admin = await isAdmin();

    return (
        <nav className={"navBar"}>
            <ul>
                <li><Link href="/">Home</Link></li>
                {admin? <li><Link href="/bookings">All Bookings</Link></li> : <></>}
                {session? <li><Link href="/mybookings">My Bookings</Link></li> : <></>}
                <li><Link href="/new">New Booking</Link></li>
                <div style={{float: "right"}}>
                    <ThemeChanger/>
                    <AuthStatus/>
                </div>
            </ul>

        </nav>
    );
}