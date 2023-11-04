import {redirect} from "next/navigation";
import prisma from '../db'


async function createBooking(data) {
    "use server"
    const room = parseInt(data.get("room"));
    const name = data.get("name")?.valueOf();
    const fromDate = new Date(data.get("fromDate")?.valueOf());
    const toDate = new Date(data.get("toDate")?.valueOf());

    if(!room || !name || !fromDate || !toDate){
        throw new Error("Missing required fields");
    }

    const result = await prisma.booking.create({data: {room, name, fromDate, toDate}});
    if(result?.id){
        redirect(`/bookings/${result.id}`);
    }
    //redirect(`/bookings/${id}`);
}
export default function NewPage() {
    return (
        <>
            <h1>New Booking</h1>
            <form action={createBooking}>
                <label htmlFor="room">Room</label>
                <input type="number" id="room" name="room" required={true}/>
                <br/>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required={true}/>
                <br/>
                <label htmlFor="fromDate">From Date</label>
                <input type="date" id="fromDate" name="fromDate" required={true}/>
                <br/>
                <label htmlFor="toDate">To Date</label>
                <input type="date" id="toDate" name="toDate" required={true}/>
                <br/>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}