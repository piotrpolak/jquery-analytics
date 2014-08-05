/**
 * @author Piotr Polak
 * @version 0.1
 * @date 05.08.2014
 * @url https://github.com/piotrpolak/jquery-analytics
 * @see https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide
 *
 * @example <a href="#" ga-click-event-track-multiplicity="1" data-ga-click-event-category="Videos" data-ga-click-event-action="Play" data-ga-click-event-label="Rick astley - never gonna give you up">Play</a>
 */
(function ($) {

    $.fn.analytics = function () {

        var $element = $(this);

        // Tests whether Google Analytics is present
        function testGaq() {
            // Testing whether _gaq variable is present and push is callable
            if (typeof _gaq !== 'undefined' && typeof _gaq.push === "function") {
                return true;
            }

            if (typeof console.log === "function") {
                console.log('_gaq.push is not a function. Make sure Google Analytics is initialized');
            }
            return false;
        }

        $('*[data-ga-click-event-category]', $element).on("click tap", function (event) {
            if (!testGaq()) return;

            var $clickedElement = $(this);

            // GA parameters to be read from the element
            var dataParemeters = ['ga-click-event-category', 'ga-click-event-action', 'ga-click-event-label', 'ga-click-event-value', 'ga-click-event-implicit-count'];

            // Building array of data
            var data = ['_trackEvent'];
            var skip = false;
            $.each(dataParemeters, function (index, value) {
                if (skip) {
                    return; // break
                }

                value = $clickedElement.data(value);
                if (!value) {
                    skip = true;
                    return; // continue
                }
                data.push(value);
            });

            // When multiplicity is specified and greater than zero, then the event will be sent a given number of times
            var multiplicity = $clickedElement.data('ga-click-event-track-multiplicity');
            if (multiplicity > 0) {
                multiplicity--;
                $clickedElement.data('ga-click-event-track-multiplicity', multiplicity);
                if (multiplicity == 0) {
                    $clickedElement.data('ga-click-event-track-multiplicity', -1);

                    // Remove category data
                    // TODO maybe use another variable?
                    $clickedElement.data('ga-click-event-category', null);
                    $clickedElement.removeAttr('data-ga-click-event-category');
                }
            }

            if (data.length > 1) // In case data-ga-click-event-category was there but empty
            {
                if (typeof console.log === "function") {
                    console.log('Event tracked', data);
                }

                // Pushing the event
                _gaq.push(data);
            }

        });
    }
})(jQuery);