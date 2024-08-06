import Spinner from "../../ui/Spinner";
import CabinRow from "../cabins/CabinRow";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import { useFilterCabin } from "../../hooks/useFilterCabin";
import Empty from "../../ui/Empty";

function CabinTable() {
  const {  cabins,isLoading } = useCabins();
  // For Filter
  const { filterCabins } = useFilterCabin();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resource={"Cabins"}/>

  // For Sort
  const [field, direction] = (searchParams.get("sortBy") || "name-asc").split(
    "-"
  );

  let sortCabins;
  const modifier = direction === "asc" ? 1 : -1;

  if ( field === "name") {
    sortCabins =
      modifier === 1
        ? filterCabins?.sort((a, b) => a[field].localeCompare(b[field]))
        : filterCabins?.sort((a, b) => b[field].localeCompare(a[field]));
  } else {
    sortCabins = filterCabins?.sort((a, b) => (a[field] - b[field]) * modifier);
  }

 
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortCabins}
          render={(cabin, idx) => (
            <CabinRow cabin={cabin} key={cabin.id} cabinIdx={idx} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
