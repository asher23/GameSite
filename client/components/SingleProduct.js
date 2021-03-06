
import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {Grid, Row, Checkbox, Col, FormControl, ControlLabel, FormGroup} from 'react-bootstrap';
import store, {removeProduct} from '../store'
import Form from './Form.js'

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

export default class AllProducts extends Component {

    constructor(props) {
        super(props)

        this.state = {
            // price: this.props.product.price
        }
        // this.handleClick = this.handleClick.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this);

    }

    calculateAvgReview(){
        let totalSum = this.props.reviews.reduce((accum, curr, i) => {return accum + curr.stars}, 0);
        let reviewAvg = totalSum / this.props.reviews.length;
        console.log('test', totalSum, this.props.reviews.length)
        var stars = '';
        for (var i = 0; i < reviewAvg; i++) {
            stars+= ' ☆'
        }
        console.log(stars)
        return stars;
    }
    

    deleteProduct(productId) {
        store.dispatch(removeProduct(productId));
    }

    render() {
        const style = {
            backgroundColor: '#222930',
            color: '#E9E9E9',
            border: '3px solid #4EB1BA'
        }

        const product = this.props.product
        const stars = this.calculateAvgReview();
        
        return (
            <div>
            <Grid style={style}>
                <Row className="show-grid">
                    <Col xs={12} md={6}>
                        <h1 style={{display: 'inline', marginRight: '30px'}}>{product.name} </h1>
                        <h3 style={{display: 'inline', marginRight: '30px'}}>${product.price}</h3>



                    </Col>
                    <Col xs={12} md={6}>
                        <h3 style={{color: 'yellow'}}>Product Rating: {stars}</h3>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={12} md={4}>
                        <img src={product.image}/>
                    </Col>
                    <Col xs={12} md={2}>
                        <div key={product.id}>
                            <Link to={'/singleproduct/' + product.id}>Buy Now</Link>
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <p>{product.description}</p>
                    </Col>
                    <Col xs={12}>
                        <Link className="btn btn-info gutter" to={`/products/${product.id}/edit`} role="button">Edit</Link>
                        <button type="button" className="btn btn-info p-2" onClick={() => this.deleteProduct(product.id)}>Delete</button>
                    </Col>
                </Row>
            </Grid>
            <br/>
            </div>
        )
    }
}
