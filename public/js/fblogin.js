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

    FB.Event.subscribe('auth.authResponseChange', function(response) {
    // Here we specify what we do with the response anytime this event occurs. 
    if (response.status === 'connected') {


     
      testAPI();
    } else if (response.status === 'not_authorized') {
      // In this case, the person is logged into Facebook, but not into the app, so we call
      // FB.login() to prompt them to do so. 
      // In real-life usage, you wouldn't want to immediately prompt someone to login 
      // like this, for two reasons:
      // (1) JavaScript created popup windows are blocked by most browsers unless they 
      // result from direct interaction from people using the app (such as a mouse click)
      // (2) it is a bad experience to be continually prompted to login upon page load.
     
      FB.login();
    } else {
      // In this case, the person is not logged into Facebook, so we call the login() 
      // function to prompt them to do so. Note that at this stage there is no indication
      // of whether they are logged into the app. If they aren't then they'll see the Login
      // dialog right after they log in to Facebook. 
      // The same caveats as above apply to the FB.login() call here.
      
      FB.login();
    }
  });

  FB.getLoginStatus(function(response) {
  if (response.status === 'connected') {
      var uid = response.authResponse.userID;
      var accessToken = response.authResponse.accessToken;
    } else if (response.status === 'not_authorized') {
      alert('feck off')
    } else {
      if(!(window.location.href == ("http://" + window.location.host +"/"))){
        console.log(("http://" + window.location.host +"/"));
        console.log(window.location.href);
       // alert("adfgadfg");

        window.location.replace(("http://" + window.location.host +"/"));

      };
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

      if(!(window.location.href == ("http://" + window.location.host + "/main.html"))){
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
      console.log(user.pic);
     $("#username h2").text(user.name);

    });
  };
  function redirToLogin(){
    console.log('Hola Hombre, no access');

  };

 
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=642948909109118";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

