import { useState } from "react";
import { useLoaderData, useParams, useSearchParams } from "react-router-dom";
import ReviewList from "./ReviewList";
import { formatCurrency } from "../../utils/helpers";
import CustomizationsList from "./CustomizationsList";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addItem, getItemInCart } from "../cart/cartSlice";
import BreadCrumbs from "./BreadCrumbs";
import {
  addItemToCart,
  getProductBySlug,
  updateProductInCart,
} from "../../services/apiProduct";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDBCartContext } from "../../context/CartDBContext";
import toast from "react-hot-toast";

function standardUpsert(array, id, elementz) {
  const elementArr = elementz.split("+");
  let elementItem = elementArr[0];
  let element = { id, name: elementItem };
  const newArray = array.slice(); // Create a copy of the original array
  const i = newArray.findIndex((_element) => _element._id === id);

  if (i > -1) {
    newArray[i] = element; // Update existing element
  } else {
    newArray.push(element); // Add new element
  }
  return newArray; // Return the new array
}
function extraUpsert(array, id, elementz, setPrice) {
  const newArray = array.slice();
  const elementArr = elementz.split("+");
  let elementItem = elementArr[0];
  let price = parseFloat(elementArr[1]);
  let element = { _id: id, name: elementItem, price };

  if (!element) return;

  // Create a copy of the original array
  const i = newArray.findIndex((_element) => _element._id === id);

  if (i > -1) {
    if (isNaN(price)) {
      let decresePrice = newArray[i].price;
      setPrice((prevPrice) => prevPrice - decresePrice);
      newArray.splice(i, 1);
      return newArray;
    }

    price = 0;
    newArray[i] = element; // Update existing element
  } else {
    if (!price) return newArray;
    newArray.push(element); // Add new element
  }
  setPrice((prevPrice) => prevPrice + price);
  return newArray; // Return the new array
}
function ProductItem() {
  const { CartID } = useDBCartContext();
  const params = useParams();
  const initialData = useLoaderData();
  const { data: product } = useQuery({
    queryKey: ["product", params.slug],
    queryFn: async () => await getProductBySlug(params.slug),
    initialData,
  });
  const { isLoading: isAdding, mutate } = useMutation({
    mutationFn: addItemToCart,
    onSuccess: () => {
      toast.success(`${name} successfully added!.`);
    },
    onError: (err) => {
      alert(err);
    },
  });
  const { isLoading: isUpdating, mutate: updateItem } = useMutation({
    mutationFn: updateProductInCart,
    onSuccess: () => {
      toast.success(`${name} successfully updated!.`);
    },
    onError: (err) => {
      toast.err(err);
    },
  });
  const dispatch = useDispatch();
  const [tab, setTab] = useState("standard");
  const [searchParams] = useSearchParams();
  const isCarted = searchParams.get("toCart") || 0;
  const cart = useSelector(getItemInCart(isCarted));
  let {
    name,
    ratingAverage,
    ratingQuantity,
    reviews,
    sizeVariation,
    category,
    _id,
  } = product;
  const { customization, extra } = category;
  const [standardC, setStandard] = useState(
    () =>
      cart?.standard.slice() ||
      customization.map((el) => ({ _id: el._id, name: el.options[0] }))
  );
  const [extraC, setExtra] = useState(() => cart?.extra?.slice() || []);

  function handleStandardUpsert(id, element) {
    const updatedArray = standardUpsert(standardC, id, element);
    setStandard(updatedArray);
  }
  function handleExtraUpsert(id, element) {
    const updatedArray = extraUpsert(extraC, id, element, setPrice);
    setExtra(updatedArray);
  }
  ratingAverage = parseInt(ratingAverage);

  const defaultPrice = sizeVariation.find((el) => el.size === "regular").price;
  const extraPrice = extraC.reduce((sum, item) => sum + item.price, 0) || 0;

  const [price, setPrice] = useState(defaultPrice + extraPrice);
  const [sizeSt, setSize] = useState(cart?.size || "regular");

  function handlePriceAndSize(e) {
    const size = e.target.value;
    const price = sizeVariation.find((el) => el.size === size).price;
    const extraPrice = extraC.reduce((sum, item) => sum + item.price, 0) || 0;

    setPrice(price + extraPrice);
    setSize(size);
  }
  const { slug, ancestors } = category;
  function selectComponent(e) {
    setTab(e.target.value);
  }

  function handleAddToCart() {
    const foundObject = sizeVariation.find((obj) => obj.size === sizeSt);

    const productSKU = foundObject.sku;
    const newItem = {
      uuid: cart?.uuid || uuidv4(),
      _id,
      name,
      sku: productSKU,
      sizeSt,
      qty: cart?.qty || 1,
      standard: standardC,
      extra: extraC,
      unitPrice: price,
      totalPrice: price * 1,
    };

    if (isCarted) {
      updateItem({ newItem, CartID });
    } else {
      mutate({ newItem, CartID });
    }
    dispatch(addItem(newItem));
  }
  return (
    <div className="relative">
      <BreadCrumbs ancestors={ancestors} slug={slug} />
      <div className="hero bg-base-200">
        <div className="hero-content flex-col lg:flex-row lg:gap-9">
          <img
            src="https://globalassets.starbucks.com/digitalassets/products/bev/SBX20220411_ChaiLatte.jpg?impolicy=1by1_wide_topcrop_630"
            className="max-w-sm rounded-full shadow-2xl"
            alt="mout"
          />
          <div>
            <h1 className="text-5xl font-bold">{name}</h1>
            <div className="rating mt-7 flex items-center">
              {Array.from({ length: 5 }, (_el, index) => (
                <input
                  key={index}
                  type="radio"
                  name={`rating-${ratingAverage ?? 3}`}
                  className="mask mask-star-2  bg-orange-400"
                  defaultChecked={index === ratingAverage ? true : undefined}
                />
              ))}
              <span className="bg-orange-400/50 text-xs md:text-sm lg:text-md font-semibold mr-2 px-2.5 py-0.5 rounded-full  ml-3">
                {ratingQuantity}
              </span>
            </div>
            <p className="py-4">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <div className="flex m-5 ml-0 gap-9">
              {sizeVariation.map((sizeEl) => (
                <input
                  className="btn btn-circle btn-md px-4
                  bg-neutral-content/40 after:text-xl
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
            <div className="flex gap-9 justify-start items-center mt-[4rem]">
              <div className="font-bold text-4xl">{formatCurrency(price)}</div>
              <button
                onClick={handleAddToCart}
                disabled={isAdding || isUpdating}
                className="btn btn-md  btn-primary uppercase font-bold text-lg active:ring ring-primary ring-offset-base-100 ring-offset-2"
              >
                {isCarted ? "Update Item" : "Standard Buy"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="join max-w-full flex bg-base-200  justify-center m-3 overflow-scroll">
        <input
          className="join-item btn rounded-l-none"
          type="radio"
          name="options"
          value="standard"
          aria-label="Standard"
          onClick={(e) => selectComponent(e)}
          defaultChecked
        />
        <input
          className="join-item btn"
          type="radio"
          name="options"
          value="extra"
          aria-label="Additional"
          onClick={(e) => selectComponent(e)}
        />
        <input
          className="join-item btn rounded-r-none"
          type="radio"
          name="options"
          value="review"
          aria-label={`Reviews (${ratingQuantity})`}
          onClick={(e) => selectComponent(e)}
        />
      </div>

      <div className="hero bg-base-200 w-auto m-3 rounded-lg p-[4.5rem]">
        {tab === "review" && <ReviewList reviews={reviews} />}
        {tab === "standard" && (
          <CustomizationsList
            decor={customization}
            type={tab}
            cart={standardC}
            dispatch={handleStandardUpsert}
          />
        )}
        {tab === "extra" && (
          <CustomizationsList
            decor={extra}
            type={tab}
            cart={extraC}
            dispatch={handleExtraUpsert}
          />
        )}
      </div>
    </div>
  );
}
export const loader =
  (queryClient) =>
  async ({ params }) => {
    const data = await queryClient.ensureQueryData({
      queryKey: ["product", params.slug],
      queryFn: async () => getProductBySlug(params.slug),
    });
    return data;
  };

/*
  const product = {
    status: "success",
    data: {
      doc: {
        _id: "65071385d3b36a7c02fadcd0",
        name: "New York Hi!",
        sizeVariation: [
          {
            sku: "6500abb82f3ab5acbcc7ffa8",
            size: "regular",
            price: 100,
            _id: "65071385d3b36a7c02fadcd1",
          },
          {
            sku: "6500abb12f3ab5acbcc7ffa5",
            size: "small",
            price: 90,
            _id: "65071385d3b36a7c02fadcd2",
          },
          {
            sku: "6500abbd2f3ab5acbcc7ffab",
            size: "large",
            price: 50,
            _id: "65071385d3b36a7c02fadcd3",
          },
        ],
        ratingAverage: 3,
        ratingQuantity: 0,
        category: {
          _id: "650710336e8715e4c1075cf9",
          ancestors: [
            {
              slug: "cake",
              _id: "65070ebe6e8715e4c1075cf3",
              name: "Cake",
            },
          ],
          customization: [
            {
              name: "base1",
              type: "Milk",
              price: 20,
              options: ["Classic/New York", "Boomer", "Fruity"],
              _id: "650710336e8715e4c1075cfa",
            },
            {
              name: "base2",
              type: "Milk",
              price: 20,
              options: ["Your mom", "Chocolate", "Fruity"],
              _id: "650710336e8715e4c1076cfa",
            },
            {
              name: "base3",
              type: "Topping",
              options: ["Super sweet", "Nonono", "Fruity"],
              price: 20,
              _id: "650710336e8715e4c1077cfa",
            },
          ],
          extra: [
            {
              name: "Write a personalized message",
              type: "Milk",
              price: 20,
              options: ["chocolate syrup", "vanilla syrup"],
              _id: "65070ebe6e8715e4c1075cf4",
            },
            {
              name: "Toppings",
              type: "Toppings",
              options: ["chocolate chips", "hazelnut", "toblerone"],
              price: 20,
              _id: "65070ebe6e8715e4c1075cf5",
            },
            {
              name: "frosting",
              type: "Toppings",
              price: 20,
              options: ["chocolate", "vanilla", "mousse"],
              _id: "65070ebe6e8715e4c1075cf6",
            },
          ],
          slug: "cheese-cake",
        },
        images: [],
        reviews: [],
        __v: 0,
      },
    },
  };
  return product;
}*/
export default ProductItem;

/*<CustomizationsList
            decor={customization}
            type={tab}
            cart={standardC}
            dispatch={handleStandardUpsert}
          >*/
