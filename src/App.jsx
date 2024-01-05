import "@stripe/stripe-js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Cart from "./features/cart/Cart";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import ProductItem, {
  loader as productLoader,
} from "./features/Product/ProductItem";
import Category, { loader as categoryLoader } from "./features/menu/Category";
import MenuPage, { loader as menupageLoader } from "./features/menu/MenuPage";
import Boom, { loader as fullmenuLoader } from "./features/menu/Boom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CartTable from "./features/cart/CartTable";
import SuccessError from "./ui/SuccessError";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
    },
  },
});
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/menu",
        element: <MenuPage />,
        loader: menupageLoader(queryClient),
        errorElement: <Error />,
        children: [
          {
            path: ":slug",
            element: <Category />,
            loader: categoryLoader(queryClient),
          },
          {
            path: "",
            index: true,
            element: <Boom />,
            loader: fullmenuLoader(queryClient),
          },
        ],
      },
      {
        path: "/product/:slug",
        element: <ProductItem />,
        loader: productLoader(queryClient),
      },
      {
        path: "/cart",
        element: <Cart />,
        errorElement: <Error />,
        children: [
          {
            path: "",
            index: true,
            element: <CartTable />,
          },
        ],
      },
      {
        path: "/category/:slug",
        element: <Category />,
        errorElement: <Error />,
        loader: categoryLoader,
      },
      {
        path: "/status",
        element: <SuccessError />,
      },
    ],
  },
]);
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App;
