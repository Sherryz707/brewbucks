import { useMutation } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { addItemToCart } from "../services/apiProduct";

export function prepareItem({sizeVariation,category,_id,name,sizeSt,price}) {
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
    size: sizeSt,
    qty: 1,
    standard: standardArr,
    extra: [],
    unitPrice: price,
    totalPrice: price * 1,
    };
    
    return newItem;
}
