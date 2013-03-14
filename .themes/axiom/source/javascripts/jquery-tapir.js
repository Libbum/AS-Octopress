(function(jQuery){
  var el;
  var settings = {};
  var methods = {
    init: function(options) {
      el = '<div id="content"><div class="article_t"></div><article role="article"><header><h1 class="entry-title">Search Results</header>';
      
      jQuery('#load').remove();
      jQuery('div#main').append('<span id="load">LOADING...</span>');
      jQuery('#load').fadeIn('fast');

      settings = {
                   token: false,
                   query_param: ''
                 };
      if (options) {
        jQuery.extend(settings, options);
      }

      if (!settings.token || settings.query_param == '') {
        return this;
      }
      var jqxhr = jQuery.getJSON('http://tapirgo.com/api/1/search.json?token=' + settings.token + '&query=' + settings.query_param + '&callback=?', function(data){
          jQuery.each(data, function(key, val) {
            var str1 = val.content;
            var str2 = str1.substr(1, 250);
            str2 = str2.substr(0, Math.min(str2.length, str2.lastIndexOf(" ")));
            
            el += '<div class="blueline" style="margin-top: 20px;"></div><h2 style="background: none;"><a href="' + val.link + '">' + val.title + '</a></h2><div class="entry-content"><div class="date">Published on: ' + (val.published_on).substr(0,10) + '</div></div><br><p>' + str2 + ' . . .</p><br><a href="' + val.link +'">Read on &rarr;</a>';
          });
          el += '</article><div class="article_b"></div>';
          showContent(el);
        })
//     .success(function() { alert("second success"); })
     .error(function(jqXHR, textStatus, errorThrown) {
               console.log("error " + textStatus);
                       console.log("incoming Text " + jqXHR.responseText);
                           })
//     .complete(function() { /*jQuery('#load').fadeOut('normal');*/ });
      
      function showContent(toLoad) {
        jQuery('#toLoad').fadeTo('fast',0.00001,loadContent);  
        function loadContent() {
          jQuery('#toLoad').html(toLoad,showNewContent());
        }   
        function showNewContent() {
          jQuery('#toLoad').delay(500).fadeTo('normal',1,hideLoader());
        }   
        function hideLoader() {
         jQuery('#load').fadeOut('normal');
        }   
      }
    return false;
    }
  };

  jQuery.fn.tapir = function(method) {
    if (methods[method]) {
      return methods[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || ! method) {
      return methods.init.apply(this, arguments);
    } else {
      jQuery.error('Method ' +  method + ' does not exist on jQuery.tapir');
    }
  };

})( jQuery );
