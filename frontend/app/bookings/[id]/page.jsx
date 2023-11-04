import prisma from '../../db'
import Link from "next/link";

export default async function NewPage({params}) {
    console.log("JSON.stringify(params)")
    console.log(JSON.stringify(params))
    const booking = await prisma.booking.findUnique({where: {id: parseInt(params?.id)}});

    return (
        <>
            <h1>Booking {params?.id}</h1>
            <p>Room Number: {booking?.room}</p>
            <p>Guest Name: {booking?.name}</p>
            <br/>
            <p>Booking From Date: {booking?.fromDate?.toLocaleDateString()}</p>
            <p>Booking To Date: {booking?.toDate?.toLocaleDateString()}</p>
            <br/>
            <p>Created At: {booking?.createdAt?.toLocaleDateString()}</p>
            <p>Updated At: {booking?.updatedAt?.toLocaleDateString()}</p>

            //create link to edit booking
            <br/>
            <br/>
            <Link href={`/bookings/${params?.id}/edit`}>Edit</Link>
        </>
    )
}