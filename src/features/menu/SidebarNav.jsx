import React from "react";
import { NavLink } from "react-router-dom";

function SidebarNav({ origCateg, category, depth = 0 }) {
  let filteredCategory = [];
  if (depth === 0) {
    filteredCategory = category.filter((el) => el.depth.depth === depth);
  } else {
    filteredCategory = [...category];
  }
  if (category.length < 1 || filteredCategory.length < 1) {
    return null;
  }

  return (
    <>
      {filteredCategory.map((categoryEl) => (
        <li key={categoryEl.depth.parent}>
          <details open>
            <summary
              className={`${
                depth === 0
                  ? "font-bold text-xl after:text-primary after:h-3 after:w-3 text-primary capitalize"
                  : ""
              }`}
            >
              <li>
                <NavLink
                  className="capitalize"
                  end
                  to={`${categoryEl.depth.parent}`}
                >
                  {categoryEl.depth.parent}
                </NavLink>
              </li>
            </summary>
            <ul>
              {categoryEl.subcategory.map((subcategoryEl) => {
                let children = origCateg.filter(
                  (el) => el.depth._id === subcategoryEl._id
                )

                return (
                  <React.Fragment key={subcategoryEl._id}>
                    {children.length < 1 && (
                      <li key={subcategoryEl._id} className="capitalize">
                        <NavLink end to={`${subcategoryEl.name}`}>
                          {subcategoryEl.name}
                        </NavLink>
                      </li>
                    )}

                    {children.length > 0 && (
                      <SidebarNav
                        origCateg={origCateg}
                        category={children}
                        depth={depth + 1}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </ul>
          </details>
        </li>
      ))}
    </>
  );
}

export default SidebarNav;
