import Link from "next/link";
import prisma from '../db'
import {Booking} from "../../components/booking";
import {options} from "../api/auth/[...nextauth]/options";
import {getServerSession} from "next-auth";


//await prisma.booking.create({data: { room: 1, name: 'test', fromDate: new Date('1978-10-06'), toDate: new Date('1978-10-07')}})

export default async function MyBookingsPage() {
    const session = await getServerSession(options);
    const userName = session?.user.name;
    console.log(userName)
    const bookings = await prisma.booking.findMany({where: {name: {equals: userName, mode: "insensitive"}}});

    return (
        <>
            <h1>Bookings</h1>
            <ul>
                {bookings.map(booking => (
                    <Booking key={booking.id} {...booking}/>
                ))}
            </ul>
            <Link href="/new" className={"button"}>New Booking</Link>
        </>
    )
}