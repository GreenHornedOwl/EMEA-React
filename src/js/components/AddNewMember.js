import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './Header';
import Email from './Email';
import CountrySelect from "./CountrySelect";
import {addNewMember} from "../actions/userActions"
@connect ((store) => {
  return {
    domain: store.user.Domain,
    company: store.order.Company,   
    countries: store.user.CountryList, 
    users: store.order.Company.Persons,
    error: store.user.error   
  }
})
class AddNewMember extends Component {
  constructor(props) {
    super(props);
    this.state = {       
      email: "",
      password: "",
      name: "",
      address: "",
      city: "",
      zip: "",
      country: "",
      company: props.company.Name,
      companyNo: props.company.CompanyNo,
      phone: "",
      terms: false,
      alert: false,
      userAlert: false   
    };
  }  
  getEmail(email) {
    this.setState({alert: false});
    this.setState({email});
    // let userExists = this.props.users.filter(x=>x.Email === email).length > 0;
    // if (userExists) {
    //   this.setState({userAlert: true});
    // } else {
    //   this.setState({userAlert: false});
    // }
    
  }
  getPassword(password) {
    this.setState({password});
    this.setState({alert: false});
  }
  getName(name) {
    this.setState({name});
    this.setState({alert: false});
  }
  getAddress(address){
    this.setState({address});
    this.setState({alert: false});
  } 
  getCity(city) {
    this.setState({city});
    this.setState({alert: false});
  }
  getZip(zip) {
    this.setState({zip});
    this.setState({alert: false});
  }
  getCountry(country) {
    this.setState({country});
    this.setState({alert: false});
  }
  getCompany(company) {
    this.setState({company});
    this.setState({alert: false});
  }
  setTerms(e) {    
    let terms = !this.state.terms;
    console.log(terms);
    this.setState({terms});
    this.setState({alert: false});
  }
  getPhone(phone) {
    this.setState({phone});
    this.setState({alert: false});
  }
  handleSend(e) {
    let canSend = this.state.email !== "" && this.state.password !== "" && this.state.name !== "" && this.state.address !== "" && this.state.city !== "" && this.state.country !== "" && this.state.zip !== "" && this.state.company !== "" && this.state.terms === true && this.state.userAlert === false;   
    if (canSend) {
      //this.props.dispatch(addNewMember(this.props.history, this.state));
      
      let obj = {
          "Login": this.state.email,
          "Password": this.state.password,
          "Name": this.state.name,
          "Address": this.state.address,
          "Address2": "",
          "City": this.state.city,
          "CountryCode": this.state.country,
          "PhoneNo": this.state.phone,
          "PostCode": this.state.zip,
          "CompanyNo": this.state.companyNo
      }      
      this.props.dispatch(addNewMember(this.props.history, obj));
    } else {
      this.setState({alert: true});      
    }
  }
  render() {
    let alertClass = this.state.alert === true ? "alert alert-danger" : "alert alert-danger d-none";
    let userAlertClass = this.state.userAlert === true ? "alert alert-danger" : "alert alert-danger d-none";
    let dynamicAlertClass = this.props.error !== "" ? "alert alert-danger" : "alert alert-danger d-none";
    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <div className="row">
            <article className="col-12">
              <div className="row">
                <div className="col-4">
                  <img className="img-fluid" src="http://registration.dotfusion.ro/RegistrationTest/images/registration2-asia2018.png" alt="" />
                </div>
                <div className="col-8 d-flex align-items-center flex-wrap">
                  <div>
                    <h2 className="h2 font-weight-light text-primary">Welcome to Directions EMEA registration process.</h2>
                    <p>Add a new user to your company.</p>
                    <p className={alertClass}>Please fill in all the fields and accept <strong>terms and conditions</strong> to continue</p>
                    <p className={userAlertClass}>User already exists.</p>
                    <p className={dynamicAlertClass}>{this.props.error}</p>
                    <div>
                      <div className="form-group">
                        <label htmlFor="Email">Email</label>
                        <Email required={true} readonly={false} domain={this.props.domain} getEmail={(email) => {this.getEmail(email)}} setValue="" />
                      </div>
                      <div className="form-group">
                          <label htmlFor="Password">Password</label>
                          <input type="email" id="Password" className="form-control" onChange={(e) => this.getPassword(e.currentTarget.value)} />                      
                          <small className="invalid-feedback">
                              Invalid password
                          </small>
                      </div>
                      <div className="form-group">
                          <label htmlFor="FullName">Full Name</label>
                          <input type="email" id="FullName" className="form-control" onChange={(e) => this.getName(e.currentTarget.value)} /> 
                      </div>
                      <div className="form-group">
                          <label htmlFor="Address">Address</label>
                          <input type="email" id="Address" className="form-control" onChange={(e) => this.getAddress(e.currentTarget.value)} /> 
                      </div>
                      <div className="form-row">
                          <div className="form-group col">
                              <label htmlFor="City">City</label>
                              <input type="email" id="City" className="form-control" onChange={(e) => this.getCity(e.currentTarget.value)} /> 
                          </div>
                          <div className="form-group col">
                              <label htmlFor="ZipCode">Zip Code</label>
                              <input type="email" id="ZipCode" className="form-control" onChange={(e) => this.getZip(e.currentTarget.value)} /> 
                          </div>
                      </div>
                      <div className="form-group">
                          <label htmlFor="Phone">Phone</label>
                          <input type="text" id="Phone" className="form-control" onChange={(e) => this.getPhone(e.currentTarget.value)}  /> 
                      </div>
                      <div className="form-group">
                          <label htmlFor="Country">Country</label>
                          <CountrySelect id="Country" firstOption="Select a country" required="true" getValue={(v) => this.getCountry(v)} options={this.props.countries} />
                      </div>
                      <div className="form-group">                      
                          <label htmlFor="Company">Company</label>
                          <input type="text" id="Company" className="form-control" defaultValue={this.props.company.Name} readOnly />                      
                      </div>
                      <div className="form-group">
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" onChange={(e)=>{this.setTerms(e)}}/>
                            
                            <p className="form-check-label" htmlFor="inlineCheckbox1" >I have read and agreed with <u data-toggle="modal" data-target="#TermsModal">Terms and Conditions</u></p>
                          </div>
                      </div>
                      <div id="TermsModal" className="modal" tabIndex="-1" role="dialog">
                        <div className="modal-dialog modal-lg" role="document"> 
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title">Terms and Conditions</h5>
                              <button type="button" type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <div>
                              <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac arcu vitae ipsum porta mollis quis nec odio. Nulla at leo ipsum. Donec luctus, leo ut convallis molestie, ipsum elit blandit ex, a commodo mauris sem vitae purus. Phasellus lorem mauris, maximus nec urna in, auctor laoreet metus. Phasellus a lacinia sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean pulvinar et magna ac hendrerit. Aliquam vitae placerat urna. Duis laoreet erat non lorem placerat, at dictum mauris posuere. Maecenas non tincidunt lectus. Mauris id elit id diam auctor varius vel id elit. Mauris ut nibh in lacus maximus hendrerit ac quis elit. Nunc nisl sem, volutpat ultrices tortor a, interdum dignissim justo.
                              </p>

                              <p>Duis tincidunt dolor nisi, nec aliquet libero tincidunt in. Morbi dictum egestas metus. Maecenas tincidunt vel sem ac porta. Etiam rhoncus sagittis facilisis. Phasellus ex turpis, feugiat eget malesuada sit amet, tincidunt nec libero. Nulla dapibus est augue, id convallis ex viverra vel. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse porta et mauris id blandit. Aliquam eu porttitor odio. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla ac eros leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
                              
                              <p>Pellentesque varius, ante sit amet placerat dignissim, nunc arcu molestie lectus, ut ornare libero nibh sagittis lorem. Aenean eu lacinia metus, vel convallis risus. Aliquam erat volutpat. Nulla non rhoncus urna. Duis nec urna vitae lacus varius tincidunt in nec elit. Etiam lacus sem, tempor rhoncus suscipit blandit, iaculis ac sapien. Aenean eu eros id tellus hendrerit ultricies quis vel erat. Donec pharetra venenatis laoreet. Integer quis sem ut magna dignissim elementum. Nullam consectetur nunc scelerisque elit varius congue. Maecenas ac iaculis massa. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum est risus, rhoncus malesuada ligula quis, semper volutpat tellus. Maecenas et purus id mauris pharetra tristique at ac sapien. Ut condimentum, risus pretium pellentesque vehicula, orci massa cursus tellus, nec elementum nisi metus interdum urna.</p>
                              </div>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <p className={alertClass}>Please fill in all the fields and accept <strong>terms and conditions</strong> to continue.</p>
                      </div>
                      <div className="form-group"> 
                          <button type="button" onClick={(e) => this.handleSend(e)} className="px-5 btn btn-primary">Create user</button>
                      </div> 
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddNewMember;