import React , { Component } from 'react';
import axios from 'axios';
import validator from 'validator';

export default class Login extends Component{
    constructor(props) {
        super(props);
        if(this.props.auth){
            this.props.history.push('/');
        }
        this.state = {
            fields : {
                email : '',
                password : ''
            },
            errors : {}
        }
    }

    validation(callBack){
        let { fields } = this.state;
        let errors = {};
        let isValid = true;


        //Email
        if( validator.isEmpty(fields.email) ){
            isValid = false;
            errors["email"] = "Please enter the email";
        }else if(! validator.isEmail(fields.email) ){
            isValid = false;
            errors["email"] = "Please enter your email correctly.";
        }

        //Password
        if( validator.isEmpty(fields.password) ){
            isValid = false;
            errors["password"] = "Please enter the password";
        }else if(! validator.isLength( fields.password , { min : 8 , max : undefined} )){
            isValid = false;
            errors["password"] = "The password must be at least 8 characters long.";
        }

        this.setState({ errors },() => {
            return callBack(isValid);
        });
    }

    handleChange(event){
        let fields = this.state.fields;
        let target = event.target;
        fields[target.name] = target.value;

        this.setState({fields});
    }

    handleRequest(){
        const { email , password } = this.state.fields;
        let data = new FormData();
        data.append('email' , email);
        data.append('password' , password);

      axios.post( 'http://localhost:8000/api/v1/login' , { email , password } )
      .then(res => {
        localStorage.setItem("hexzm_token",res.data.data.hexzm_token);
        this.props.login();
        this.props.history.push('/');
      })
      .catch(err => console.log(err))
    }

    handleSubmit(event){
        event.preventDefault();

        this.validation((valid) => {
            if(valid) this.handleRequest()
        })
    }

    render() {
        const { email , password } = this.state.fields;
        const { errors } = this.state;
      return (
            <div className="login">
                <div className="m-t-40 card-box">
                    <div className="text-center">
                        <h4 className="text-uppercase font-bold mb-0">Sign In</h4>
                    </div>
                    <div className="p-20">
                        <form className="form-horizontal m-t-20" onSubmit={this.handleSubmit.bind(this)}>

                            <div className="form-group">
                                <div className="col-xs-12">
                                    <input className={["form-control" , errors['email'] ? 'is-invalid' : '' ].join(' ')} placeholder="Email"
                                     name="email" type="text" value={email} onChange={this.handleChange.bind(this)} />
                                     <span className="invalid-feedback" 
                                     style={{ display : errors['email'] ? 'block' : 'none' }} >{errors['email']}</span>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-xs-12">
                                    <input className={["form-control" , errors['password'] ? 'is-invalid' : '' ].join(' ')} placeholder="Password"
                                     name="password" type="password" value={password} onChange={this.handleChange.bind(this)} />
                                     <span className="invalid-feedback" 
                                     style={{ display : errors['password'] ? 'block' : 'none' }} >{errors['password']}</span>
                                </div>
                            </div>
                            <div className="form-group text-center m-t-30">
                                <div className="col-xs-12">
                                    <button className="btn btn-custom btn-bordred btn-block" type="submit">Log In</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
      )
    }
}