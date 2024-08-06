import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        fieldFilter={"discount"}
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by Name (A-Z)" },
          { value: "name-des", label: "Sort by Name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by Price (low-first)" },
          { value: "regularPrice-des", label: "Sort by Price (high-first)" },
          { value: "maxCapacity-asc", label: "Sort by Capacity (low-first)" },
          { value: "maxCapacity-des", label: "Sort by Capacity (high-first)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
