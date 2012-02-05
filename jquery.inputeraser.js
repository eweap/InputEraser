/*
 * inputEraser 0.1, jQuery plugin
 *
 * Copyright(c) 2012, Jonathan Bonnefoy
 * http://www.e-weap.fr
 *
 * Description : inputEraser is a plugin to empty a text field or textarea with
 * an effect of erasing letter by letter.
 *
 * Licensed under the DBAD License
 * http://philsturgeon.co.uk/code/dbad-license
 */
(function($){

    $.fn.extend({

        //Pass the options variable to the function
        inputEraser: function(options) {

            //Set the default values:
            var defaults = {
                delay : 100,
                random: false,
                random_min: 50,
                random_max: 150
            }

            var options =  $.extend(defaults, options);

            var getRandomInt = function (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            var removeLetter = function (obj) {
                var value = obj.attr('value');
                var ln = value.length;

                if(ln == 0) {
                    clearInterval(timer_letter);
                }
                else {
                    if(options.random) {
                        var delay = getRandomInt(options.random_min, options.random_max);
                        obj.attr('value', value.substr(0, ln-1));
                        setTimeout(removeLetter, delay, obj);
                    }
                    else {
                        obj.attr('value', value.substr(0, ln-1));
                        setTimeout(removeLetter, options.delay, obj);
                    }
                }
            };

            var timer_letter;

            return this.each(function() {
                var o = options;

                setTimeout(removeLetter, 0, $(this));
            });
        }
    });

})(jQuery);