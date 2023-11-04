import Link from "next/link";

export function Booking({id, room, name, fromDate, toDate}) {
    return (
        <li>
            <div>
                <p>Room: {room}&nbsp;&nbsp; Name: {name}&nbsp;&nbsp;</p>
                <Link href={`/bookings/${id}`}>Details</Link>
                <br/>
                <br/>
            </div>
        </li>
    )
}