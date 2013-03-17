jQuery(document).ready(function() {
						   
	var hash = window.location.hash.substr(1);
	var href = jQuery('li#ajax a').each(function(){
		var href = jQuery(this).attr('href');
		if(hash==href.substr(0,href.length-5)){
			var toLoad = hash+'.html #toLoad';
			jQuery('#content').load(toLoad)
		}						
	});

	jQuery("li#ajax a").click(function(){
	  var toLoad = jQuery(this).attr("href")+" #content";
    jQuery("#toLoad").fadeTo("fast",0.00001,function(){ 
        jQuery("#toLoad").load(toLoad, function(){
            jQuery("#toLoad").delay(500).fadeTo("normal",1, function(){ jQuery("#load").fadeOut("normal"); });
            MathJax.Hub.Queue(["Typeset",MathJax.Hub,"toLoad"]);
         })
     });
     jQuery("#load").remove();
     jQuery("#main").append("<span id=\"load\">LOADING...</span>");
     jQuery("#load").fadeIn("fast");

		 //Keep a hash for those browsers that push will fuck up on
		 window.location.hash = jQuery(this).attr('href').substr(0,jQuery(this).attr('href').length-5);
     //push url up.
     history.pushState(null, null, jQuery(this).attr('href'));
     jQuery('title').html(jQuery(this).attr('alt'));
    
    return false;
		
	});

});

