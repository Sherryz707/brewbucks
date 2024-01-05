import { NavLink, useLoaderData } from "react-router-dom";

function Menu() {
  const category = useLoaderData();
  return (
    <>
        <nav className="max-w-md p-4 space-x-4 bg-base-100 rounded-box overflow-scroll">
          <ul className="flex list-none">
            {category.map((el) => (
              <li key={el}>
                <NavLink to={`category/${el}`} className="avatar active:bg-blue-500">
                  <div className=" w-40 rounded-xl">
                    <img
                      src="https://globalassets.starbucks.com/digitalassets/products/bev/SBX20220411_ChaiLatte.jpg?impolicy=1by1_wide_topcrop_630"
                      className="rounded-box"
                      alt="product-1"
                    />
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
    </>
  );
}

export default Menu;
