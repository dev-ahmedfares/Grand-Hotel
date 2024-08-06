import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams();

  // FOR Filter
  const filterValue = searchParams.get("status") || null;

  // FOR SortBy
  const [field, direction] =
    searchParams.get("sortBy")?.split("-") || "startDate-desc".split("-");
  
  const filterOptions = {
    field: "status",
    value: filterValue === "all" ? null : filterValue,
    method: "eq",
  };
  const sortByOptions = { field, direction };

  // FOR PAGINATION
  
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page")) 

  const { data : {data : bookings,count} = {}, isPending,error } = useQuery({
    queryKey: ["bookings", filterOptions, sortByOptions,page],
    queryFn: () => getBookings(filterOptions, sortByOptions,page),
  });

  // FOR PRE-FETCHING
  const allPages = Math.ceil(count / PAGE_SIZE)
  
  if (page < allPages)
  queryClient.prefetchQuery({
    queryKey:["bookings",filterOptions,sortByOptions,page + 1],
    queryFn: () => getBookings(filterOptions, sortByOptions,page + 1),
  })

  if (page > 1)
  queryClient.prefetchQuery({
    queryKey:["bookings",filterOptions,sortByOptions,page - 1],
    queryFn: () => getBookings(filterOptions, sortByOptions,page - 1),
  })

  return { bookings, isPending,count,error };
}
