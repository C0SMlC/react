import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchInput() {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/order/${searchText}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
}

export default SearchInput;
