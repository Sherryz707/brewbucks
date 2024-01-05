import { useSelector } from "react-redux";

import { getCart } from "./cartSlice";

import CartRow from "./CartRow";

function CartTable() {
  const cart = useSelector(getCart);
  return (
    <div className="overflow-x-auto rounded-lg bg-base-100/50">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Item details G</th>
            <th>Quantity</th>
            <th></th>
          </tr>
        </thead>
        {
          <tbody>
            {/* row 1 */}
            {cart.map((item) => (
              <CartRow item={item} />
            ))}
          </tbody>
        }
        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            <th>Item details</th>
            <th>Quantity</th>
            <th></th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default CartTable;
