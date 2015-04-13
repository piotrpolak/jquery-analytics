# jQuery Analytics

Google Analytics event tracking defined in HTML made easy. The plugin allows one to define Google Analitics events data using HTML tag attributes.

## Possible HTML element attributes

| Name          						    |            | Explanation                                                                                                 | Example
| ------------------------------------------|:-----------|:------------------------------------------------------------------------------------------------------------|:--------------------------------------------------:|
| data-ga-click-event-category      		| COMPULSORY | [Category](https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide#Categories)  | Videos
| data-ga-click-event-action       			| optional   | [Action](https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide#Actions)       | Play
| data-click-event-label					| optional   | [Label](https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide#Labels)         | Rick astley - never gonna give you up
| data-ga-click-event-value					| optional   | [Value](https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide#Values)         | 3 (number of seconds)
| data-ga-click-event-track-multiplicity	| optional   | Specifies how many times the event should be pushed for repeating actions - default 0 meaning every click will be tracked | 1

More information: https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide

## Examples

## Push event on every click
```html
<!-- When clicked, a new "Button click" event will be pushed -->
<button data-ga-click-event-category="Button click">Button</button>
```

## Push event on the first click
```html
<!-- When clicked, a new "Button click" event will be pushed -->
<button data-ga-click-event-category="Button click" ga-click-event-track-multiplicity="1">Button</button>
```

### A complete example

```html
<a href="#" data-ga-click-event-category="Videos" data-ga-click-event-action="Play" data-ga-click-event-label="Rick astley - never gonna give you up" ga-click-event-track-multiplicity="1">Play</a>

<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>

<script type="text/javascript">
$(document).ready(function()
{
	$('body').analytics();
});
</script>

<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'YOUR-ACCOUNT']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>
```
