import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const { data: activities, isPending } = useQuery({
    queryKey: ["today-activities"],
    queryFn: getStaysTodayActivity,
  });

  return { activities, isPending };
}
