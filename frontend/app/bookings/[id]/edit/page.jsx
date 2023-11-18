import prisma from '../../../db'
import isAdmin from "../../../isadmin";
import {redirect} from "next/navigation";

async function editBooking(data) {
    "use server"
    if(data.get("delete_button") === "delete"){
        await prisma.booking.delete({where: {id: parseInt(data.get("id"))}});
        redirect(`/bookings`);
    }

    const oldBooking = await prisma.booking.findUnique({where: {id: parseInt(data.get("id"))}});

    let room = parseInt(data.get("room"));
    let name = data.get("name")?.valueOf();
    let fromDate = new Date(data.get("fromDate")?.valueOf());
    let toDate = new Date(data.get("toDate")?.valueOf());

    if(isNaN(room)) room = oldBooking?.room;
    if(!name) name = oldBooking?.name;
    if(fromDate?.toString() === "Invalid Date") fromDate = oldBooking?.fromDate;
    if(toDate?.toString() === "Invalid Date") toDate = oldBooking?.toDate;

    if(!room || !name || !fromDate || !toDate){
        throw new Error("Missing required fields");
    }

    const result = await prisma.booking.update({
        where: {id: parseInt(data.get("id"))},
        data: {room, name, fromDate, toDate}
    });
    if(result?.id){
        redirect(`/bookings/${result.id}`);
    }
}



export default async function EditPage({params}) {
    const admin = await isAdmin();

    if (!admin) {
        redirect("/")
    }

    const booking = await prisma.booking.findUnique({where: {id: parseInt(params?.id)}});

    return (
        <>
            <h1>Edit Booking</h1>
            <form action={editBooking}>
                <label htmlFor="id">ID</label>
                <input type="number" id="id" name="id" value={params?.id} readOnly={true}/>
                <br/>
                <br/>
                <label htmlFor="room">Room</label>
                <input type="number" id="room" name="room"/>
                <label htmlFor="room">  Before: {booking?.room}</label>
                <br/>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name"/>
                <label htmlFor="name">  Before: {booking?.name}</label>
                <br/>
                <label htmlFor="fromDate">From Date</label>
                <input type="date" id="fromDate" name="fromDate"/>
                <label htmlFor="fromDate">  Before: {booking?.fromDate?.toLocaleDateString()}</label>
                <br/>
                <label htmlFor="toDate">To Date</label>
                <input type="date" id="toDate" name="toDate"/>
                <label htmlFor="toDate">  Before: {booking?.toDate?.toLocaleDateString()}</label>
                <br/>
                <br/>
                <button type="submit" name="update_button" value="update" className={"button"}>Submit</button>
                <br/>
                <br/>
                <button type="submit" name="delete_button" value="delete" className={"button"}>Delete</button>
            </form>
        </>
    )
}