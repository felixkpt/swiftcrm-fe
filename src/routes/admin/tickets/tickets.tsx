import Ticket from "@/Pages/Admin/Tickets/Ticket/Ticket"
import Tickets from "@/Pages/Admin/Tickets/Tickets"

const tickets = [

    {
        path: '',
        element: <Tickets />,
    },
    {
        path: 'ticket/:id',
        element: <Ticket />,
    },

]

export default tickets