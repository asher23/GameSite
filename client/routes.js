import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'

import {Main, Login, Signup, UserHome, WholePageSingle, AllProducts, SingleProductContainer, MyAccount, AddProduct, EditProduct, Addreviewform} from './components'

import {me, fetchCart} from './store'
// import MyAccount from './MyAccount'

/**
 * COMPONENT
 */

class Routes extends Component {
  constructor(props){
    super(props)
  }
  componentDidMount () {
    this.props.loadInitialData()
    this.props.getTheCart()
  }

  calculateAvgReview(){
    if(this.props.reviews.length > 0){
        let totalSum = this.props.reviews.reduce((accum, curr, i) => {return accum + curr.stars}, 0);
        let reviewAvg = totalSum / this.props.reviews.length;
        console.log('test', totalSum, this.props.reviews.length)
        var stars = '';
        for (var i = 0; i < reviewAvg; i++) {
            stars+= ' ☆'
        }
        console.log(stars)
        return stars;
    } else{
        return '';
    }
}

  render () {
    let stars = this.calculateAvgReview;
    const {isLoggedIn} = this.props
    return (
      <Router history={history}>
        <Main >
          <Switch>
            {/* Routes placed here are available to all visitors */}
            {/* <Route exact path='/' component={AllProducts} /> */}
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route exact path='/addreview/:id' component={Addreviewform} />
            <Route exact path='/singleproduct/:id' component={SingleProductContainer} />
            <Route path='/myaccount' component={MyAccount} />

            <Route exact path='/' component={AllProducts} />
            <Route path="/product/add" render={
              (routeProps) => <AddProduct history={routeProps.history} />
            } />
            <Route path='/products/:productId/edit' render={
              (routeProps) => <EditProduct productId={routeProps.match.params.productId} history={routeProps.history} />
            } />
            <Route path='/' component={AllProducts} />
            {
              isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path='/home' component={UserHome} />
                  <Route path='/account' component={MyAccount} />
                </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={AllProducts} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

    /**
     * CONTAINER
     */
    const mapState = (state) => {
      return {
        // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
        // Otherwise, state.user will be an empty object, and state.user.id will be falsey
        isLoggedIn: !!state.user.id
      }
    }

    const mapDispatch = (dispatch) => {
      return {
        loadInitialData () {
          dispatch(me())
        },
        getTheCart() {
          dispatch(fetchCart())
        }

      }
    }

    export default connect(mapState, mapDispatch)(Routes)

    /**
     * PROP TYPES
     */
    Routes.propTypes = {
      loadInitialData: PropTypes.func.isRequired,
      isLoggedIn: PropTypes.bool.isRequired
    }
