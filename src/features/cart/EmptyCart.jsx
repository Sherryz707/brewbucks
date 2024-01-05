import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src="/emptyCart.svg"
          alt="empty cart"
          className="max-w-sm"
        />
        <div>
          <h1 className="text-3xl font-bold capitalize">Your cart is empty.....</h1>
          <Link to="/menu" className="btn btn-outline btn-sm btn-primary mt-3">&larr; Back to menu</Link>
        </div>
      </div>
    </div>
  )
}

export default EmptyCart;
