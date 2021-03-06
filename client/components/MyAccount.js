import React, { Component  } from 'react';
// import {  } from '../store';
// import {connect} from 'react-redux';
// import {Sidebar} from './Sidebar'
import {Grid, Row, Col, FormControl, Container} from 'react-bootstrap';
import {connect} from 'react-redux'
import { fetchOrdersForUser, fetchCart } from '../store'
import Cart from './Cart'
import EditInfo from './EditInfo'



 class MyAccount extends Component {



    constructor(props) {
        super(props)
        this.state = {
            showThis: ''
        }
        this.handleClickOrder =  this.handleClickOrder.bind(this)
        this.renderOrderHistory =  this.renderOrderHistory.bind(this)
        this.renderCart = this.renderCart.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderSomething = this.renderSomething.bind(this)
        this.renderOther = this.renderOther.bind(this)
        this.renderHi = this.renderHi.bind(this)
        this.handleClickSomething =  this.handleClickSomething.bind(this)
        this.handleClickOther =  this.handleClickOther.bind(this)
        this.handleClickHi =  this.handleClickHi.bind(this)
        this.handleClickEdit = this.handleClickEdit.bind(this)
        this.handleClickCart = this.handleClickCart.bind(this)

    }


    componentDidMount() {
        this.props.getTheCart()
        this.props.fetchOrders(this.props.user.id)
    }


    renderOrderHistory() {
        console.log('ORDERS', this.props.orders)
        function renderSingleOrder(order) {
            return (<div style={{borderTop: '5px solid blue'}}key={order.id}>
                <h3>Order progress: {order.progress}</h3>
                {/* <h3>Date you ordered: {order.date.slice(0,10)}</h3> */}
                <h3>These are the products you ordered: </h3>
                {
                    order.lineItems.map((lineItem) => {
                        return <h6 style={{display: 'inLine'}}key={lineItem.id}>{lineItem.product.name} ${lineItem.product.price}, </h6>
                    })
                }
                <h3>Total Orders: {order.lineItems.length}  Total Price: {order.totalPrice}</h3>

            </div>)
        }
        return (
            <Row className="show-grid">
            <Col xs={12} md={12}>
                <h1>Your orders</h1>
                {this.props.orders.map((order) => {
                    return renderSingleOrder(order)
                }) }
            </Col>
            </Row>
        )
    }
    renderCart() {
        console.log(this.props.cart)
        return (
            <Row className="show-grid">
            <Col xs={12} md={12}>
                <Cart cart={this.props.cart}/>
            </Col>
            </Row>
        )
    }
    renderSomething() {
        return (
            <Row className="show-grid">
            <Col xs={12} md={4}>
                <h1>THIS IS YOUR SOMETHING HISTORY BROOOOOOO!!!!</h1>
            </Col>
            <Col xs={12} md={2}>
            </Col>
            <Col xs={12} md={6}>
            </Col>
            </Row>
        )
    }
    renderEdit() {
        return (
            <Row className="show-grid">
            <Col xs={12} md={12}>
                <EditInfo />
            </Col>
            </Row>
        )
    }
    renderOther() {
        return (
            <Row className="show-grid">
            <Col xs={12} md={4}>
                <h1>THIS IS YOUR OTHERSTFF  BROOOOOOO!!!!</h1>
            </Col>
            <Col xs={12} md={2}>
            </Col>
            <Col xs={12} md={6}>
            </Col>
            </Row>
        )
    }
    renderHi() {
        return (
            <Row className="show-grid">
            <Col xs={12} md={4}>
                <h1>THIIIIIIIIIIII BROOOOOOO!!!!</h1>
            </Col>
            <Col xs={12} md={2}>
            </Col>
            <Col xs={12} md={6}>
            </Col>
            </Row>
        )
    }
    handleClickOrder(e) {
        this.setState({showThis: 'orderHistory'})
    }
    handleClickEdit() {
        this.setState({showThis: 'edit'})
    }
    handleClickCart() {
        this.setState({showThis: 'cart'})
    }
    handleClickSomething() {
        this.setState({showThis: 'something'})
    }
    handleClickOther() {
        this.setState({showThis: 'other'})
    }
    handleClickHi() {
        this.setState({showThis: 'hi'})
    }


    whatToRender() {
        if (this.state.showThis === 'orderHistory') {
            return this.renderOrderHistory()
        } else if (this.state.showThis === 'edit') {
            return this.renderEdit()
        } else if (this.state.showThis === 'cart') {
            return this.renderCart()
        } else if (this.state.showThis === 'something') {
            return this.renderSomething()
        } else if (this.state.showThis === 'other') {
            return this.renderOther()
        } else if (this.state.showThis === 'hi') {
            return this.renderHi()
        } else {
            return <h1>nothing to show</h1>
        }
    }




    render() {
        console.log('in my accout', this.props)

        const style = {
            backgroundColor: '#E3DEC1',
        }
        const orders = this.props.orders
        return (
            <div>

            <Grid style={style}>
                <Row className="show-grid">
                    <Col xs={12} md={12}>
                           <h1>My Account Page </h1>
                    </Col>
                </Row>
                <Row className="show-grid">
                    <Col style={{borderRight: '3px solid black'}} xs={12} md={2}>
                        <div style={{}}onClick={this.handleClickOrder}>
                        <h5 name='innerh5'> Order History</h5>
                        </div>
                    </Col>
                    <Col style={{borderRight: '3px solid black'}} xs={12} md={2}>
                        <div onClick={this.handleClickEdit}>
                        <h5> Edit Info</h5>
                        </div>

                    </Col>
                    <Col style={{borderRight: '3px solid black'}} xs={12} md={2}>
                        <div onClick={this.handleClickCart}>
                        <h5> Cart</h5>
                        </div>

                    </Col>
                    <Col style={{borderRight: '3px solid black'}} xs={12} md={2}>
                        <div onClick={this.handleClickSomething}>
                        <h5> Something Else</h5>
                        </div>

                    </Col>
                    <Col style={{borderRight: '3px solid black'}} xs={12} md={2}>
                    <div onClick={this.handleClickOther}>
                        <h5> Other stuff</h5>
                        </div>

                    </Col>
                    <Col style={{}} xs={12} md={2}>
                    <div onClick={this.handleClickHi}>
                        <h5> HIIII</h5>
                        </div>

                    </Col>
                </Row>
                {this.whatToRender()}

            </Grid>
            <br/>
            </div>
        )
    }
}

const mapState = state => ({
    orders: state.order,
    cart: state.cart,
    user: state.user
})

const mapDispatch = dispatch => ({
    fetchOrders(userId) {
        dispatch(fetchOrdersForUser(userId))
    },
    getTheCart() {
        dispatch(fetchCart())
    }   

})

const MyAccountContainer = connect(mapState, mapDispatch)(MyAccount)

export default MyAccountContainer


