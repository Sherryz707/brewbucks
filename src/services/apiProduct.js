import axios from "axios";

export async function completeCart(CartID) {
  try {
    const res = await axios({
      method: "GET",
      url: `https://motionless-boa-knickers.cyclic.app/api/v1/cart/checkoutSuccess/${CartID}`,
    });

    if (res.data.status === "success") {
      return res;
    }
  } catch (err) {
    throw err.response.data.message;
  }
}
export async function checkoutStripe(CartID) {
  try {
    const res = await axios({
      method: "GET",
      url: `https://motionless-boa-knickers.cyclic.app/api/v1/cart/checkout-session/${CartID}`,
    });

    if (res.data.status === "success") {
      return res.data.session;
    }
  } catch (err) {
    throw err.response.data.message;
  }
}
export async function getCartAPI(CartID) {
  try {
    const res = await axios({
      method: "GET",
      url: `https://motionless-boa-knickers.cyclic.app/api/v1/cart/${CartID}`,
    });

    if (res.data.status === "success") {
      return res.data.data.doc;
    }
  } catch (err) {
    throw err.response.data.message;
  }
}
export async function createCart() {
  const { data, error } = await axios({
    method: "POST",
    url: "https://motionless-boa-knickers.cyclic.app/api/v1/cart",
    data: {},
  });
  if (error) {
    console.error(error);
    throw new Error("Menu could not be loaded");
  }

  return data.data.doc._id;
}
export async function addItemToCart(data) {
  try {
    const { newItem, CartID } = data;
    const {
      uuid,
      _id,
      sku,
      name,
      size,
      qty,
      standard,
      extra,
      unitPrice,
      totalPrice,
    } = newItem;
    const res = await axios({
      method: "POST",
      url: `https://motionless-boa-knickers.cyclic.app/api/v1/cart/${CartID}`,
      data: {
        uuid,
        _id,
        sku,
        name,
        size,
        qty,
        standard,
        extra,
        unitPrice,
        totalPrice,
      },
    });

    if (res.data.status === "success") {
      return res;
    }
  } catch (err) {
    throw err.response.data.message;
  }
}
export async function increaseQtyItem(data) {
  try {
    const { itemUpdate, CartID } = data;
    const { uuid, sku, new_qty, unitPrice, totalPrice } = itemUpdate;
    const res = await axios({
      method: "PATCH",
      url: `https://motionless-boa-knickers.cyclic.app/api/v1/cart/${CartID}`,
      data: {
        uuid,
        sku,
        new_qty,
        unitPrice,
        totalPrice,
      },
    });

    if (res.data.status === "success") {
      return res;
    }
  } catch (err) {
    throw err.response.data.message;
  }
}
export async function updateProductInCart(data) {
  try {
    const { newItem, CartID } = data;
    const {
      _id,
      uuid,
      name,
      sku,
      qty,
      size,
      unitPrice,
      totalPrice,
      extra,
      standard,
    } = newItem;

    const res = await axios({
      method: "PATCH",
      url: `https://motionless-boa-knickers.cyclic.app/api/v1/cart/${CartID}`,
      data: {
        _id,
        uuid,
        name,
        sku,
        qty,
        size,
        unitPrice,
        totalPrice,
        extra,
        standard,
      },
    });

    if (res.data.status === "success") {
      alert("updated");
      return res;
    }
  } catch (err) {
    throw err.response.data.message;
  }
}
export async function getProductBySlug(slug) {
  try {
    const res = await axios({
      method: "GET",
      url: `https://motionless-boa-knickers.cyclic.app/api/v1/product/${slug}`,
    });
    if (res.data.status === "success") {
      return res.data.data.doc;
    }
  } catch (err) {
    throw err.response.data.message;
  }
}
export async function deleteItem(data) {
  try {
    const { itemUpdate, CartID } = data;
    const { uuid } = itemUpdate;

    const res = await axios({
      method: "DELETE",
      url: `https://motionless-boa-knickers.cyclic.app/api/v1/cart/${CartID}`,
      data: {
        uuid,
      },
    });

    if (res.data.status === "success") {
      return res;
    }
  } catch (err) {
    throw err.response.data.message;
  }
}
export async function getProductByCategory(slug) {
  const { data, error } = await axios({
    method: "GET",
    url: `https://motionless-boa-knickers.cyclic.app/api/v1/product/category/${slug}`,
  });
  const dataz = data.data.doc;
  if (error) {
    console.error(error);
    throw new Error("Menu could not be loaded");
  }
  return dataz;
}
