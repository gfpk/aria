$( document ).ready(function() {
    
      var slideRotator =
    {
        init: function()
        {
            
            var initialFadeIn = 500,
             itemInterval = 6000,   
             fadeTime = 1000,
             numberOfItems = $('#slider li').length,   
             currentItem = 0;
         
            $('#slider li').eq(currentItem).animate({opacity:'1'},initialFadeIn);
  
            var sliderLoop = setInterval(function(){
                $('#slider li').eq(currentItem).animate({opacity:'0'},fadeTime);
 
                if(currentItem == numberOfItems -1){
                     currentItem = 0;
                }else{
                    currentItem++;
                }
                $('#slider li').eq(currentItem).animate({opacity:'1'},fadeTime);
  
            }, itemInterval);
        }
    };
 
    slideRotator.init();
});
