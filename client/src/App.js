import React , {Component} from 'react';
import { Route , Switch } from 'react-router-dom';
import axios from 'axios';
//css
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './css/style.css';

//sections Component
import Header from './components/sections/header';
import Footer from './components/sections/footer';

//pages Component 
import Home from './components/pages/home';
import About from './components/pages/about';
import Contact from './components/pages/contact';
import DetailsArticle from './components/pages/detailsArticle';
import Category from './components/pages/category';
import User from './components/pages/user';
import NoMatch from './components/pages/noMatch';
import Blog from './components/pages/blog';
import Login from './components/pages/login';
import Panel from './components/pages/panel';
import PrivateRoute from './components/privateRoute';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthonticated : true
    }

  }

  componentDidMount(){
    let apiToken = localStorage.getItem('hexzm_token');
    if(apiToken !== null){
      axios.get(`http://localhost:8000/api/v1/users?token=${apiToken}`)
      .then(res => {
        this.setState({ isAuthenticated: true})
      })
      .catch(err => {
        this.setState({ isAuthenticated: false})
      });
    }else{
          this.setState({
            isAuthonticated : false
      })
    }

  } 

  handleLogout(){
    localStorage.removeItem('token');
    this.setState({ isAuthenticated : false });
  }

  handleLogin(){
    this.setState({ isAuthenticated : true });
  }

  render() {
    return (
      <div>
        <Header auth={this.state.isAuthenticated} logout={this.handleLogout.bind(this)} />
        <div className="wrapper">
          <div className="container-fluid">
            <Switch>
              <Route path='/' exact={ true } component={Home}/>
              <Route path='/about' component={About}/>
              <Route path='/contact' component={Contact}/>
              <Route path='/article/:url' component={DetailsArticle}/>
              <Route path='/blog' component={Blog}/>
              <Route path='/category/:url' component={Category}/>
              <Route path='/user/:email' component={User}/>
              <PrivateRoute path='/panel' component={Panel} auth={this.state.isAuthonticated}/>
              <Route path="/login" render={(props) => <Login {...props} auth={this.state.isAuthonticated} login={this.handleLogin.bind(this)}/>}/>
              <Route component={NoMatch}/>
              </Switch>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }

}