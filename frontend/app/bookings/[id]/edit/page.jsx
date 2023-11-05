import prisma from '../../../db'
import Link from "next/link";
import isAdmin from "../../../isadmin";
import {redirect} from "next/navigation";

async function editBooking() {
    "use server"
    //todo: implement this function
    //todo multiple server actions from one form? (edit and delete)
}

export default async function EditPage({params}) {
    const admin = await isAdmin();

    if (!admin) {
        redirect("/")
    }

    const booking = await prisma.booking.findUnique({where: {id: parseInt(params?.id)}});

    return (
        <>
            <h1>Edit Booking {params?.id}</h1>
            <form action={editBooking}>
                <label htmlFor="room">Room</label>
                <input type="number" id="room" name="room" required={true} value={booking?.room}/>
                <br/>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required={true} value={booking?.name}/>
                <br/>
                <label htmlFor="fromDate">From Date</label>
                <input type="date" id="fromDate" name="fromDate" required={true} value={booking?.fromDate?.toLocaleDateString()}/>
                <br/>
                <label htmlFor="toDate">To Date</label>
                <input type="date" id="toDate" name="toDate" required={true} value={booking?.toDate?.toLocaleDateString()}/>
                <br/>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}