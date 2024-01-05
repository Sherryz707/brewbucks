import { formatCurrency } from "../../utils/helpers";

function CustomizationItems({ options, type, dispatch, cartItem }) {
  return (
    <>
      {options.map((option, index) => (
        <>
          <select
            name={`${option._id}`}
            className="select select-primary w-full max-w-xs"
            key={option._id}
            form={type}
            onChange={(e) => (
              ("targetet", e.target.selectedOptions),
              dispatch(option._id, e.target.selectedOptions[0].value)
            )}
            required={type === "standard" ? true : false}
          >
            {option.options.map((optionEl, index) =>
              type === "extra" && index === 0 ? (
                <option selected={true}>Choose {option.name}</option>
              ) : (
                <option
                  selected={
                    (Array.isArray(cartItem) &&
                      cartItem?.some(
                        (obj) => obj._id === option._id && obj.name === optionEl
                      )) ||
                    (type === "standard" && index === 0)
                  }
                  value={`${optionEl}+${option.price ? option.price : 0}`}
                  key={option._id}
                >
                  {optionEl}
                </option>
              )
            )}
          </select>
          <span className={`text-xl ${type === "extra" ? "" : "hidden"}`}>
            {formatCurrency(option.price)}
          </span>
        </>
      ))}
    </>
  );
}

export default CustomizationItems;
