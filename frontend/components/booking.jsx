import Link from "next/link";

export async function Booking({id, room, name, fromDate, toDate}) {

    return (
            <div className={"BookingButton"}>
                <p>Room {room}<br/>{name}&nbsp;&nbsp;</p>
                <Link href={`/bookings/${id}`}>Details</Link>
            </div>
    )
}