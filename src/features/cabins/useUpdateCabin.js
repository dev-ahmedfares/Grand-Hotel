import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";



export function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isPending: isUpdatingCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully Edited"),
        queryClient.invalidateQueries({
          queryKey: ["cabins"],
        });
      
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateCabin,  isUpdatingCabin }
}
