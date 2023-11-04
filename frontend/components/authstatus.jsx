import { getServerSession } from "next-auth";
import {options} from "../app/api/auth/[...nextauth]/options";
import Link from "next/link";
import {redirect} from "next/navigation";

export default async function AuthStatus() {
    const session = await getServerSession(options);

    return (
        <>
            {session? <li><span> {session?.user.name }</span></li> : <></>}
            <li>
                {session? <Link href="/api/auth/signout?callbackUrl=/">Sign out</Link>
                    : <Link href="/api/auth/signin">Sign in</Link>}
            </li>
        </>
    );
}