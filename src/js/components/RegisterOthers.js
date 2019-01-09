import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from "./Header";
import store from "../store";
import { addUserToOrder, getCompanyInfo, addCurrentUserToOrder } from '../actions/orderActions';
import { goToAddMoreMembers } from '../actions/userActions';
@connect ((store) => {
  return {    
    user: store.user,
    company: store.order.Company.Login,
    admin: store.user.isAdmin,
    isConfirmed: store.user.isConfirmed,
    registeredUsers: store.order.Company.CompanyRegistrations,
    eventName: store.event.EventName,
    unregisteredUsers: store.user.UnregisteredUsers
  }
})

export default class RegisterOthers extends Component {  
  // componentWillMount() {
  //   this.props.dispatch(getCompanyInfo(this.props.company));
  // }  
  constructor(props) {
    super(props);
    this.state = {
      PromoCode: ""    
    }
  }
  changeInputTextState(e){
    // console.log("state", this.state);
    // console.log(e.currentTarget.attributes.name.value, e.currentTarget.value);
    this.setState({...this.state, [e.currentTarget.attributes.name.value]: e.currentTarget.value });
  }
  render() {    
    return (
      <React.Fragment>
      <Header />
      <div className="container">
        <div className="row">
          <article className="col-12">
            <div className="row">
              <div className="col-4">
                <img className="img-fluid" src="/images/registration-asia-2019.png" alt="" />
              </div>
              <div className="col-8 d-flex align-items-center flex-wrap">
                <div>
                  <h2 className="h2 font-weight-light text-dark">{this.props.eventName} Registrations</h2>
                  {(this.props.admin===true) &&  
                    <div className="mb-3">
                      <button type="button" onClick={()=>this.props.dispatch(goToAddMoreMembers(this.props.history))} className="btn btn-primary px-5">Next Step: Register for {this.props.eventName}</button>
                    </div>
                  }  
                  {this.props.isConfirmed===false && this.props.admin === false &&
                    <div>
                      <div className="mb-3 form-group">
                        <label htmlFor="PromoCode">If you have a Promo Code please fill it before continuing with registration.</label>
                        <input type="text" id="PromoCode" className="form-control rounded-0 col-4" name="PromoCode" onChange={(e) => this.changeInputTextState(e)} /> 
                      </div>
                      <div className="mb-3">
                        <button type="button" onClick={()=>this.props.dispatch(addUserToOrder(this.props.history,{"RegistrationForEmail": this.props.user.Email, "PromoCode": this.state.PromoCode},"/review-register"))} className="btn btn-primary px-5">Next Step: Register yourself for {this.props.eventName}</button>
                      </div>                      
                    </div>
                  }
                  {this.props.registeredUsers.length > 0 && 
                    <div>
                      <button type="button" onClick={() => this.props.history.push("/see-registrations")} className="btn btn-primary px-5">See existing registrations</button>
                    </div>
                  }
                  
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
      </React.Fragment>
     )
  }
}