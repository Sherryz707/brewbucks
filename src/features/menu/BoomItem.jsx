import { Link } from "react-router-dom";

function BoomItem({ category }) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold capitalize text-primary">
        {category.depth.parent}
      </h2>
      <div className="divider"></div>
      <Link
        to={`/menu/${category.depth.parent}`}
        className="avatar flex justify-start items-center gap-3 my-3"
      >
        <div className="w-24 rounded-full">
          <img
            src="https://globalassets.starbucks.com/digitalassets/products/bev/SBX20220411_ChaiLatte.jpg?impolicy=1by1_wide_topcrop_630"
            alt="pictureof"
          />
        </div>
        <span className="text-lg font-semibold capitalize">
          {category.depth.parent}
        </span>
      </Link>
      {category.subcategory.map((subcategoryEl) => (
        <Link
          to={`/menu/${subcategoryEl.name}`}
          className="avatar flex justify-start items-center gap-3 my-3"
        >
          <div className="w-24 rounded-full">
            <img
              src="https://globalassets.starbucks.com/digitalassets/products/bev/SBX20220411_ChaiLatte.jpg?impolicy=1by1_wide_topcrop_630"
              alt={subcategoryEl.name}
            />
          </div>
          <span className="text-lg font-semibold capitalize">
            {subcategoryEl.name}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default BoomItem;
