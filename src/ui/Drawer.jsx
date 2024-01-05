import { Link } from "react-router-dom";

function Drawer({children}) {
    return (
      <div className="drawer drawer-end">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {children}
        </div>

        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <div className="menu py-[5rem] px-[2.75rem] w-80 min-h-full bg-base-200 flex flex-col items-center">
            <Link to="/menu" className="btn btn-outline btn-primary">
              Go to Menu
            </Link>
            <div className="divider"></div>
            <div className="flex">
              <Link to="#" className="pr-0">
                <button className="btn btn-sm btn-primary ">Sign up</button>
              </Link>
              <Link to="#" className="pl-4">
                <button className="btn btn-sm btn-outline">Login</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Drawer
