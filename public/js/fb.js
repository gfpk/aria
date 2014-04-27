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
      cookie     : false, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });

    FB.Event.subscribe('auth.authResponseChange', function(response) {
    // Here we specify what we do with the response anytime this event occurs. 
    if (response.status === 'connected') {

        var user = localstorage.get(response.id);
        console.log(user);

    };
    
    
  
  });

};

