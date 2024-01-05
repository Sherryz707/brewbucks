import {Outlet} from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";
import Footer from "./Footer";
import { DarkModeProvider } from "../context/DarkModeContext";
import {
  DBCARTContextProvider,
} from "../context/CartDBContext";
import Drawer from "./Drawer";
import { Toaster } from "react-hot-toast";

function AppLayout() {
  
  return (
    <DBCARTContextProvider>
      <DarkModeProvider>
        <Drawer>
          <Header />

          <main className="h-full">
            <Outlet />
          </main>
          <CartOverview />
          <Footer />
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "17px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </Drawer>
      </DarkModeProvider>
    </DBCARTContextProvider>
  )
}

export default AppLayout;
