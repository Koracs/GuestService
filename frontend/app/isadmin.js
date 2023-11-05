import {getServerSession} from "next-auth";
import {options} from "./api/auth/[...nextauth]/options";

export default async function isAdmin() {
    const session = await getServerSession(options);
    const admin = JSON.stringify(session?.roles)?.includes("admin");
    console.log("isadmin", admin)
    return admin;
}