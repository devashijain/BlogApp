var Reflux = require('reflux');
var Component = require('./Actions');

var store = Reflux.createStore({
    listenables: Component,
data2:{
    username : null,
    msg : null
},
bindData:{},
    onHandleRegistrationForm : function(value){
      console.log("hu");
      $.ajax({
             url: '/users/register',
             type:'post',
             data: value,
             success: function(data) {
               console.log("in side ajax");
                     console.log(data);
               this.data2.username = data.username;
               this.data2.msg='Successfully registration';
               console.log(this.data2.username);
               console.log(this.data2.msg);
              this.trigger(this.data2);
            }.bind(this)
           });
    },

    onHandleLoginAuth : function(value){
    $.ajax({
           url: '/users/login',
           type:'post',
           data: value,
           success: function(data1) {
             console.log(data1.token);
             this.data2.username = data1.user;
             this.data2.msg='Login registration';
             console.log(this.data2.username);
             console.log(this.data2.msg);
             this.trigger(this.data2);
           }.bind(this)
         });
       },
       onLogOut : function(){
         window.localStorage.clear();
         this.trigger();
       },
       onAddBlogToDB : function(value){
         console.log("in store");
         console.log(value);
         $.ajax({
                url: '/Blog/addBlog',
                type:'post',
                data: value,
                success: function(data1) {
                  console.log(data1);
                  this.trigger(data1);
                }.bind(this)
              });
       },
       onFetchAllBlogsFromDB : function(){
         $.ajax({
           url: '/Blog/fetchBlog',
           type: 'get',
           success : function(data){
             console.log(data);
             this.trigger(data);
           }.bind(this)
         })
       },
       onLikedBlog : function(value){
         $.ajax({
           url:'/Like/setLike',
           type : 'post',
           data : value,
           success : function(data){
             console.log(data);
           }
         })
       }
  });
module.exports =store;
