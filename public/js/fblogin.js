var localstorage = {
        set: function (key, value) {
            window.localStorage.setItem( key, JSON.stringify(value) );
        },
        get: function (key) {
            try {
                return JSON.parse( window.localStorage.getItem(key) );
            } catch (e) {
                return null;
            }
        }
    };


 window.fbAsyncInit = function() {
    FB.init({
      appId      : '642948909109118',
      appSecret  : 'ae7e9a2ecf83a95d4945d5d6f7fd26d2',
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });

    FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      console.log('Logged in.');

      testAPI();

    }
    else {
      console.log('Logged nidhgsr in.');
      console.log(toString(location.href));
      console.log("http://" + window.location.host);
      console.log(window.location.origin == document.URL);
      //if(!((document.url) == ("http://" + window.location.host +"/main.html "))
      //window.location.replace(("http://" + window.location.host))

      FB.login();
    }
  });
};




  


  // Load the SDK asynchronously
  (function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
  }(document));

  // Here we run a very simple test of the Graph API after login is successful. 
  // This testAPI() function is only called in those cases. 
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {


      console.log('Good to see you, ' + response.name + '.');
      console.log( ("http://" + window.location.host +"/"));
      console.log(window.location.href);
      console.log(((window.location.href) == ("http://" + window.location.host)));




      if((window.location.href == ("http://" + window.location.host))){

         $("#greet").html('<h4>Welcome, '+ response.first_name +'</h4><h5>You are being redirected...</h5> ');
          window.setTimeout(function(){
          
          window.location.replace(("http://" + window.location.host +"/main.html "))
        

        },2000);
        //window.location.replace('/main.html');

      };
      
      localstorage.set(response.id, response);
      var user = localstorage.get(response.id);
      var userPicurl = FB.api("/me/picture?width=180&height=180",  function(response) {
            $("#profilepic img").attr("src", response.data.url);
            console.log(response.data.url)
      });
      console.log(user);
    
     $("#username h2").text(user.name);
      $("#hometown").text(user.hometown.name);
      $("#loc").text(user.location.name);

    });
  };
  function redirToLogin(){
    console.log('Hola Hombre, no access');

  };

 

