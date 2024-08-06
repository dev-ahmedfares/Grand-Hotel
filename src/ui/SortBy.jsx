import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChangeSelect(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams, { replace: true });
  }

  return (
    <Select
      type={"white"}
      value={sortBy}
      options={options}
      handleChangeSelect={handleChangeSelect}
    />
  );
}

export default SortBy;
