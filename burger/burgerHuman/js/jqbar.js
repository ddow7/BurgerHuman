/*********************************************

Author : EGrappler.com
URL    : http://www.egrappler.com
License: http://www.egrappler.com/license.

*********************************************/
(function ($) {
    $.fn.extend({
        jqbar: function (options) {
            var settings = $.extend({
                animationSpeed: 180000,
                barLength: 500,
                orientation: 'h',
                barWidth: 20,
                barColor: 'red',
                label: '&nbsp;',
                value: 100
            }, options);
			
            return this.each(function () {

                var valueLabelHeight = 0;
                var progressContainer = $(this);
				//horizon progress bar
                if (settings.orientation == 'h') {

                    progressContainer.addClass('jqbar horizontal').append('<span class="bar-label"></span><span class="bar-level-wrapper"><span class="bar-level"></span></span><span class="bar-percent"></span>');

                    var progressLabel = progressContainer.find('.bar-label').html(settings.label);
                    var progressBar = progressContainer.find('.bar-level').attr('data-value', settings.value);
                    var progressBarWrapper = progressContainer.find('.bar-level-wrapper');

                    progressBar.css({ height: settings.barWidth, width: 0, backgroundColor: settings.barColor });

                    var valueLabel = progressContainer.find('.bar-percent');
                }
                else {
				//vertical progress bar
                    progressContainer.addClass('jqbar vertical').append('<span class="bar-percent"></span><span class="bar-level-wrapper"><span class="bar-level"></span></span><span class="bar-label"></span>');

                    var progressLabel = progressContainer.find('.bar-label').html(settings.label);
                    var progressBar = progressContainer.find('.bar-level').attr('data-value', settings.value);
                    var progressBarWrapper = progressContainer.find('.bar-level-wrapper');

                    progressContainer.css('height', settings.barLength);
                    progressBar.css({ height: settings.barLength,top: settings.barLength, width: settings.barWidth, backgroundColor: settings.barColor });
                    progressBarWrapper.css({ height: settings.barLength, width: settings.barWidth });

                    var valueLabel = progressContainer.find('.bar-percent');
                    valueLabelHeight = parseInt(valueLabel.outerHeight());
                    valueLabel.css({ top: (settings.barLength - valueLabelHeight) + 'px' });
                }

                animateProgressBar(progressBar);

                function animateProgressBar(progressBar) {
					var countdown=Date.parse(sessionStorage.getItem("getTimer_c"));
					var starttime =Date.parse(sessionStorage.getItem("getTimer_f"));
					if(countdown && starttime){
						var now = new Date().getTime();
						
						var distance = countdown - now;
						var stdistance = countdown-starttime;
						var ratio = (distance / stdistance)*500;
					}
                    var level = parseInt(progressBar.attr('data-value'));
					
                    if (level > 100) {
                        level = 100;
                        alert('max value cannot exceed 100 percent');
                    }
                    var w = settings.barLength * level / 100;
					//horizon progress bar
                    if (settings.orientation == 'h') {
                        progressBar.animate({ width: w }, {
                            duration: distance,
                            step: function (currentWidth) {
                                var percent = parseInt(currentWidth / settings.barLength * 100);
                                if (isNaN(percent))
                                    percent = 0;
                                progressContainer.find('.bar-percent').html(percent + '%');
                            }
                        });
                    }
                    else {
					//vertical progress bar
						progressBar.animate({top:ratio},{
                            duration: 0,
                            step: function (currentValue) {
								
                            }
                        });

                        var h = (settings.barLength - settings.barLength * level / 100);
                        progressBar.animate({ top: h  }, {
                            duration: distance,
                            step: function (currentValue) {
                             
                            }
                        });
                        

                    }
					
                }

            });
        }
    });

})(jQuery);