import { useSearchParams } from "react-router-dom";
import { useCabins } from "../features/cabins/useCabins";

export function useFilterCabin() {
  const { cabins} = useCabins();
  const [searchParams] = useSearchParams();
  const filterType = searchParams.get("discount") || "all";

  let filterCabins;
  if (filterType === "all") filterCabins = cabins;
  if (filterType === "no-discount")
    filterCabins = cabins?.filter((cabin) => cabin.discount === 0);
  if (filterType === "with-discount")
    filterCabins = cabins?.filter((cabin) => cabin.discount > 0);

  return {filterCabins}
}
