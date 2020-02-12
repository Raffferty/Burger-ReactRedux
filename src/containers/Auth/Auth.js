import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.css";

import * as authActions from "../../store/actions/index";
import { connect } from "react-redux";

import { updateObject, checkValidity } from "../../shared/utility";

const auth = props => {
  const [controls, setControls] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Mail Address"
      },
      value: "",
      validation: {
        required: true,
        isEmail: true
      },
      valid: false,
      tuched: false
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password"
      },
      value: "",
      validation: {
        required: true,
        minLength: 6
      },
      valid: false,
      tuched: false
    }
  });

  const [isSignup, setIsSignup] = useState(true);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        tuched: true
      })
    });

    setControls(updatedControls);
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignup);
  };

  const swithAutnModeHandler = event => {
    setIsSignup(!isSignup);
  };

  let formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key]
    });
  }

  let form = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      tuched={formElement.config.tuched}
      shouldValidate={formElement.config.validation.required}
      invalid={!formElement.config.valid}
      changed={event => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (props.loading) {
    form = <Spinner />;
  }

  let message = null;
  if (props.error) {
    message = <p style={{ color: "red" }}>{props.error.message}</p>;
  }

  let authRedirect = null;

  if (props.isAuthenticated) {
    const hasIngredients = Object.keys(props.ingredients).some(
      ing => props.ingredients[ing] > 0
    );

    if (hasIngredients) {
      authRedirect = <Redirect to="/checkout" />;
    } else {
      authRedirect = <Redirect to="/" />;
    }
  }

  return (
    <div className={classes.Auth}>
      {authRedirect}
      {message}
      <form onSubmit={onSubmitHandler}>
        {form}
        <Button btnType="Success">{isSignup ? "SIGN-UP" : "SIGN-IN"}</Button>
      </form>
      <Button clicked={swithAutnModeHandler} btnType="Danger">
        SWITCH TO {isSignup ? "SIGN-IN" : "SIGN-UP"}
      </Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    ingredients: state.burgerBuilder.ingredients
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(authActions.auth(email, password, isSignup))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(auth);
