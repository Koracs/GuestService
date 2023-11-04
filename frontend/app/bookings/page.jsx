import Link from "next/link";
import prisma from '../db'
import {Booking} from "../../components/booking";


//await prisma.booking.create({data: { room: 1, name: 'test', fromDate: new Date('1978-10-06'), toDate: new Date('1978-10-07')}})

export default async function BookingsPage() {
    const bookings = await prisma.booking.findMany()

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