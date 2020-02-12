import React from 'react';

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {lable: 'Salad', type: 'salad'},
    {lable: 'Bacon', type: 'bacon'},
    {lable: 'Cheese', type: 'cheese'},
    {lable: 'Meat', type: 'meat'}
]

const buildControls = (props) => (
    <div className = {classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        
        {controls.map(
            (el) => (
                <BuildControl 
                key = {el.lable} 
                lable = {el.lable}
                added = {() => props.ingredientAdded(el.type)}
                removed = {() => props.ingredientRemoved(el.type)}
                disabled = {props.disabled[el.type]}/>
            )
        )}

        <button 
        className = {classes.OrderButton}
        disabled = {!props.purchasable}
        onClick = {props.ordered}>{props.isAuth ? "ORDER NOW" : "SIGN-UP TO ORDER"}</button>
    </div>
);

export default buildControls;