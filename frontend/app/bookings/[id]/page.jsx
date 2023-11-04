import prisma from '../../db'

export default async function NewPage({params}) {
    console.log("JSON.stringify(params)")
    console.log(JSON.stringify(params))
    const booking = await prisma.booking.findUnique({where: {id: parseInt(params?.id)}});

    return (
        <>
            <h1>Booking {params?.id}</h1>
            <p>Room: {booking?.room}</p>
            <p>Name: {booking?.name}</p>
            <p>From Date: {booking?.fromDate?.toLocaleDateString()}</p>
            <p>To Date: {booking?.toDate?.toLocaleDateString()}</p>
        </>
    )
}