import React, { useState } from "react";
import Aux from "../Auxilliary/Auxiliary";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

import { connect } from "react-redux";

const layout = props => {
  const [SideDrawerVisability, setSideDrawerVisability] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerVisability(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawerVisability(!SideDrawerVisability);
  };

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={SideDrawerVisability}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(layout);
