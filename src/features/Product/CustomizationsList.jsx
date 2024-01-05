import CustomizationForm from "./CustomizationForm";

const getNodesByParent = (nodes) => {
  const nodesByParent = {};

  nodes.map((node) => {
    const parentNode = node.type;
    // ("THIS IS WHAT NODE LOOKS", node);
    if (!nodesByParent[parentNode]) {
      nodesByParent[parentNode] = [];
    }
    // ("THIS IS WHAT NODE LOOKS LIKE LATER", node);
    nodesByParent[parentNode].push(node);
  });

  return nodesByParent;
};

function CustomizationsList({ decor, type, dispatch, cart = {} }) {
  // ("outside nodes", decor, cart);
  const parentObj = getNodesByParent(decor);
  // ("my decor", parentObj);

  return (
    <div className="grid grid-cols-2 gap-10 mx-auto">
      {Object.entries(parentObj).map(([key, value]) => (
        <CustomizationForm
          options={value}
          optionKey={key}
          type={type}
          cartItem={cart}
          key={key}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
}

/*<CustomizationForm
            options={value}
            optionKey={key}
            option_id={key}
            type={type}
            cartItem={cart}
            key={key}
          />*/
/*<Customization
            value={value}
            key={key}
            valKey={key}
            type={type}
            cartItem={cart}
          />*/
export default CustomizationsList;
