import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../cart/cartSlice";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@tanstack/react-query";
import { addItemToCart } from "../../services/apiProduct";
import { useDBCartContext } from "../../context/CartDBContext";
import toast from "react-hot-toast";

function prepareItem(sizeVariation, category, _id, name, sizeSt, price, slug) {
  const foundObject = sizeVariation.find((obj) => obj.size === sizeSt);
  const customization = [...category[0].customization];
  let standardArr = [];
  customization.forEach((el) => {
    const obj = {
      _id: el._id,
      name: el.options[0],
    };
    standardArr.push(obj);
  });

  const productSKU = foundObject.sku;
  const newItem = {
    uuid: uuidv4(),
    _id,
    sku: productSKU,
    name,
    slug,
    size: sizeSt,
    qty: 1,
    standard: standardArr,
    extra: [],
    unitPrice: price,
    totalPrice: price * 1,
  };

  return newItem;
}

function MenuItem({ product }) {
  const newItemPrep = useRef();
  let {
    name,
    ratingAverage,
    ratingQuantity,
    sizeVariation,
    slug,
    _id,
    category,
  } = product;
  const { CartID } = useDBCartContext();
  const { isLoading: isAdding, mutate } = useMutation({
    mutationFn: addItemToCart,
    onSuccess: () => {
      toast.success(`${name} successfully added!.`);
    },
    onError: (err) => {
      alert(err);
    },
  });
  const dispatch = useDispatch();
  ratingAverage = parseInt(ratingAverage);

  function handlePriceAndSize(e) {
    const size = e.target.value;
    const price = sizeVariation.find((el) => el.size === size).price;
    setPrice(price);
    setSize(size);
  }
  const [price, setPrice] = useState(
    sizeVariation.find((el) => el.size === "regular").price
  );
  const [sizeSt, setSize] = useState("regular");

  newItemPrep.current = prepareItem(
    sizeVariation,
    category,
    _id,
    name,
    sizeSt,
    price,
    slug
  );
  function handleAddToCart() {
    let newItem = newItemPrep.current;
    dispatch(addItem(newItem));
    mutate({ newItem, CartID });
  }
  return (
    <div className="w-full max-w-sm border-gray-200 rounded-lg shadow-xl bg-base-100 hover:shadow-xl">
      <Link to={`/product/${slug}`}>
        {
          <img
            className="rounded-t-lg"
            src="https://globalassets.starbucks.com/digitalassets/products/bev/SBX20220411_ChaiLatte.jpg?impolicy=1by1_wide_topcrop_630"
            alt={`${name}`}
          />
        }
      </Link>
      <div className="py-[1rem] px-[0.313rem] md:p-[1rem]">
        <div className="flex justify-between items-center">
          <h1 className="text-md md:text-xl font-bold tracking-tight capitalize">
            {name}
          </h1>
          <span className=" text-sm md:text-xl font-bold text-primary">
            ${price}
          </span>
        </div>
        <div className="divider mt-1"></div>
        <div className="flex items-center my-2.5 mb-1">
          <div className="rating  rating-sm md:rating-md lg:rating-md">
            {Array.from({ length: 5 }, (_, el) => (
              <input
                key={el}
                type="radio"
                name={`rating-${ratingAverage ?? 3}`}
                className="mask mask-star-2 bg-orange-400"
                defaultChecked={el === ratingAverage ? true : undefined}
              />
            ))}
          </div>
          <span className="bg-orange-400/50 text-xs md:text-sm lg:text-md font-semibold mr-2 px-2.5 py-0.5 rounded-full  ml-3">
            {ratingQuantity}
          </span>
        </div>
        <div className="flex m-5 ml-0 gap-2">
          {sizeVariation.map((sizeEl) => (
            <input
              className="btn btn-circle btn-xs p-2 
                  bg-neutral-content/40
                  checked:ring ring-primary ring-offset-base-100 ring-offset-2"
              type="radio"
              name={`${_id + slug}`}
              key={`${_id + slug + uuidv4()}`}
              defaultChecked={sizeEl.size === "regular"}
              value={sizeEl.size}
              onClick={(e) => handlePriceAndSize(e)}
              aria-label={`${sizeEl.size[0].toUpperCase()}`}
            />
          ))}
        </div>
        <div className="flex gap-[0.5rem] items-center flex-wrap justify-start mb-2">
          <Link
            to={`/product/${slug}`}
            className="btn btn-xs lg:btn-sm btn-outline btn-primary uppercase font-medium text-xs"
          >
            Personalize
          </Link>
          <button
            disabled={isAdding}
            onClick={handleAddToCart}
            className="btn btn-xs  lg:btn-sm btn-primary font-bold text-xs disabled:bg-primary/50"
          >
            {isAdding && (
              <span className="loading loading-spinner loading-xs"></span>
            )}
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
