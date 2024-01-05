import { formatCurrency } from "../../utils/helpers";

function Customization({ value, valKey, type, cartItem }) {
  const extra = type === "standard" ? 0 : 1;
  "my values", cartItem[type], cartItem, type, extra, !extra;
  return (
    <div className="my-9">
      <div className="text-xl font-bold">{valKey}</div>
      <div className="divider after:bg-base-content/70 before:bg-base-content/70 mb-1"></div>
      {value.map((el, index) => (
        <>
          <select
            className={`select ${
              extra ? "" : "select-primary"
            } m-3 w-full max-w-xs`}
            key={value._id}
            name={valKey}
          >
            <option selected={extra} value="" id={valKey}>
              {`--Choose ${el.name}--`}
            </option>
            {el.options.map((elz, index) => (
              <option
                selected={
                  cartItem[type]?.includes(elz) ||
                  (type === "standard" ? index === 0 : false)
                }
                value={elz}
              >
                {elz}
              </option>
            ))}
          </select>
          <span className={`text-xl ${extra ? "" : "hidden"}`}>
            {formatCurrency(el.price)}
          </span>
        </>
      ))}
    </div>
  );
}

export default Customization;
