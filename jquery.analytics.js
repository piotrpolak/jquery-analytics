/**
 * @author Piotr Polak <piotr (*) polak * ro>
 * @version 0.1.2
 * @date 13.04.2015
 * @license MIT
 * @url https://github.com/piotrpolak/jquery-analytics
 * @see https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide
 *
 * @example <button data-ga-click-event-category="Button click">Button</button>
 * @example <a href="#" data-ga-click-event-category="Videos" data-ga-click-event-action="Play" data-ga-click-event-label="Rick astley - never gonna give you up" ga-click-event-track-multiplicity="1">Play</a>
 */
(function ($) {

    $.fn.analytics = function () {

        var $element = $(this);

        // Tests whether Google Analytics is present
        function testGaq() {
            // Testing whether ga variable is present and is callable (Universal Analytics)
            if (typeof ga === "function") {
                return true;
            }

            // Testing whether _gaq variable is present and push is callable (deprecated ga.js library)
            if (typeof _gaq !== 'undefined' && typeof _gaq.push === "function") {
                return true;
            }

            return false;
        }

        // Sends the requested event
        function sendEvent(data) {
            if (typeof ga === "function") {
                return ga.apply(null, ['send', 'event'].concat(data));
            }

            if (typeof _gaq !== 'undefined' && typeof _gaq.push === "function") {
                return _gaq.push(['_trackEvent'].concat(data));
            }
        }
        
        // Adding click and tap event listeners to selected elements
        // At least data-ga-click-event-category attribute must be defined
        $('*[data-ga-click-event-category]', $element).on("click tap", function (event) {

            // Checking whether there is GA initialized
            if (!testGaq())
            {
                if (typeof console !== 'undefined' && typeof console.log === "function") {
                    console.log('Neither ga nor _gaq.push is a function. Make sure Google Analytics is initialized');
                }
                return;
            }

            var $clickedElement = $(this);

            // GA parameters to be read from the element
            var dataParameters = ['ga-click-event-category', 'ga-click-event-action', 'ga-click-event-label', 'ga-click-event-value'];

            // Data array initialization
            var data = [];
            // Used for breaking the loop
            var skip = false;

            // Walking trough the list of allowed parameters
            $.each(dataParameters, function (index, value) {
                if (skip) {
                    return; // break
                }

                value = $clickedElement.data(value);
                if (!value) {
                    // If there is no value it makes no sense to walk trough the array anymore
                    skip = true;
                    return; // break
                }
                data.push(value);
            });

            // When multiplicity is specified and greater than zero, then the event will be sent a given number of times
            var multiplicity = $clickedElement.data('ga-click-event-track-multiplicity');
            // Only if the initial multiplicity was greater than 0 the following condition will be true
            // By default multiplicity is equal to 0 or undefined so the event will be tracked multiple times
            if (multiplicity > 0) {
                multiplicity--;
                $clickedElement.data('ga-click-event-track-multiplicity', multiplicity);
                if (multiplicity == 0) {
                    $clickedElement.data('ga-click-event-track-multiplicity', -1);

                    // Remove category data thus prevent the event to be reported
                    $clickedElement.data('ga-click-event-category', null);
                    $clickedElement.removeAttr('data-ga-click-event-category');
                }
            }

            // In case data-ga-click-event-category was there but empty
            if (data.length > 1)
            {
                if (typeof console !== 'undefined' && typeof console.log === "function") {
                    console.log('GA event tracked', data);
                }

                // Pushing the event
                sendEvent(data);
            }

        });
    }
})(jQuery);
