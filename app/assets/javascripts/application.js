// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require angular
//= require jquery
//= require jquery_ujs
//= require jquery.ui.datepicker
//= require_tree .

function jqRestore(){
	
	$('.flexslider').flexslider();
	$('.seat').popover({html:true});
	$('.tool-trig').tooltip();
	$('.popover-trig').popover();
	$(".alert").addClass("in");
	$(document.body).on('hidden.bs.modal', function () {
	    $('#myModal').removeData('bs.modal')
	});

	
	var dates = [];
	var shows = [];
	var tooltips = [];
	

	$.ajax({
		url: 'http://localhost:3000/showtimes',
		type: "GET",
		dataType: "json",
		async: false,
		success: function (data) {
			
			$.each( data, function() {
				var show = 0;
				if ($.inArray(this.date, dates)== -1){
				dates.push(this.date);
				
				show = [this.showitem.name];
				shows.push(show);

			}else{shows[(dates.indexOf(this.date))].push(this.showitem.name)};
				
				
			});
		}
	});



	//console.log(dates);
	var daysWithShows = dates;
	console.log(daysWithShows);
	console.log(shows);
	
	for(var i=0; i<shows.length; i++ ){
		x = $.unique(shows[i]).join(" + ");
		tooltips.push(x);
	}
	
	


	var dateHighlight =  function (date) {
	        var d = ('0' + date.getDate()).slice(-2),
	        	y = date.getFullYear(), 
	        	m = ('0' + (date.getMonth()+1)).slice(-2);
	            
			//console.log(y + '-' + m  + '-' + d);
	            
	        for (var i = 0; i < daysWithShows.length; i++) {
	        		
	            if ($.inArray(y + '-' + m + '-' + d, daysWithShows) != -1) {
	                return [true, 'highlight', tooltips[daysWithShows.indexOf(y + '-' + m  + '-' + d)]];
	            }
	        }
	        return [true];
	    };
 

	$("#datepicker").datepicker({
	     	
		    dateFormat: 'yyyy-mm-d',
		    altField: "#search",
		    altFormat: "yy-mm-dd",
		    minDate: 0,
		    beforeShowDay: dateHighlight,
		    onSelect: function(){
		       $('#datesel').submit();},

		   /* onChangeMonthYear:function(){
			$('#datepicker td a').each(function(){
				 //var tit = $(this).closest('td').attr('title');
				 console.log(this);
				 if(typeof tit != 'undefined'){
				 	$(this).attr('title', tit)
				 }else
				 {
				 	$(this).attr('title', 'no shows');
				 }
				 $(this).closest('td').removeAttr('title');
			});	    
		$('#datepicker td a ').tooltip();}   */ 
	});

	var datepicTips = function(){
			$('#datepicker td a').each(function(){
				 var tit = $(this).closest('td').attr('title');
				 if(typeof tit != 'undefined'){
				 	$(this).attr('title', tit)
				 }else
				 {
				 	$(this).attr('title', 'no shows');
				 }
				 $(this).closest('td').removeAttr('title');
			});	    
		$('#datepicker td a ').tooltip();}
	
	datepicTips();
	$('#datepicker').click(function(){
		datepicTips();
	});

};


jqRestore();



	


	
	


 