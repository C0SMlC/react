import { formatCurrency } from "../../utils/helpers";
import PropTypes from "prop-types";


// Add  isLoadingIngredients, ingredients props later
function OrderItem({ item }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li>
      <div>
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

OrderItem.propTypes = {
  item: PropTypes.object,
  isLoadingIngredients: PropTypes.bool,
  ingredients: PropTypes.array,
};

export default OrderItem;
