jQuery(document).ready(function() {
						   
	var hash = window.location.hash.substr(1);
	var href = jQuery('li#ajax a').each(function(){
		var href = jQuery(this).attr('href');
		if(hash==href.substr(0,href.length-5)){
			var toLoad = hash+'.html #toLoad';
			jQuery('#content').load(toLoad)
		}						
	});

	jQuery('li#ajax a').click(function(){
		var toLoad = jQuery(this).attr('href')+' #toLoad';
		jQuery('#toLoad').fadeTo('fast',0.00001,loadContent);
		jQuery('#load').remove();
		jQuery('div#main').append('<span id="load">LOADING...</span>');
		jQuery('#load').fadeIn('fast');
		//Keep a hash for those browsers that push will fuck up on
		window.location.hash = jQuery(this).attr('href').substr(0,jQuery(this).attr('href').length-5);
    //push url up.
    history.pushState(null, null, jQuery(this).attr('href'));
    jQuery('title').html(jQuery(this).attr('alt'));
    function loadContent() {
			jQuery('#toLoad').load(toLoad,showNewContent())
		}
		function showNewContent() {
			jQuery('#toLoad').delay(500).fadeTo('normal',1,hideLoader());
		}
		function hideLoader() {
			jQuery('#load').fadeOut('normal');
		}
		return false;
		
	});

	jQuery('a.ajax').click(function(){
		
		var toLoad = jQuery(this).attr('href')+' #toLoad';
		jQuery('#toLoad').fadeTo('fast',0.00001,loadContent);
		jQuery('#load').remove();
		jQuery('div#main').append('<span id="load">LOADING...</span>');
		jQuery('#load').fadeIn('fast');
		//Keep a hash for those browsers that push will fuck up on
    window.location.hash = jQuery(this).attr('href').substr(0,jQuery(this).attr('href').length-5);
    //push url up.
    history.pushState(null, null, jQuery(this).attr('href'));
    jQuery('title').html(jQuery(this).attr('alt'));
    function loadContent() {
			jQuery('#toLoad').load(toLoad,showNewContent())
		}
		function showNewContent() {
			jQuery('#toLoad').delay(500).fadeTo('normal',1,hideLoader());
		}
		function hideLoader() {
			jQuery('#load').fadeOut('normal');
		}
		return false;
	});


});

