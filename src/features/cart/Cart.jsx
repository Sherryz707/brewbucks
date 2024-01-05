import { Link, Outlet} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";
import EmptyCart from "./EmptyCart";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDBCartContext } from "../../context/CartDBContext";
import { checkoutStripe, deleteItem as deleteItemAPI } from "../../services/apiProduct";
import toast from "react-hot-toast";

const stripePromise = loadStripe(
  "pk_test_51NueeISHbdXuWjpYmrd7kEthgjuG0mB8d8iCLhXswwTTTdVCs5rYa138bJmOK9Cz01eyNwqWmHH0CAb9WyhHJpAN00tHBiEnFJ"
);

function Cart() {
  const { CartID } = useDBCartContext();
  const dispatch = useDispatch();
  const totalCartPrice = useSelector(getTotalCartPrice);
  const cart = useSelector(getCart);
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteItem } = useMutation({
    mutationFn: deleteItemAPI,
    onSuccess: () => {
      dispatch(clearCart())
      queryClient.invalidateQueries({ queryKey: ["cart", CartID] });
    },
    onError: (err) => {
      alert(err);
    },
  });
  function handleDelete() {
    cart.map((item) => {
       let itemUpdate = {
         uuid: item.uuid,
      };
      deleteItem({ itemUpdate, CartID });
    })
   
    
  }
  const { isLoading: isPurchasing, mutate } = useMutation({
    mutationFn: checkoutStripe,
    onSuccess: async (data) => {
      dispatch(clearCart);
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });
    },
    onError: (err) => {
      toast.error(err);
    },
  });
  function stripepayment() {
    mutate(CartID);
  }
  if (!cart.length) {
    return <EmptyCart />;
  }
  return (
    <div className="min-h-screen bg-base-200 m-3 rounded-lg p-4">
      <Link to="/menu">&larr; Back to menu</Link>
      <div className="flex justify-between my-5 items-center flex-wrap">
        <h1 className="text-3xl font-semibold text-left p-2 m-3 capitalize">
          Your grand total is {formatCurrency(totalCartPrice)}
        </h1>
        <div>
          <button
            className="btn btn-outline btn-warning mx-5 disabled:bg-warning/50"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting && <div className="loading loading-spinner"></div>}
            Clear Cart
          </button>

          <button
            className="btn btn-primary disabled:bg-primary/50"
            onClick={stripepayment}
            disabled={isPurchasing}
          >
            {isPurchasing && <div className="loading loading-spinner"></div>}
            Proceed to Checkout
          </button>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Cart;
