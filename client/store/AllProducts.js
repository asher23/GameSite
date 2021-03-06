import axios from 'axios';
import {gotAddProductErrorFromServer} from './addProductError';
import {gotEditProductErrorFromServer} from './editProductError';
import {gotDeleteProductErrorFromServer} from './deleteProductError';

// ACTION TYPES
const GOT_PRODUCTS_FROM_SERVER = 'GOT_PRODUCTS_FROM_SERVER';
const ADD_PRODUCT = 'ADD_PRODUCT';

// ACTION CREATORS
export function gotProductsFromServer(products) {
  return {
    type: GOT_PRODUCTS_FROM_SERVER,
    products
  };
}

export function addProduct(product) {
  return {
    type: ADD_PRODUCT,
    product
  };
}

const toJson = response => response.data;

// THUNK CREATORS
export function fetchProducts() {
  return function thunk(dispatch) {
    const result = products => {
      const action = gotProductsFromServer(products);
      dispatch(action);
    };
    const error = console.error.bind(console);
    return axios.get('/api/products')
    .then(toJson)
    .then(result)
    .catch(error);
  };
}

export function postProduct(product, history) {
  return function thunk(dispatch) {
    const result = product => {
      const addProductAction = addProduct(product);

      dispatch(addProductAction);

      history.push('/');
    };
    const error = error => {
      const gotAddProductErrorFromServerAction = gotAddProductErrorFromServer(error);

      dispatch(gotAddProductErrorFromServerAction);
    }

    return axios.post('/api/products', product)
    .then(toJson)
    .then(result)
    .catch(error);
  };
}

export function updateProduct(productId, product, history) {
  return function thunk(dispatch, getState) {
    const result = updatedProduct => {
      const products = getState().allProducts.map(product => (
        product.id === updatedProduct.id ? updatedProduct : product
      ));

      const gotProductsFromServerAction = gotProductsFromServer(products);

      dispatch(gotProductsFromServerAction);

      history.push('/');
    };
    const error = error => {
      const gotEditProductErrorFromServerAction = gotEditProductErrorFromServer(error);

      dispatch(gotEditProductErrorFromServerAction);
    }

    return axios.put(`/api/products/${productId}`, product)
    .then(toJson)
    .then(result)
    .catch(error);
  };
}

export function removeProduct(productId) {
  return function thunk(dispatch, getState) {
    const result = () => {
      const products = getState().allProducts.filter(product => {
        return product.id !== productId;
      });

      const gotProductsFromServerAction = gotProductsFromServer(products);

      dispatch(gotProductsFromServerAction);
    };
    const error = error => {
      const gotDeleteProductErrorFromServerAction = gotDeleteProductErrorFromServer(error);

      dispatch(gotDeleteProductErrorFromServerAction);
    }

    return axios.delete(`/api/products/${productId}`)
    .then(result)
    .catch(error);
  };
}

// REDUCER
export default function reducer(state = [], action) {
  switch (action.type) {
    case GOT_PRODUCTS_FROM_SERVER:
      return action.products;
    case ADD_PRODUCT:
      return [...state, action.product];
    default:
      return state;
  }
}