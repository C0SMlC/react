import { Link } from "react-router-dom";

import Cart from "./Cart";

function CartOverview() {
  return (
    <div>
      <Cart />
      <p>
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to={"/"}>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
