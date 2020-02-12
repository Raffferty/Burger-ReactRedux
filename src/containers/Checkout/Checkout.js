import React from "react";
import { Route, Redirect } from "react-router-dom";

import CheckoutSammary from "../../components/Order/CheckoutSammary/CheckoutSammary";
import ContactData from "./ContactData/ContactData";

import { connect } from "react-redux";

const checkOut = props => {
  const checkoutCanceledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

  let summary = <Redirect to="/" />;
  if (props.ings) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;

    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSammary
          ingredients={props.ings}
          checkoutCanceled={checkoutCanceledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />

        <Route
          path={props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
  return summary;
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(checkOut);
