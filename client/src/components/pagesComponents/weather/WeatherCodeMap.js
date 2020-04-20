let map = new Map();

/* since the API i'm using provides very poor and ugly images, i chose to go with CSS styles instead of images,
* and in order to do that, i had to map the weather codes and set a corresponding class to each of them 
* (weather codes are basically indicative codes that tell you how the weather is).
* For example 113 is a sunny day, so i associated the sunny class with it, which return a picture of a sun,
* same for the other codes.
* you may notice some repitition, that's because there's a crap load of weather codes and only so much classes.
*/


map.set('113', 'sunny');
map.set('116', 'partlycloudy');
map.set('119', 'cloudy');
map.set('122', 'fog');
map.set('143', 'mostlycloudy');
map.set('176', 'hazy');
map.set('179', 'chancerain');
map.set('182', 'chancesnow');
map.set('185', 'chancesleet');
map.set('200', 'chanceflurries');
map.set('227', 'tstorms');
map.set('230', 'snow');
map.set('248', 'sleet');
map.set('260', 'fog');
map.set('263', 'snow');
map.set('266', 'snow');
map.set('281', 'flurries');
map.set('284', 'flurries');
map.set('293', 'rain');
map.set('296', 'rain');
map.set('299', 'rain');
map.set('302', 'rain');
map.set('305', 'rain');
map.set('308', 'sleet');
map.set('311', 'rain');
map.set('314', 'rain');
map.set('317', 'chancesleet');
map.set('320', 'sleet');
map.set('323', 'snow');
map.set('326', 'snow');
map.set('329', 'snow');
map.set('332', 'snow');
map.set('335', 'snow');
map.set('338', 'flurries');
map.set('350', 'flurries');
map.set('353', 'rain');
map.set('356', 'rain');
map.set('359', 'rain');
map.set('362', 'sleet');
map.set('365', 'sleet');
map.set('368', 'snow');
map.set('371', 'snow');
map.set('374', 'flurries');
map.set('377', 'flurries');
map.set('386', 'tstorm');
map.set('389', 'tstorm');
map.set('392', 'tstorm');
map.set('395', 'tstorm');

// export the map to be used in the Weather Card
export default map;