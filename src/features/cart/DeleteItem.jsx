import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";

function DeleteItem({ item_id }) {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(deleteItem(item_id))}
      className="btn btn-outline btn-primary btn-xs hover:btn-outline my-3"
    >
      Delete
    </div>
  );
}

export default DeleteItem;
