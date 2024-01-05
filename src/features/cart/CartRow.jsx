import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import {
  decreaseItemQty,
  deleteItem,
  getCurrentQuantityById,
  increaseItemQty,
} from "./cartSlice";
import {
  deleteItem as deleteItemAPI,
  increaseQtyItem,
} from "../../services/apiProduct";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDBCartContext } from "../../context/CartDBContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
function CartRow({ item }) {
  const queryClient = useQueryClient();
  const { CartID } = useDBCartContext();
  const dispatch = useDispatch();
  const currentQty = useSelector(getCurrentQuantityById(item.uuid));
  const { isLoading: isUpdating, mutate: updateItem } = useMutation({
    mutationFn: increaseQtyItem,
    onSuccess: () => {
      toast.success(`${item.name} confirmed!.`);
    },
    onError: (err) => {
      toast.error(err);
    },
  });
  const { isLoading: isDeleting, mutate: delteItemM } = useMutation({
    mutationFn: deleteItemAPI,
    onSuccess: () => {
      toast.success(`${item.name} successfully deleted!.`);
      dispatch(deleteItem(item.uuid));
      queryClient.invalidateQueries({ queryKey: ["cart",CartID] });
    },
    onError: (err) => {
      alert(err);
    },
  });
  function handleDelete() {
    let itemUpdate = {
      uuid: item.uuid,
    };
    delteItemM({ itemUpdate, CartID });
  }
  function handleQty() {
    let itemUpdate = {
      new_qty: currentQty,
      uuid: item.uuid,
      sku: item.sku,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice,
    };
    updateItem({ itemUpdate, CartID });
  }
  return (
    <tr key={item.uuid}>
      <td>
        <div className="flex items-center justify-center space-x-3">
          <div className="flex items-center flex-wrap flex-col justify-evenly md:flex-row md:flex-nowrap md:gap-4">
            <div className="avatar">
              <div className="mask mask-squircle w-[6rem] h-[6rem]">
                <img
                  src="https://globalassets.starbucks.com/digitalassets/products/bev/SBX20220411_ChaiLatte.jpg?impolicy=1by1_wide_topcrop_630"
                  alt="Avatar Tailwind CSS Component"
                />
              </div>
            </div>
          </div>
        </div>
      </td>
      <td className="flex flex-col">
        <div className="mb-2 text-base md:text-xl">{item.name}</div>
        <span className={`md:ml-2 italic text-xs`}>
          <ul>
            {item.standard.map((el) => (
              <li className="ml-2 italic text-xs" key={el.name}>{el.name}</li>
            ))}
          </ul>
        </span>
        <br></br>
        {item.extra.length > 0 && (
          <>
            <div className="divider my-2 text-sm">extra</div>

            <ul>
              {item.extra.map((el) => (
                <li>
                  <span className="ml-2 italic text-xs">{el.name}</span>
                </li>
              ))}
            </ul>
          </>
        )}
        <div className="divider my-3 text-sm"></div>
        <div className="font-bold text-lg text-primary">
          {formatCurrency(item.totalPrice)}
        </div>
      </td>
      <td>
        <div className="flex gap-2">
          <button
            className="btn btn-circle btn-outline btn-xs"
            onClick={() => dispatch(decreaseItemQty(item.uuid))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <input
            className="w-10 rounded-lg py-1 px-1.5"
            type="number"
            value={item.qty}
          />
          <button
            className="btn btn-circle btn-outline btn-xs"
            onClick={() => dispatch(increaseItemQty(item.uuid))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </td>

      <th>
        <button
          onClick={handleDelete}
          className="btn btn-outline btn-default btn-xs hover:btn-outline mb-5"
        >
          {isDeleting && (
            <span className="loading loading-spinner loading-xs"></span>
          )}
          Delete
        </button>
        <br></br>
        <Link
          to={`/product/${item.slug}?toCart=${item.uuid}`}
          className="btn btn-outline btn-default btn-xs hover:btn-outline mb-5"
        >
          Customize
        </Link>
        <br></br>
        <button
          className="btn btn-outline btn-primary btn-xs"
          onClick={handleQty}
          disabled={isUpdating}
        >
          {isUpdating && (
            <span className="loading loading-spinner loading-xs"></span>
          )}
          Confirm Item
        </button>
      </th>
    </tr>
  );
}

export default CartRow;
