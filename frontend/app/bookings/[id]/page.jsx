import prisma from '../../db'
import Link from "next/link";
import isAdmin from "../../isadmin";

export default async function NewPage({params}) {
    const booking = await prisma.booking.findUnique({where: {id: parseInt(params?.id)}});
    const admin = await isAdmin();

    return (
        <>
            <h1>Booking {booking?.id}</h1>
            <p>Room Number: {booking?.room}</p>
            <p>Guest Name: {booking?.name}</p>
            <br/>
            <p>Booking From Date: {booking?.fromDate?.toLocaleDateString()}</p>
            <p>Booking To Date: {booking?.toDate?.toLocaleDateString()}</p>
            <br/>
            <p>Created At: {booking?.createdAt?.toLocaleDateString()}</p>
            <p>Updated At: {booking?.updatedAt?.toLocaleDateString()}</p>

            <br/>
            <br/>
            {admin? <Link href={`/bookings/${params?.id}/edit`} className={"button"}>Edit</Link> : <></>}
        </>
    )
}