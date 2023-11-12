import {getServerSession} from "next-auth";
import {options} from "./api/auth/[...nextauth]/options";

export default async function isAdmin() {
    const session = await getServerSession(options);
    return JSON.stringify(session?.roles)?.includes("admin");
}