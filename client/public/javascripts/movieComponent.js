var MainComp = React.createClass({

  getInitialState : function(){
    return {
      result : []
    };
  },
  
  render : function(){
    return(
      <div>
      <MyComponents />
      <DisplayMovie results={this.state.result}/>
            </div>
    )
  },

  fetchMovie : function(){
    console.log("abc");
    $.ajax({
      url: '/addmovies',
      type: 'get',
      success:function(data){
        this.setState({result:data});
        console.log(data);
      }.bind(this)
    });
  },

  componentDidMount : function(){
    this.fetchMovie();
    setInterval(this.fetchMovie , this.props.pollInterval);
  }

})

var DisplayMovie = React.createClass({

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
                              <img src={result.Poster} alt={result.Title} />
            				        </div>
            				        <div className="col-md-9">
            					      <div>
                            <h2>
                            {result.Title}
                            </h2>
                            <hr/>
                            <h5>
                            {result.Year}
                            </h5>
                            <h5>
                          {result.Actors}
                          </h5>
                          <h5>{result.Director}</h5>
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
});

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

  var MyComponents = React.createClass({

    getInitialState: function(){
      return {
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
                  <input  type="button" onClick={this.onClicks.bind(this,this.state.text)} className="btn btn-info btn-small form-control" value="Search"/>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

      );
    },


    onClicks : function(greetings){
      this.state.text="";

      //  alert('you clicked...!   '+  greetings);
      $.ajax({
        url: '/addmovies',
        data: 'Name='+greetings,
        type: 'post',
        success:function(data){
          console.log(data);
        }
      })
    },

    changeText :function(e){
      this.setState({text: e.target.value})
    }
  });

  ReactDOM.render(
    <div>
    <MainComp pollInterval={2000}/>
    </div>,
    document.getElementById('content')
  );
