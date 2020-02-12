import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSammary.css";

const checkoutSammary = props => {
  return (
    <div className={classes.CheckoutSammary}>
      <h1>We hope it tasts well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
        <Button btnType="Danger" clicked={props.checkoutCanceled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={props.checkoutContinued}>
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default checkoutSammary;
