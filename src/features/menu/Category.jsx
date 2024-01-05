import { useLoaderData, useParams } from "react-router-dom";
import MenuItem from "./MenuItem";
import { getProductByCategory } from "../../services/apiProduct";
import { useQuery } from "@tanstack/react-query";

function Category() {
  const params = useParams();

  const initialData = useLoaderData();
  const { data: product, isLoading } = useQuery({
    queryKey: ["menuProduct", params.slug],
    queryFn: async () => await getProductByCategory(params.slug),
    initialData,
  });
  if (isLoading) {
    return <div>I am Loading</div>;
  }
  return (
    <div className="bg-base-300 py-16 md:px-10 px-2 lg:m-3 lg:rounded-xl">
      <h1 className="text-4xl capitalize font-bold text-center">
        {params.slug}
      </h1>
      <div className="divider mb-10"></div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 min-[1440px]:grid-cols-4">
        {product.map((el) => (
          <MenuItem key={el.name} product={el} />
        ))}
      </div>
    </div>
  );
}

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const data = await queryClient.ensureQueryData({
      queryKey: ["menuProduct", params.slug],
      queryFn: async () => getProductByCategory(params.slug),
    });
    return data;
  };
// export async function loader({ params }) {
//   (`finding oroducts of category:${params.slug}`);

//   const menu = {
//     status: "success",
//     results: 7,
//     data: {
//       doc: [
//         {
//           _id: "65071385d3b36a7c02fadcd0",
//           name: "New York Hi!",
//           sizeVariation: [
//             {
//               sku: "6500abb82f3ab5acbcc7ffa8",
//               size: "regular",
//               price: 100,
//               _id: "65071385d3b36a7c02fadcd1",
//             },
//             {
//               sku: "6500abb12f3ab5acbcc7ffa5",
//               size: "small",
//               price: 90,
//               _id: "65071385d3b36a7c02fadcd2",
//             },
//             {
//               sku: "6500abbd2f3ab5acbcc7ffab",
//               size: "large",
//               price: 50,
//               _id: "65071385d3b36a7c02fadcd3",
//             },
//           ],
//           ratingAverage: 4,
//           ratingQuantity: 0,
//           category: {
//             _id: "650710336e8715e4c1075cf9",
//             customization: [
//               {
//                 price: 50,
//                 name: "base",
//                 options: ["Classic/New York", "Boomer", "Fruity"],
//                 _id: "650710336e8715e4c1075cfa",
//               },
//             ],
//           },
//           images: [],
//           reviews: [],
//         },
//         {
//           _id: "650713d7d3b36a7c02fadcd7",
//           name: "Cappucino",
//           sizeVariation: [
//             {
//               sku: "6500abb82f3ab5acbcc7ffa8",
//               size: "regular",
//               price: 100,
//               _id: "650713d7d3b36a7c02fadcd8",
//             },
//             {
//               sku: "6500abb12f3ab5acbcc7ffa5",
//               size: "small",
//               price: 90,
//               _id: "650713d7d3b36a7c02fadcd9",
//             },
//             {
//               sku: "6500abbd2f3ab5acbcc7ffab",
//               size: "large",
//               price: 50,
//               _id: "650713d7d3b36a7c02fadcda",
//             },
//           ],
//           ratingAverage: 4,
//           ratingQuantity: 0,
//           category: {
//             _id: "650712c5d3b36a7c02fadcbc",
//             customization: [
//               {
//                 price: 50,
//                 customType: "Milk",
//                 name: "Milk",
//                 options: ["Heavy", "Vanilla", "Whole"],
//                 _id: "650712c5d3b36a7c02fadcbd",
//               },
//               {
//                 price: 50,
//                 customType: "Milk",
//                 name: "Steamed Hot",
//                 options: ["Warm", "Steamed Hot"],
//                 _id: "650712c5d3b36a7c02fadcbe",
//               },
//             ],
//           },
//           images: ["product-Cappucino-1694962646637-1.jpeg"],
//           reviews: [],
//         },
//         {
//           _id: "6507140dd3b36a7c02fadcdf",
//           name: "Blonde Roast",
//           sizeVariation: [
//             {
//               sku: "6500abb82f3ab5acbcc7ffa8",
//               size: "regular",
//               price: 100,
//               _id: "6507140dd3b36a7c02fadce0",
//             },
//             {
//               sku: "6500abb12f3ab5acbcc7ffa5",
//               size: "small",
//               price: 90,
//               _id: "6507140dd3b36a7c02fadce1",
//             },
//             {
//               sku: "6500abbd2f3ab5acbcc7ffab",
//               size: "large",
//               price: 50,
//               _id: "6507140dd3b36a7c02fadce2",
//             },
//           ],
//           ratingAverage: 4,
//           ratingQuantity: 0,
//           category: {
//             _id: "650711636e8715e4c1075d0e",
//             customization: [
//               {
//                 price: 50,
//                 name: "Add Espresso Roast Options",
//                 options: ["Signature", "Blonde", "Decaf"],
//                 _id: "650711636e8715e4c1075d0f",
//               },
//             ],
//           },
//           images: ["product-Blonde Roast-1694962700560-1.jpeg"],
//           reviews: [],
//         },
//         {
//           _id: "6507152ed3b36a7c02fadcf6",
//           name: "Dark Roast",
//           sizeVariation: [
//             {
//               sku: "6500abb82f3ab5acbcc7ffa8",
//               size: "regular",
//               price: 100,
//               _id: "6507152ed3b36a7c02fadcf7",
//             },
//             {
//               sku: "6500abb12f3ab5acbcc7ffa5",
//               size: "small",
//               price: 90,
//               _id: "6507152ed3b36a7c02fadcf8",
//             },
//           ],
//           ratingAverage: 4,
//           ratingQuantity: 0,
//           category: {
//             _id: "650711636e8715e4c1075d0e",
//             customization: [
//               {
//                 price: 50,
//                 name: "Add Espresso Roast Options",
//                 options: ["Signature", "Blonde", "Decaf"],
//                 _id: "650711636e8715e4c1075d0f",
//               },
//             ],
//           },
//           images: ["product-Dark Roast-1694962989835-1.jpeg"],
//           reviews: [],
//         },
//         {
//           _id: "6509eabad6926cf15b1e8427",
//           name: "Dark Test",
//           sizeVariation: [
//             {
//               sku: "6500abb82f3ab5acbcc7ffa8",
//               size: "regular",
//               price: 100,
//               _id: "6509eabad6926cf15b1e8428",
//             },
//             {
//               sku: "6500abb12f3ab5acbcc7ffa5",
//               size: "small",
//               price: 90,
//               _id: "6509eabad6926cf15b1e8429",
//             },
//           ],
//           ratingAverage: 4,
//           ratingQuantity: 0,
//           category: {
//             _id: "650710336e8715e4c1075cf9",
//             customization: [
//               {
//                 price: 50,
//                 name: "base",
//                 options: ["Classic/New York", "Chocolate", "Fruity"],
//                 _id: "650710336e8715e4c1075cfa",
//               },
//             ],
//           },
//           images: ["product-Dark Test-1695148729366-1.jpeg"],
//           reviews: [],
//         },
//         {
//           _id: "6509eb12d6926cf15b1e8441",
//           name: "Dark Test 2",
//           sizeVariation: [
//             {
//               sku: "6500abb82f3ab5acbcc7ffa8",
//               size: "regular",
//               price: 100,
//               _id: "6509eb12d6926cf15b1e8442",
//             },
//             {
//               sku: "6500abb12f3ab5acbcc7ffa5",
//               size: "small",
//               price: 90,
//               _id: "6509eb12d6926cf15b1e8443",
//             },
//           ],
//           ratingAverage: 4,
//           ratingQuantity: 0,
//           category: {
//             _id: "6509eaf7d6926cf15b1e842e",
//             customization: [
//               {
//                 customType: "Milk",
//                 name: "Milk",
//                 price: 50,
//                 options: ["Heavy", "Vanilla", "Whole"],
//                 _id: "6509eaf7d6926cf15b1e842f",
//               },
//               {
//                 customType: "Milk",
//                 name: "Steamed Hot",
//                 price: 50,
//                 options: ["Warm", "Steamed Hot"],
//                 _id: "6509eaf7d6926cf15b1e8430",
//               },
//             ],
//           },
//           images: ["product-Dark Test 2-1695148817484-1.jpeg"],
//           reviews: [],
//         },
//       ],
//     },
//   };
//   return menu;
// }

export default Category;
