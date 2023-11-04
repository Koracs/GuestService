"use client"


import {useSession} from "next-auth/react";

export default function ClientPage(){
    const { data: session } = useSession();

    return (
        <>
            <h1>Client</h1>
            <p>{session?.user.name}</p>
        </>
    )
}