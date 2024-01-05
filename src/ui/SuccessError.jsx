import { useDispatch } from "react-redux";
import {useSearchParams } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";
import { useDBCartContext } from "../context/CartDBContext";
import { useMutation } from "@tanstack/react-query";
import { completeCart } from "../services/apiProduct";
import toast from "react-hot-toast";
import { useEffect } from "react";

function SuccessError() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("cart");
  const dispatch = useDispatch();
  const { CartID } = useDBCartContext();
  const { mutate } = useMutation(
    {
      mutationFn: completeCart,
      onSuccess: () => {
        toast.success(`PAYMENT SUCCESSFULLLL`);
      },
      onError: (err) => {
        toast.error(err);
      },
    },
    {
      retry: 1,
    }
  );
  useEffect(
    function () {
      if (status === "success") {
        dispatch(clearCart);
        localStorage.removeItem("CartID");
        mutate(CartID);
      }
    },
    [CartID, mutate, status, dispatch]
  );

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src={`${
            status === "success" ? "/orderConfirmed.svg" : "/orderError.svg"
          }`}
          alt={status}
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">
            {status === "success"
              ? "Thank You For Your Patronage"
              : "Sorry! Your Order Was Cancelled"}
          </h1>
          <p className="py-6">
            {status === "success"
              ? "We hope to see you again soon :)"
              : "Please try again"}
          </p>
          <button
            className={`btn btn-primary ${status === "cancel" ? "" : "hidden"}`}
          >
            Go To Menu
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessError;
