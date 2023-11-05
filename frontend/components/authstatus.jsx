import { getServerSession } from "next-auth";
import {options} from "../app/api/auth/[...nextauth]/options";
import Link from "next/link";
import {redirect} from "next/navigation";
import isAdmin from "../app/isadmin";

export default async function AuthStatus() {
    const session = await getServerSession(options);
    const admin = await isAdmin();
    return (
        <>
            {session? <li><span> {session?.user.name }</span></li> : <></>}
            {admin? <li><span style={{color:"green"}}>Admin</span></li> : <></>}
            <li>
                {session? <Link href="/api/auth/signout?callbackUrl=/">Sign out</Link>
                    : <Link href="/api/auth/signin">Sign in</Link>}
            </li>
        </>
    );
}