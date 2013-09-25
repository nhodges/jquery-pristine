/**
 * jQuery Pristine v0.0.2
 *
 * Terms of Use - jQuery Pristine
 * under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 *
 * Copyright 2013 Nuri Hodges (irunbackwards). All rights reserved.
 * (http://github.com/nhodges/jquery-pristine/)
 *
 */

(function ( $ ) {
 
  $.fn.pristine = function( options ) {
 
    var
      form     = this,
      settings = $.extend({
        // settings, maybe?
      }, options),
      valid    = true;

    $('input, textarea', form).each(function() {

      var self = $(this), value = self.val();

      // validate required fields
      if ( typeof self.data('required') !== 'undefined' ) {
        if ( value == '' ) {
          valid = false;
        }
      }

      // validate data
      if ( typeof self.data('validate') !== 'undefined') {
        if ( value == '' && typeof self.data('required') == 'undefined' ) {
          return true;
        }
        var type = self.data('validate');
        switch ( true ) {
          case /email/.test(type):
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if ( ! re.test(value) ) {
              valid = false;
            }
            break;
          case /minlength/.test(type):
            var minlength = type.match(/\[(.*?)\]/g)[0].replace(/\D/g, '');
            if ( minlength !== '' ) {
              minlength = parseInt(minlength, 10);
              if ( value.length < minlength ) {
                valid = false;
              }
            }
            break;
          case /number/.test(type):
            var re = /[0-9]+/;
            if ( ! re.test(value) ) {
              valid = false;
            }
            break;
          case /url/.test(type):
            var re = /^(http|https):\/\/[^ "]+$/;
            if ( ! re.test(value) ) {
              valid = false;
            }
            break;
          default:
        }
      }

    });

    return valid;

  };
 
}( jQuery ));