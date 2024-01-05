import axios from "axios";

export async function getMenu() {
  const { data, error } = await axios({
    method: "GET",
    url: "https://motionless-boa-knickers.cyclic.app/api/v1/category/menu",
  });
  const dataz = data.data.doc;
  if (error) {
    console.error(error);
    throw new Error("Menu could not be loaded");
  }
  return dataz;
}

export async function getFullView() {
  const { data, error } = await axios({
    method: "GET",
    url: "https://motionless-boa-knickers.cyclic.app/api/v1/category/fullview",
  });
  const dataz = data.data.doc;
  if (error) {
    console.error(error);
    throw new Error("Menu could not be loaded");
  }
  return dataz;
}
