import Link from "next/link";
import prisma from '../db'
import {Booking} from "../../components/booking";
import {redirect} from "next/navigation";
import {getServerSession} from "next-auth";
import {options} from "../api/auth/[...nextauth]/options";
import isAdmin from "../isadmin";


//await prisma.booking.create({data: { room: 1, name: 'test', fromDate: new Date('1978-10-06'), toDate: new Date('1978-10-07')}})

export default async function BookingsPage() {
    const admin = await isAdmin();

    if (!admin) {
        redirect("/")
    }

    const bookings = await prisma.booking.findMany()

    return (
        <>
            <h1>Bookings</h1>
            <div className={"BookingOverview"}>
                {bookings.map(booking => (
                    <Booking key={booking.id} {...booking}/>
                ))}
            </div>
            <br/>
            <br/>
            <Link href="/new" className={"button"}>New Booking</Link>
        </>
    )
}