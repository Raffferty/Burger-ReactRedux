import React, { useEffect } from "react";
import { connect } from "react-redux";

import Spinner from "../../components/UI/Spinner/Spinner";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

import * as actions from "../../store/actions/index";

const ordersComponent = props => {
  const { onFetchOrders } = props;

  useEffect(() => {
    onFetchOrders(props.token, props.userId);
  }, [onFetchOrders]);

  let orders = null;

  if (props.loading) {
    orders = <Spinner />;
  } else {
    orders = <h1 style={{ textAlign: "center" }}>No orders</h1>;

    if (props.orders.length !== 0) {
      orders = props.orders.map(el => {
        const price = el["price"];
        const ingredients = el["ingredients"];

        const ingrArr = [];
        for (let ingr in ingredients) {
          ingrArr.push([ingr, ingredients[ingr]]);
        }

        return <Order key={el["id"]} ingredients={ingrArr} price={price} />;
      });
    }
  }

  return <div>{orders}</div>;
};

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ordersComponent, axios));
