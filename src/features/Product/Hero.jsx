import { formatCurrency } from "../../utils/helpers";

let ratingArr = [1, 2, 3, 4, 5];

function Hero({
  img,
  handleAddToCart,
  name,
  ratingAverage,
  ratingQuantity,
  sizeVariation,
  _id,
  price,
  handlePriceAndSize,
}) {
  return (
    <div className="hero bg-base-200">
      <div className="hero-content flex-col lg:flex-row lg:gap-9">
        <img
          src="https://globalassets.starbucks.com/digitalassets/products/bev/SBX20220411_ChaiLatte.jpg?impolicy=1by1_wide_topcrop_630"
          className="max-w-sm rounded-full shadow-2xl"
          alt="mout"
        />
        <div>
          <button
            onClick={handleAddToCart}
            className="btn btn-xs sm:btn-sm   btn-primary"
          >
            Standard Buy
          </button>
          <h1 className="text-5xl font-bold">{name}</h1>
          <div className="rating">
            {ratingArr.map((el) => (
              <input
                key={el}
                type="radio"
                name={`rating-${ratingAverage ?? 3}`}
                className="mask mask-star-2 bg-green-500"
                defaultChecked={el === ratingAverage ? true : undefined}
              />
            ))}
            <span>({ratingQuantity})</span>
          </div>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <div className="flex m-5 ml-0 gap-2">
            {sizeVariation.map((sizeEl) => (
              <input
                className="btn btn-circle btn-xs p-2 
                  bg-neutral-content/40
                  checked:ring ring-primary ring-offset-base-100 ring-offset-2"
                type="radio"
                name={_id}
                key={`${sizeEl.size}`}
                defaultChecked={sizeEl.size === "regular"}
                value={sizeEl.size}
                onClick={(e) => handlePriceAndSize(e)}
                aria-label={`${sizeEl.size[0].toUpperCase()}`}
              />
            ))}
          </div>
          <div className="font-bold text-3xl">{formatCurrency(price)}</div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
