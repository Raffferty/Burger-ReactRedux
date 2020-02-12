import React, { useState } from "react";

import axios from "../../../axios-orders";

import Spinner from "../../../components/UI/Spinner/Spinner";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";

import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

import { connect } from "react-redux";

import * as orderActions from "../../../store/actions/index";
import { updateObject, checkValidity } from "../../../shared/utility";

const contactData = props => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      tuched: false
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Street"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      tuched: false
    },
    zipcode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your postal Code"
      },
      value: "",
      validation: {
        required: true,
        isNumeric: true,
        minLength: 5,
        maxLength: 5
      },
      valid: false,
      tuched: false
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Country"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      tuched: false
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your Email"
      },
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      tuched: false
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          {
            value: "fastest",
            displayValue: "Fastest"
          },
          {
            value: "cheapest",
            displayValue: "Cheapest"
          }
        ]
      },
      validation: {
        required: false
      },
      value: "fastest",
      valid: true
    }
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = event => {
    event.preventDefault();

    const formData = {};

    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: props.ings,
      price: props.price.toFixed(2),
      orderData: formData,
      userId: props.userId
    };

    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentifier].validation
      ),
      tuched: true
    });

    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

  let formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      el: orderForm[key]
    });
  }

  let form = (
    <form onSubmit={orderHandler}>
      {" "}
      {formElementsArray.map(elObj => (
        <Input
          key={elObj.id}
          elementType={elObj.el.elementType}
          elementConfig={elObj.el.elementConfig}
          value={elObj.el.value}
          tuched={elObj.el.tuched}
          shouldValidate={elObj.el.validation.required}
          invalid={!elObj.el.valid}
          changed={event => inputChangedHandler(event, elObj.id)}
        />
      ))}
      <Button btnType="Success" disabled={!formIsValid}>
        {" "}
        ORDER
      </Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter Yor Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(orderActions.purchaseBurger(orderData, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(contactData, axios));
