/* eslint-disable jsx-a11y/anchor-is-valid */

import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

/* eslint-disable jsx-a11y/alt-text */
function Header() {
  return (
    <div className="w-full navbar bg-base-300 py-5">
      <div className="flex-1 ">
        <div className="avatar">
          <div className="w-20 rounded-full">
            <img src="/public/starbucks.png" />
          </div>
        </div>
        <div className="hidden md:flex items-center">
          <ul className="menu menu-horizontal items-center">
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <a>Track My Order</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-none hidden md:block items-center">
        <ul className="menu menu-horizontal items-center">
          {/* Navbar menu content here */}
          <li>
            <Link className="pr-0">
              <button className="btn btn-sm btn-primary ">Sign up</button>
            </Link>
          </li>
          <li>
            <Link className="pl-4">
              <button className="btn btn-sm btn-outline">Login</button>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <DarkModeToggle />
      </div>
      <div className="flex-none md:hidden">
        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
    </div>
  );
}

export default Header;
