import React, { Component } from 'react'
import {connect} from 'react-redux'
import CompanySelect from "./CompanySelect"
import CountrySelect from "./CountrySelect"
import Email from "./Email"
import {registerCompany} from "../actions/userActions";
import Noty from 'noty';

@connect ((store) => {
  return { 
    companyList: store.user.CompanyList,
    companySelected: store.user.CompanyNo !== undefined ? store.user.CompanyNo : "",
    domain: store.user.Domain,
    countries: store.user.CountryList,
    admin: store.user.isAdmin   
  }
})
export default class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      address2: "",
      city: "",
      phone: "",
      country: "",
      alert: false,
      zip: "",
      companyVATNo: "",
      PTVAR: false,
      PTISV: false,
      PTVARandISV: false,
      PTMicrosoftEmployee: false,
      PartnerType: null          
    }
  }  
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):    
    if (this.props.companySelected !== prevProps.companySelected) {
      this.props.getValue(this.props.companySelected);    
    }
  }
  changeCheckboxState(e) {       
    // e.target.checked = !this.state[e.currentTarget.attributes.name.value];
    // console.log("e",e.target.checked, this.state[e.currentTarget.attributes.name.value]);
    this.setState({PTVAR: false});
    this.setState({PTISV: false});
    this.setState({PTVARandISV: false});
    this.setState({PTMicrosoftEmployee: false});
    this.setState({[e.currentTarget.attributes.name.value]: !this.state[e.currentTarget.attributes.name.value] });
    this.setState({PartnerType: e.currentTarget.attributes["data-option"].value})
  }
  getZip(zip) {
    this.setState({zip});    
  }
  getCompanyVATNo(companyVATNo) {
    this.setState({companyVATNo});    
  }
  getEmail(email) {
    this.setState({email});    
  }
  getName(name) {
    this.setState({name});    
  }
  getAddress(address){    
    this.setState({address});
  } 
  getAddress2(address2){
    this.setState({address2});
  } 
  getCity(city) {
    this.setState({city});
  }
  getPhone(phone) {
    this.setState({phone});
  }
  getCountry(country) {
    this.setState({country});
  }
  getCompany(company) {    
    if (company !== "") {
      if(company !== "newCompany") {
        this.props.getValue(company);    
      } else {
        $("#AddCompanyModal").modal("show");
      }
    }
  }
  handleSendAddress(e) {
    let canSend = this.state.name !== "" && this.state.address !== "" && this.state.city !== "" && this.state.phone !== "";   
    if (canSend) {
      // this.props.dispatch(createUser(this.props.history, this.state));    
      if (this.state.address.length > 50) {
        new Noty({
          text: "The address field can not have more than 50 characters",
          theme: 'mint',
          timeout: 3000,
          layout: "center",
          modal: true,
          type: "error"
        }).show();         
        return;
      }       
      this.props.dispatch(registerCompany(this.state));
      // this.setState({name: ""});
      // this.setState({address: ""});
      // this.setState({address2: ""});
      // this.setState({city: ""});
      // this.setState({phone: ""});
      // this.setState({zip: ""});
      // this.setState({companyVATNo: ""});
    } else {
      this.setState({alert: true});      
    }
  }


  render() {
    let alertClass = this.state.alert === true ? "alert alert-danger" : "alert alert-danger d-none";
    return (
      <div className="form-group">
        { this.props.companyList.length === 0 &&
        <p className="alert alert-primary">We could not find a company for that email domain, please <a href="#" data-toggle="modal" data-target="#AddCompanyModal"><u><strong>create one</strong></u></a></p> 
        }
        <label htmlFor="Company">Company*</label>        
       
          <CompanySelect id="Company" firstOption="Select a company" required="true" getValue={(v) => this.getCompany(v)} options={this.props.companyList} setValue={this.props.companySelected} readOnly={this.props.readOnly} />
        

        <div id="AddCompanyModal" className="modal" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Company</h5>
                  <button type="button" type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div>
                      <p className={alertClass}>Please fill in all the fields to create the company.</p>
                      <div className="form-group">
                          <label htmlFor="CompanyName">Company Name*</label>
                          <input type="text" id="CompanyName" className="form-control rounded-0"  onChange={(e) => this.getName(e.currentTarget.value)} value={this.state.name} /> 
                      </div>
                      <div className="form-group">
                        <label htmlFor="CompanyEmail">Email* (Admin User – invoice send to)</label>
                        <Email required={true} readonly={false} domain={this.props.domain} getEmail={(email) => {this.getEmail(email)}} setValue={this.props.email} />
                      </div>
                      <div className="form-group">
                          <label htmlFor="CompanyAddress">Address*</label>
                          <input type="text" id="CompanyAddress" className="form-control rounded-0" maxlength="50" onChange={(e) => this.getAddress(e.currentTarget.value)} value={this.state.address} /> 
                      </div>
                      <div className="form-group">
                          <label htmlFor="CompanyAddress2">Address2</label>
                          <input type="text" id="CompanyAddress2" className="form-control rounded-0" maxlength="50" onChange={(e) => this.getAddress2(e.currentTarget.value)} value={this.state.address2} /> 
                      </div>
                      <div className="form-group">
                          <label htmlFor="CompanyCity">City*</label>
                          <input type="text" id="CompanyCity" className="form-control rounded-0"  onChange={(e) => this.getCity(e.currentTarget.value)} value={this.state.city} /> 
                      </div>
                      <div className="form-group">
                          <label htmlFor="CompanyCountry">Country*</label>
                          <CountrySelect id="Country" firstOption="Select a country" required="true" getValue={(v) => this.getCountry(v)} options={this.props.countries}  /> 
                      </div>
                      <div className="form-group">
                          <label htmlFor="CompanyPhone">Phone*</label>
                          <input type="text" id="CompanyPhone" className="form-control rounded-0"  onChange={(e) => this.getPhone(e.currentTarget.value)} value={this.state.phone} /> 
                      </div>
                      <div className="form-group">
                          <label htmlFor="CompanyZip">Zip*</label>
                          <input type="text" id="CompanyZip" className="form-control rounded-0"  onChange={(e) => this.getZip(e.currentTarget.value)} value={this.state.zip} /> 
                      </div>
                      <div className="form-group">
                          <label htmlFor="CompanyVATNo">VAT/Company Registration Number*</label>
                          <input type="text" id="CompanyVATNo" className="form-control rounded-0"  onChange={(e) => this.getCompanyVATNo(e.currentTarget.value)} value={this.state.companyVATNo} /> 
                      </div>
                      <div className="form-group">
                        <label>Partner Type</label>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="PTVAR" id="PTVAR" data-option="VAR" checked={this.state.PTVAR} onClick={(e) => this.changeCheckboxState(e)} />
                          <label className="form-check-label" htmlFor="PTVAR">VAR</label>
                        </div> 
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="PTISV" id="PTISV" data-option="ISV" checked={this.state.PTISV} onClick={(e) => this.changeCheckboxState(e)} />
                          <label className="form-check-label" htmlFor="PTISV">ISV</label>
                        </div>    
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="PTVARandISV" id="PTVARandISV" data-option="VAR and ISV" checked={this.state.PTVARandISV} onClick={(e) => this.changeCheckboxState(e)} />
                          <label className="form-check-label" htmlFor="PTVARandISV">VAR and ISV</label>
                        </div>  
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="PTMicrosoftEmployee" id="PTMicrosoftEmployee" checked={this.state.PTMicrosoftEmployee} data-option="Microsoft Employee" onClick={(e) => this.changeCheckboxState(e)} />
                          <label className="form-check-label" htmlFor="PTMicrosoftEmployee">Microsoft Employee</label>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" type="button" className="btn btn-primary" onClick={(e)=>{this.handleSendAddress(e)}}>Save changes</button>
                  <button type="button" type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
    </div>
    );
  }
}

