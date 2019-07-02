import React, {Component} from 'react';
import { browserHistory } from 'react-router'; 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import InputField from '../common/InputField';
import * as loginActions from '../../actions/loginActions';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      password: '',
      errors: ''
    }

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangePassword = (e) => {
    this.setState({ ...this.state, password: e.target.value })
  }


  onChangeEmail = (e) => {
    this.setState({ ...this.state, email: e.target.value})
  }
  

  onSubmit = (e) => {
    e.preventDefault();
    this.props.actions.login(this.state).then(() => {
      browserHistory.push('/dashboard')
    })
    .catch((err) => {
      this.setState({ ...this.state, errors: err})
    })
  }

  validateForm(){
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = !(emailRegex.test(this.state.email) && this.state.password.length);
    return isValid;
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        {this.state.errors === '' ? '' : <div className="alert alert-danger">{this.state.errors}</div>}
        <InputField name="Email" onChange={this.onChangeEmail} />
        <InputField name="Password" onChange={this.onChangePassword}  />
        
        <input className="btn btn-primary btn-lg" type="submit" disabled={this.validateForm()} value="login"/>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginActions, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(LoginForm);
