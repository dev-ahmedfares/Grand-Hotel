import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";

export function useCheckin() {
    const navigate =  useNavigate()
    const queryClient = useQueryClient()

  const {mutate :checkin, isPending:isCheckingIn} =  useMutation({
        mutationFn:({bookingId, breakfast}) => updateBooking(bookingId,{
            isPaid: true,
            status: "checked-in",
            ...breakfast
        }),
        onSuccess:(data)=> {
            toast.success(`Booking #${data.id} successfully checked in`)
            queryClient.invalidateQueries({active:true})
            navigate("/")
        },
        onError:()=> {
            toast.error("There was an error while checking in")
        }
    })

    return  {checkin, isCheckingIn}
}
