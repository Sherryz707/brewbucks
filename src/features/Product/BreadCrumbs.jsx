import { Link } from "react-router-dom";

function BreadCrumbs({ancestors,slug}) {
    return (
      <div className="text-md breadcrumbs p-4">
        <ul>
          {ancestors.map((el) => (
            <li key={el.slug}>
              <Link to={`/menu/${el.slug}`}>{el.slug}</Link>
            </li>
          ))}
          <li>
            <Link to={`/menu/${slug}`}>{slug}</Link>
          </li>
        </ul>
      </div>
    );
}

export default BreadCrumbs
