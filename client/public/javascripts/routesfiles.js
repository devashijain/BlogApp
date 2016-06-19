var { Router, Route, Link, IndexRoute , browserHistory } = ReactRouter;

const app = document.getElementById('app');
var MainLayout = React.createClass({
  render() {
    return (
      <div>
      <Navbar />
      {this.props.children}
      </div>
    );
  }
});

var Navbar =React.createClass({
  render(){

    return(

      <nav className="navbar navbar-inverse">
              <div className="container-fluid">
      			<div className="navbar-header">
      				<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
      				<span className="sr-only">Toggle navigation</span>
      				<span className="icon-bar"></span>
      				<span className="icon-bar"></span>
      				<span className="icon-bar"></span>
      				</button>
      				<Link to={'/home'}>Home</Link>
      			</div>
      			<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

      						<ul className="nav navbar-nav"><div>
                  {window.localStorage.getItem("username")!=null?<div>
      							<li><Link to={'/addMovies'}>Add Movies</Link></li>
      							<li><Link to={'/viewMovies'}>View Movies</Link></li>
      							<li><Link to={"/add"}>Search & Update</Link></li>
                    <li><Link to={"/logout"}>Logout</Link></li></div>
                    :<div>
      							<li><Link to={"/login"}>Sign in</Link></li>
      							<li><Link to={"/register"}>Register</Link></li>
                    <li>{window.localStorage.getItem("username")}</li></div>}
      						</div></ul>
      				</div>
      			</div>
      </nav>

  );
  }
});

var Register = React.createClass({

  getInitialState: function(){
    return {
      userData: {},
      msg : ''
    }
  },

  handleRegistrationForm : function(){
    alert($('#registrationDetail').serialize());
     $.ajax({
            url: '/users/register',
            type:'post',
            data: $('#registrationDetail').serialize(),
            success: function(data) {
              this.setState({
                userData:data,
                msg : 'Hello'
              });
            }.bind(this)
          });
  },

  render : function(){
    return(
        <div>
        {this.state.userData.username==undefined?
          <div>
        <h2 className="page-header">Register</h2>
        <div className="alert alert-danger">message</div>
<form id="registrationDetail">
   <div className="form-group">
    <label>Name</label>
    <input type="text" className="form-control" placeholder="Name" name="name"/>
  </div>
  <div className="form-group">
    <label>Username</label>
    <input type="text" className="form-control" placeholder="Username" name="username"/>
  </div>
   <div class="form-group">
    <label>Email</label>
    <input type="email" className="form-control" placeholder="Email" name="email"/>
  </div>
  <div className="form-group">
    <label>Password</label>
    <input type="password" className="form-control" placeholder="Password" name="password"/>
  </div>
  <div className="form-group">
    <label>Confirm Password</label>
    <input type="password" className="form-control" placeholder="Password" name="password2"/>
  </div>
  <button type="button"  onClick={this.handleRegistrationForm}  className="btn btn-default">Submit</button>
</form>
</div>:<div><h3>Registration Successfully...!</h3><h4>Please Login</h4><Link to={"/login"}>Sign in</Link></div>}
        </div>
    )
  }
})

var Login = React.createClass({

  getInitialState: function(){
    return {
      loginData: {},
      msg : ''
    }
  },
handleLoginAuth : function(){
   $.ajax({
          url: '/users/login',
          type:'post',
          data: $('#loginData').serialize(),
          success: function(data) {
            console.log(data.token);
            window.localStorage.setItem("username", data.user);
            console.log(data.message);
            this.setState({
              loginData:data,
              msg : 'login'
            });
          }.bind(this)
        });
},

  render : function(){
    return(
      <div>
      {this.state.loginData.message!='Authentication successful'?
        <div>
      <h2 className="page-header">Account Login</h2>
      <form id="loginData">
      <div className="form-group">
    <label>Username</label>
    <input type="text" className="form-control" name="username" placeholder="Username"/>
    </div>
    <div className="form-group">
    <label>Password</label>
    <input type="password" className="form-control" name="password" placeholder="Password"/>
    </div>
    <button type="button" onClick={this.handleLoginAuth} className="btn btn-default">Submit</button>
    </form>
      </div>:<div><h3>Hello{this.state.msg}</h3></div>}
      </div>
    );
  }
});

var Logout =  React.createClass({
  render : function(){
    return(
      <div>
      {window.localStorage.clear()}
      </div>
    )
  }

});

var MainComp = React.createClass({
  render : function(){
    return(
      <div>
      <MyComponents />
      </div>
    )
  }
})


var Home = React.createClass({
  render() {
    return (
      <div>
      <p>Hiii There..!</p>
      </div>
    );
  }
});

var MyComponents = React.createClass({

  getInitialState: function(){
    return {
      bindData: {},
      text:''
    }
  },

  propTypes : {
    title : React.PropTypes.string.isRequired
  },

  getDefaultProps : function(){
    return {
      user : "Search Movies from IMDB Website.....!" ,
      title : "Search Movies and Add into Mongo DB"
    }
  },

  render: function() {
    return(
<div>
        <div className="jumbotron well">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                <h3 id="demo">
                {this.props.title}
                </h3>
                <form>
                <input type="text" className="form-control" onChange={this.changeText} value={this.state.text} />
                <p></p>
                <input  type="button" onClick={this.onClicksDisplayMovie.bind(this,this.state.text)} className="btn btn-info btn-small form-control" value="Search"/>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>

      {this.state.bindData.Title!=undefined?<DisplayMovie results={this.state.bindData}/>:<div></div>}
      </div>
</div>
    );
  },


  onClicksDisplayMovie : function(greetings){
    this.state.text="";

    //  alert('you clicked...!   '+  greetings);
    $.ajax({
      url: '/displaymovies',
      data: 'Name='+greetings,
      type: 'post',
      success:function(data){
        this.setState({bindData:data});
        console.log(data);
      }.bind(this)
    })
  },

  changeText :function(e){
    this.setState({text: e.target.value})
  }
});

var SearchAndSave = React.createClass({

  getInitialState : function(){
    return {
      result : []
    };
  },

  render : function(){
    return (
      <div>
      <div className="jumbotron well">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
              <form>
                  <input  type="button" onClick={this.onClicks} className="btn btn-info btn-small form-control" value="click here to see movie details"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
    <DisplayMovie results={this.state.result}/>
    </div>
    </div>
    );
  },

  onClicks : function(){
    //  alert('you clicked...!   '+  greetings);
    $.ajax({
      url: '/displaymovies',
      type: 'get',
      success:function(data){
        this.setState({result:data});
        console.log(data);
      }.bind(this)
    });
  }

});

var DisplayMovie = React.createClass({

  render : function(){
    return (

      <div>

          <div className="jumbotron well">
                    <div className="container-fluid">
                      <div className="row">
            		        <div className="col-md-12">
            			         <div className="row">
            				         <div className="col-md-3">
                              <img src={this.props.results.Poster} alt={this.props.results.Title} />
            				        </div>
            				        <div className="col-md-9">
            					      <div>
                            <h2>
                            {this.props.results.Title}
                            </h2>
                            <hr/>
                            <h5>
                            Year : {this.props.results.Year}
                            </h5>
                            <h5>
                          Actors : {this.props.results.Actors}
                          </h5>
                          <h5>
                          Director : {this.props.results.Director}</h5>
            						  <h5>
                          {this.props.results.Plot}
            						  </h5>
                          <p>
                              <small>
                                  <span className="glyphicon glyphicon-calendar"></span>
                                  <span>{this.props.results.Released}</span>
                                   &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                                    <b>Ratings : <span>{this.props.results.imdbRating}</span></b>
                                    &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                                    <b>Awards : </b><span>{this.props.results.Awards}</span>
                              </small>
                          </p>
                          <AddMovie  movie_id={this.props.results.Title}/>
                          </div>
            				</div>
            			</div>
            		</div>
            	</div>
            </div>
            </div>

      </div>
    );
  }
});
var AddMovie = React.createClass ({
add:function(e){
  alert(this.props.movie_id);
  //e.preventDefault();
  $.ajax({
      url:'/addToDB/addDB',
      data:"Name="+this.props.movie_id,
      type:'post',
      dataType: 'json',
      cache: false,
      success: function(e) {
        console.log(e);
        }

      });
},
render: function (){
 return (
<form onClick={this.add}>
<button className="btn btn-danger" type="button" value={this.props.movie_id} name="movie_id">Add Movies to db</button>
</form>
);
}
});

var DisplayMovieFromDB = React.createClass({
  render : function(){
    return (

      <div>
      {
        this.props.results.map(function(result){
        return(
          <div className="jumbotron well">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-12">
                           <div className="row">
                             <div className="col-md-3">
                             <input type="checkbox" name={result._id} value={result._id} id="box"/>
                              <img src={result.Poster} alt={result.Title} />
                            </div>
                            <div className="col-md-9">
                            <div>
                            <h2>
                            {result.Title}
                            </h2>
                            <hr/>
                            <h5>
                            Year : {result.Year}
                            </h5>
                            <h5>
                          Actors : {result.Actors}
                          </h5>
                          <h5>
                          Director : {result.Director}</h5>
                          <h5>
                          {result.Plot}
                          </h5>
                          <p>
                              <small>
                                  <span className="glyphicon glyphicon-calendar"></span>
                                  <span>{result.Released}</span>
                                   &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                                    <b>Ratings : <span>{result.imdbRating}</span></b>
                                    &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
                                    <b>Awards : </b><span>{result.Awards}</span>
                              </small>
                          </p>
                        <DeleteMovie  movie_id={result._id}/>
                          </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            );
      }
    )}
      </div>
    );
  }

})

var DeleteMovie = React.createClass ({
delete:function(e){
  alert('Are you sure want to delete ?');
  //e.preventDefault();
  $.ajax({
      url:'/delete',
      data:"movie_id="+this.props.movie_id,
      type:'delete',
      dataType: 'json',
      cache: false,
      success: function(e) {
        console.log('---ajax---');
        }

      });
},
render: function (){
 return (
<form onClick={this.delete}>
<button className="btn btn-danger" type="button" value={this.props.movie_id} name="movie_id">Delete</button>
</form>
);
}
});

var ViewMovies = React.createClass({
  getInitialState : function(){
    return {
      result : []
    };
  },

  render : function(){
    return(
      <div>
      <form>
      <input type="button" value="Delete" onClick={this.selectchecked} />
      <DisplayMovieFromDB results={this.state.result}/>
      </form>
      </div>
    )
  },

selectchecked :function(){
  var checkedValues = $('input:checkbox:checked').map(function() {
     return $(this).val();
   });
  $.ajax({
    url: '/DeleteSelectedMovie',
    type: 'post',
    data : 'movieDeleteObj='+checkedValues.toArray(),
    success:function(data)
    {
      console.log(data);
      $('#box').prop('checked', false);
    }
      })

  },

  fetchMovie : function(){
    $.ajax({
      url: '/addMovie',
      type: 'get',
      success:function(data){
        this.setState({result:data});
        console.log(data);
      }.bind(this)
    });
  },

  componentDidMount : function(){
    this.fetchMovie();
    setInterval(this.fetchMovie , 1000);
  }
})







var AddMovieForm=React.createClass({
  getInitialState:function(){
    return{
      adddata:{},
      movie:"",
    message:""
    }
  },
  handleSearch: function(e){
    alert("hello");
        $.ajax({
          url: '/api/getMovieDetails',
          type:'post',
          data: $('#movie').serialize(),
          success: function(data) {
            console.log(data);
            if(data.Response!='False'){
            this.setState({
              adddata:data,
            })
          }else{
            this.setState({
              adddata:{},
              message:"Movie not found :("
            })
          }
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(err.toString());
          }.bind(this)
        });
  },
  handleAddMovie:function(e){
    $.ajax({
           url: '/api/addMovie',
           type:'post',
           data: $('#addMovie').serialize(),
           success: function(data) {
             $('input[name="movie"]').val('');
             this.setState({
             message:'New movie "'+this.state.adddata.Title+'" added successfully :)',
             adddata:{},
             })
           }.bind(this),
           error: function(xhr, status, err) {
             console.error(err.toString());
           }.bind(this)
         });
  },
  handleInputClick:function(e){
    this.setState({
      adddata:{},
      message:"Please Search a movie to add",
    })
  },
  render: function() {
    console.log(this.state.adddata.Title);
      return (
        <div>
        <div className={'container search-title'}>
          Search a movie to add
          <div className="jumbotron well">
                   <div className="container-fluid">
                     <div className="row">
                        <div className="col-md-12">
                        <div className="row">
          <form id="movie">
          <input type="text" className={'form-control input-tag'} defaultValue={this.state.movie} onClick={this.handleInputClick} name="movie" placeholder="Enter Movie"/>
          <input type="button" onClick={this.handleSearch} className={'btn btn-primary btn-lg'} value="Search"/>
          </form>
          </div>
          </div>
          </div>
          </div>
          </div>
        </div>
        <div className={'container text-center'}>
        {this.state.adddata.Title!=undefined?
        <form id="addMovie">
           <div className={'form-group row'}>
              <label for="title" className={'col-md-6 form-control-label'}>Title: </label>
              <div className={'col-md-6 title'}>
                 <input type="text" className={'form-control input-tag'} name="Title" defaultValue={this.state.adddata.Title} required="required"/>
              </div>
            </div>
           <div className={'form-group row'}>
              <label for="releasedate" className={'col-md-6 form-control-label'}>Year: </label>
              <div className={'col-md-6 date'}>
                 <input type="number" className={'form-control input-tag'} name="Year" defaultValue={this.state.adddata.Year} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="director" className={'col-md-6 form-control-label'}>Release Date: </label>
              <div className={'col-md-6 director'}>
                 <input type="text" className={'form-control input-tag'} name="Released" defaultValue={this.state.adddata.Released} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-md-6 form-control-label'}>Runtime: </label>
              <div className={'col-md-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="Runtime" defaultValue={this.state.adddata.Runtime} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-md-6 form-control-label'}>Genre: </label>
              <div className={'col-md-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="Genre" defaultValue={this.state.adddata.Genre} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-md-6 form-control-label'}>Director: </label>
              <div className={'col-md-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="Director" defaultValue={this.state.adddata.Director} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-md-6 form-control-label'}>Writer: </label>
              <div className={'col-md-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="Writer" defaultValue={this.state.adddata.Writer} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-md-6 form-control-label'}>Actors: </label>
              <div className={'col-md-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="Actors" defaultValue={this.state.adddata.Actors} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="about" className={'col-md-6 form-control-label'}>Plot: </label>
              <div className={'col-md-6 about'}>
                 <textarea className={'form-control input-tag'} name="Plot" defaultValue={this.state.adddata.Plot} rows="5" cols="10">
                 </textarea>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-md-6 form-control-label'}>Language: </label>
              <div className={'col-md-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="Language" defaultValue={this.state.adddata.Language} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-md-6 form-control-label'}>Country: </label>
              <div className={'col-md-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="Country" defaultValue={this.state.adddata.Country} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-md-6 form-control-label'}>Awards: </label>
              <div className={'col-md-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="Awards" defaultValue={this.state.adddata.Awards} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-md-6 form-control-label'}>Poster: </label>
              <div className={'col-md-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="Poster" defaultValue={this.state.adddata.Poster} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-md-6 form-control-label'}>Metascore: </label>
              <div className={'col-md-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="Metascore" defaultValue={this.state.adddata.Metascore} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-md-6 form-control-label'}>IMDB rating: </label>
              <div className={'col-md-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="imdbRating" defaultValue={this.state.adddata.imdbRating} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-md-6 form-control-label'}>IMDB Votes: </label>
              <div className={'col-md-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="imdbVotes" defaultValue={this.state.adddata.imdbVotes} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-md-6 form-control-label'}>IMDB ID: </label>
              <div className={'col-md-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="imdbID" defaultValue={this.state.adddata.imdbID} required="required"/>
              </div>
           </div>
           <div className={'form-group row'}>
              <label for="actors" className={'col-md-6 form-control-label'}>Type: </label>
              <div className={'col-md-6 actors'}>
                 <input type="text" className={'form-control input-tag'} name="Type" defaultValue={this.state.adddata.Type} required="required"/>
              </div>
           </div>
           <input type="hidden" className={'form-control input-tag'} name="Rated" defaultValue={this.state.adddata.Rated} />
           <input type="hidden" className={'form-control input-tag'} name="Response" defaultValue={this.state.adddata.Response} />
     <div className={'form-group row adbt'}>
     <div className={'col-sm-offset-4 col-md-6'}>
     <button type="button" onClick={this.handleAddMovie} className={'btn btn-primary btn-lg'}>Add Movie</button>
     </div>
     </div>
     </form> : <div><h3>{this.state.message}</h3></div>}
     </div>
      </div>
      );
    },
});




var history = ReactRouter.browserHistory;

ReactDOM.render((
  <Router history={browserHistory}>
  <Route path="/" component={MainLayout}>
    <Route path="/home" component={Home}></Route>
    <Route path="/addMovies" component={MainComp}></Route>
    <Route path="/viewMovies" component={ViewMovies}></Route>
    <Route path="/add" component={AddMovieForm}/>
     <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/logout" component={Logout} />

    </Route>
  </Router>
), app)
