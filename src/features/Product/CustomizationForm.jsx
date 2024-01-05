import { formatCurrency } from "../../utils/helpers";

function CustomizationForm({ options, optionKey, type, dispatch, cartItem }) {
  
  return (
    <div>
      <div className="text-xl lg:text-3xl font-bold capitalize">
        {optionKey}
      </div>
      <div className="divider after:bg-base-content/70 before:bg-base-content/70 mb-1"></div>
      {options.map((option, index) => (
        <div
          key={`${option._id}+${option.name}+${option.Key}`}
          className="flex gap-5 items-center"
        >
          <select
            name={`${option._id}${option.name}${option.Key}`}
            className="select select-primary max-w-full select-md w-[16rem] lg:w-[25rem] my-3"
            key={`${option._id}+${option.name}+${option.Key}`}
            form={type}
            onChange={(e) => (
              dispatch(option._id, e.target.selectedOptions[0].value)
            )}
          >
            {option.options.map((optionEl, index) =>
              type === "extra" && index === 0 ? (
                <option
                  selected={true}
                  key={`${option._id}+${optionEl}+${index}`}
                >
                  Choose {option.name}
                </option>
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
                  key={`${option._id}+${optionEl}${index}`}
                >
                  {optionEl}
                </option>
              )
            )}
          </select>
          <span
            className={`text-2xl ${
              type === "extra" ? "" : "hidden"
            } text-primary font-semibold`}
          >
            {formatCurrency(option.price)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default CustomizationForm;
