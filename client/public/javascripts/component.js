var React=require('react');
var ReactDOM=require('react-dom');
var actions=require("./Actions.js");
var store=require("./store");
var Navi = require('react-router').Navigation;
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;
var IndexRoute=require('react-router').IndexRoute;
var browserHistory = require('react-router').browserHistory;
var Reflux=require('reflux');

const app = document.getElementById('app');

var MainComp = React.createClass ({

  render(){
    return(
      <div>
      <Navbar/>
      {this.props.children}
      </div>
    )
  }
});

var Navbar =React.createClass({
  componentDidMount : function(){
    $('#temp').hide();
  },
  render(){
    return(
      <nav className="navbar navbar-default">
      <div className="container-fluid">
      <div className="navbar-header">
         <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
           <span className="sr-only">Toggle navigation</span>
           <span className="icon-bar"></span>
           <span className="icon-bar"></span>
           <span className="icon-bar"></span>
         </button>
         {window.localStorage.getItem('username')==null?
         <Link to={"/HomeForStranger"} className="navbar-brand">For You</Link>
       :<Link to={"/HomeForRegisterUser"} className="navbar-brand">For You</Link>
     }

        </div>
      			<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                {
                  window.localStorage.getItem('username')==null?
                  <ul className="nav navbar-nav navbar-right">
                    <li><Link to={"/login"}>Sign in</Link></li>
      							<li><Link to={"/register"}>Register</Link></li>
                  </ul>
                  :
                  <ul className="nav navbar-nav navbar-right">
                    <li><Link to={"/CreateBlog"}>Write a Blog</Link></li>
                    <li><Link to={"/logout"}>Logout</Link></li>
                  </ul>
                }
      				</div>
      			</div>
      </nav>
      );
  }
});

var HomeForRegisterUser = React.createClass({
  mixins :[
    Reflux.listenTo(store,"onStore")
  ],
  getInitialState: function(){
    return {
      result : []
    }
  },
  onStore : function(data){
    console.log("in onSotre");
    console.log(data);
    this.setState({result:data})
  },
  fetchAllBlogs : function(){
    actions.fetchAllBlogsFromDB();
  },
  componentDidMount : function(){
    this.fetchAllBlogs();
    setInterval(this.fetchAllBlogs , 1000);
  },
  render : function(){
    return(
      <div>
      {
        this.state.result.map(function(result){
        return(
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-8">
                <div className="jumbotron">
                      <h5>{result.Username}</h5>
                      <span>{result.Timing}</span>
                      <h2>{result.Title}</h2>
                      <figure>
                          <img src={"images/"+result.Images} alt={result.Title} />
                          <figcaption>{result.Caption}</figcaption>
                      </figure>
                      <p><strong>Note:</strong>{result.Description}</p>
                      <ButtonClick results={result}/>
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)}
      </div>
    );
  }
});



var HomeForStranger = React.createClass({
  mixins :[
    Reflux.listenTo(store,"onStore")
  ],
  getInitialState: function(){
    return {
      result : []
    }
  },
  onStore : function(data){
    console.log("in onSotre");
    console.log(data);
    this.setState({result:data})
  },
  fetchAllBlogs : function(){
    actions.fetchAllBlogsFromDB();
  },
  componentDidMount : function(){
    this.fetchAllBlogs();
    setInterval(this.fetchAllBlogs , 1000);
  },
  render : function(){
    return(
      <div>
      {
        this.state.result.map(function(result){
        return(
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-8">
                <div className="jumbotron">
                      <h5>{result.Username}</h5>
                      <span>{result.Timing}</span>
                      <h2>{result.Title}</h2>
                      <figure>
                          <img src={"images/"+result.Images} alt={result.Title} />
                          <figcaption>{result.Caption}</figcaption>
                      </figure>
                      <p><strong>Note:</strong>{result.Description}</p>
                      <span className="glyphicon glyphicon-thumbs-up">{result.Likes}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)}
      </div>
    );
  }
});

var ButtonClick = React.createClass({
  buttonClick : function(){
    $('#userNameForLike').val(window.localStorage.getItem('username'));
    $('#blogLike').val(true);
  var Title= $('#blogTitle').val(this.props.results.Title);
    console.log(Title);
    var temp= $('#Liked').serialize();
    console.log(temp);
    if(temp){
    actions.likedBlog(temp);
    }
  },

  render : function(){
    return(
      <div>
      <form onClick={this.buttonClick} id="Liked">
      <input type="hidden" id="blogTitle" name="BlogTitle"/>
      <input type="hidden" id="userNameForLike" name="Username"/>
      <input type="hidden" id="blogLike" name="Like" />
      <button id="LikedButton" type="button" className="btn btn-info" >Like</button>
      <span className="glyphicon glyphicon-thumbs-up">{this.props.results.Likes}</span>
      </form>
      </div>
    );
  }
});

var CreateBlog = React.createClass({
  mixins :[
    Reflux.listenTo(store,"onStore")
  ],
  getInitialState: function(){
    return {
      msg : null
    }
  },
  onStore : function(data){
    this.setState({msg:data})
  },
  handleBlogForm : function(){
    var txt = "";
    $('#uname').val(window.localStorage.getItem('username'));
    $('#date').val(Date());
    var x = document.getElementById("img");
    if('files' in x){
      var file = x.files[0];
      if('name' in file){
        $('#imgName').val(file.name);
      }
    }

    var temp = $('#BlogDetails').serialize();
    console.log(temp);
    actions.addBlogToDB(temp);
  },

  render : function(){
    return(
      <div>
      {this.state.msg==null?
        <form id="BlogDetails">
                <div className="title">Create your Blog</div>
                <input type="hidden" id="uname" name="username"/>
                <input type="text"  placeholder="Blog Title" name="blogName"/>
                <input type="file" id="img" placeholder="Choose Image" />
                <input type="hidden" id="imgName" name="image" />
                <input type="text"  placeholder="Say Something Incredible about Image" name="captions"/>
                <textarea rows="5" name="descriptions" id="comment" placeholder="Type Interesting so People can read it"></textarea>
                <input type="hidden" id="date" name="DateNtime"/>
                <input type="number"  placeholder="Likes" name="Likes"/>
                <button type="button"  onClick={this.handleBlogForm}  className="btn btn-primary btn-block">Submit</button>
        </form>
        :<div><p>Blog added Successfully...!</p></div>}
      </div>
    );
  }
});

var Logout = React.createClass({
  mixins :[
    Reflux.listenTo(store,"onStore")
  ],
  onStore : function(){
    browserHistory.push('/');
  },
componentDidMount : function(){
  this.logOut();
},

logOut : function(){
  actions.logOut();
},
  render : function(){
    return(
      <div>LogOut Successfully</div>
    )
  }
});

var Register = React.createClass({

  mixins : [  Reflux.listenTo(store,"onStore")],
  componentDidMount : function(){
    $('#temp').hide();
  },
  getInitialState: function(){
    return {
      username: null,
      msg : null
    }
  },
onStore : function(data){
  this.setState({
    username :data.username,
    msg:data.msg

  });
},
  handleRegistrationForm : function(){
    console.log("in die");
    var value = $('#registrationDetail').serialize();
    console.log(value);
    actions.handleRegistrationForm(value);
  },

  render : function(){
    return(<div>
      {this.state.username==null?
      <div className="container">
       <div class="title">Register</div>
      <form id="registrationDetail">
              <div className="form-group">
              <input type="text" className="form-control" placeholder="Name" name="name"/>
               </div>
               <div className="form-group">
               <input type="text" className="form-control" placeholder="Username" name="username"/>
                </div>
                <div className="form-group">
                <input type="email" className="form-control" placeholder="Email" name="email"/>
                 </div>
                 <div className="form-group">
                 <input type="password" className="form-control" placeholder="Password" name="password"/>
                  </div>
               <div className="form-group">
               <input type="password" className="form-control" placeholder="Confirm Password" name="password2"/>
                </div>
                <button type="button"  onClick={this.handleRegistrationForm}  className="btn btn-primary btn-block">Submit</button>
                </form>
              </div>:<div>Registration Successful..!</div>}</div>
    )
  }
});

var Login = React.createClass({
  mixins :[
    Reflux.listenTo(store,"onStore")
  ],

  onStore : function(data){
    this.setState({
    loginData:data.username,
    msg : data.msg
  });
console.log(data.username);
  window.localStorage.setItem("username", data.username);
  this.loginSuccess();
},

loginSuccess : function(){
  browserHistory.push('/');
},

  getInitialState: function(){
    return {
      loginData: null,
      msg : null
    }
  },

handleLoginAuth : function(){
  var value = $('#loginData').serialize();
  console.log(value);
  actions.handleLoginAuth(value);
},

  render : function(){
    return(
      <div className="container">
       <div class="title">Login</div>
      <form id="loginData">
              <div className="form-group">
                <input className="form-control" name="username" placeholder="Enter a User Name..." type="text" />
               </div>
               <div className="form-group">
                  <input className="form-control" name="password" placeholder="Enter a Password..." type="password" />
                </div>
                <input className="btn btn-primary btn-block" onClick={this.handleLoginAuth} type="button" value="Login" />
                </form>
              </div>
    );
  }
});

ReactDOM.render((
  <Router history={browserHistory}>
      <Route path="/" component={MainComp}>
        <Route path="/register" component={Register} />
        <Route path="/HomeForStranger" component={HomeForStranger} />
        <Route path="/HomeForRegisterUser" component={HomeForRegisterUser} />
        <Route path="/CreateBlog" component={CreateBlog} />
        <Route path="/login" component={Login} />
        <Route path="/Navbar" component={Navbar} />
        <Route path="/logout" component={Logout} />
    </Route>
  </Router>
), app)
