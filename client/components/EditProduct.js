'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux'
import store from '../store';
import {updateProduct} from '../store';

class EditProduct extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      description: '',
      image: '',
      price: ''
    }

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

  }

  handleChange1(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleChange2(event) {
    this.setState({
      description: event.target.value
    });
  }

  handleChange3(event) {
    this.setState({
      image: event.target.value
    })
  }

  handleChange4(event) {
    this.setState({
      price: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    const productId = this.props.productId
    const history = this.props.history
    const name = this.state.name;
    const description = this.state.description;
    const image = this.state.image;
    const price = this.state.price;

    store.dispatch(updateProduct(productId, {name, description, image, price}, history));
  }

  render() {
    const {editProductError} = this.props

    return (
      <form className="color" onSubmit={this.handleSubmit}>
      {
        editProductError ? (
          <div className="alert alert-warning" role="alert">
            Sorry, only admin can edit a product!
          </div>
        ) :
        null
      }
        <fieldset>
          <legend>Edit A Product</legend>
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={this.handleChange1} />
          </div>
          <div className="form-group">
            <label>Product Description</label>
            <textarea className="form-control" rows="3" value={this.state.description} onChange={this.handleChange2}></textarea>
          </div>
          <div className="form-group">
            <label>Product Image URL</label>
            <input type="text" className="form-control" placeholder="Image URL" value={this.state.image} onChange={this.handleChange3} />
          </div>
          <div className="form-group">
            <label>Product price</label>
            <input type="text" className="form-control" placeholder="Price" value={this.state.price} onChange={this.handleChange4} />
          </div>
          <button type="submit" className="btn btn-primary done">Done</button>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  editProductError: state.editProductError
})

const EditProductContainer = connect(mapStateToProps, null)(EditProduct)

export default EditProductContainer
