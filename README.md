# jQuery Analytics

Google Analytics event tracking defined in HTML made easy

## Possible HTML element attributes

| Name          						    |            | Explanation
| ------------------------------------------|:-----------|:-----------------------------------------------------------------------------------------------------------------------:|
| data-ga-click-event-category      		| COMPULSORY | Event category (example Videos)
| data-ga-click-event-action       			| optional   | Event action (example Play)
| data--click-event-label					| optional   | Event label  (example Rick astley - never gonna give you up)
| data-ga-click-event-value					| optional   | Event value (example, number of seconds)
| data-ga-click-event-implicit-count		| optional   | Implicit count
| data-ga-click-event-track-multiplicity	| optional   | Specifies how many times the event should be pushed for repeating actions - default 0 meaning every click will be tracked

More information: https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide

## Example

```
<a href="#" ga-click-event-track-multiplicity="1" data-ga-click-event-category="Videos" data-ga-click-event-action="Play" data-ga-click-event-label="Rick astley - never gonna give you up">Play</a>

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