import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    isPending,
    data: {
      maxBookingLength,
      maxGuestsPerBooking,
      minBookingLength,
      breakfastPrice,
    } = {},
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return {
    isPending,
    maxBookingLength,
    maxGuestsPerBooking,
    minBookingLength,
    breakfastPrice,
  };
}
