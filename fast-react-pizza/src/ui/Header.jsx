// import React from "react";

import { Link } from "react-router-dom";
import SearchInput from "../features/order/SearchInput";

function Header() {
  return (
    <header>
      <Link to={"/"}>Fast React Pizza Co.</Link>
      <SearchInput />
    </header>
  );
}

export default Header;
