import { useState } from "react";

function Tabs({ratingQuantity,setTab}) {
    function selectComponent(e) {
      setTab(e.target.value);
    }
    return (
      <div className="join max-w-full flex bg-base-200  justify-center m-3 overflow-scroll">
        <input
          className="join-item btn rounded-l-none"
          type="radio"
          name="options"
          value="standard"
          aria-label="Standard"
          onClick={(e) => selectComponent(e)}
          defaultChecked
        />
        <input
          className="join-item btn"
          type="radio"
          name="options"
          value="extra"
          aria-label="Additional"
          onClick={(e) => selectComponent(e)}
        />
        <input
          className="join-item btn rounded-r-none"
          type="radio"
          name="options"
          value="review"
          aria-label={`Reviews (${ratingQuantity})`}
          onClick={(e) => selectComponent(e)}
        />
      </div>
    );
}

export default Tabs
