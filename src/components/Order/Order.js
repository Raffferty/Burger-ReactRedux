import React from "react";

import classes from "./Order.css";

const order = props => {
  const ings = props.ingredients.map((el, index) => {
    return (
      <span
        key={index}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          border: "1px solid #ccc",
          padding: "5px",
          margin: "5px"
        }}
      >
        {el[0] + " (" + el[1] + ")"}
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ings}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
