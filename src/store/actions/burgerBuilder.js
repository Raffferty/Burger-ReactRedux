import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient = ingName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName,
  }
}

export const removeIngredient = ingName => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName,
  }
}

const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  }
}

const fetchIngredientFaild = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  }
}

export const initIngredients = () => {
  return dispatch => {
    axios
      .get('https://myburger-97b45.firebaseio.com/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data))
      })
      .catch(error => {
        dispatch(fetchIngredientFaild())
      })
  }
}
