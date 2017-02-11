import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'
import  '../api/api.js';
import { Primary } from '../api/api.js'
import { Secondary } from '../api/api.js';
import { Tertiary } from '../api/api.js';
// import './test.jpg'
// import  'client/primary/primary.js';

Meteor.startup(() => {
	process.env.MONGO_URL = 'mongodb://agstandard:Alden3258@ds023465.mlab.com:23465/production'
  // code to run on server at startup

 //  process.env.MOBILE_DDP_URL = 'https://knownorigin.eu.meteorapp.com';
	// process.env.MOBILE_ROOT_URL = 'https://knownorigin.eu.meteorapp.com';
  // export MONGO_URL=mongodb://agstandard:Solis3232%@ds023465.mlab.com:23465/production
  // console.log('show db', process.env.MONGO_URL);

  // Meteor.methods({
  //       nutritionix: function () {

  //       		console.log('server')
  //           this.unblock();
  //           return Meteor.http.call("GET", "https://trackapi.nutritionix.com/v2/search/instant?query=grilled cheese");
  //       }
  //   });

  Meteor.methods({
    'createPlayer': function(){
        console.log("Hello world - twiiter follow");
    },
    'postTwitter': function(name, photo, status, hashtag){
    	console.log('name', name);
    	console.log('photo', photo);
    	console.log('data', status);
    	console.log('Post this to twitter');
    	var T = new Twit({
			    consumer_key:         'DYJWnJVtiDBFs65hMYPAMDoyg'
			  , consumer_secret:      'fpqVsYoeI6flvL90W9zBu8v0ui9hl9UcBLc4hj4uuEyhYZYwJq'
			  , access_token:         '3258045090-rXMjMJ4pbwJuIYCbPY0dNR3IsJl7oL8rLDU2n0w'
			  , access_token_secret:  'QWLEgYpJa8F7RtDCFr7PY89AvvFffA9gYNXJVQulNwh4Z'
			})

			//
			// post a tweet with media
			//

			photo = photo.substring(photo.indexOf(","));

			// first we must post the media to Twitter
			T.post('media/upload', { media_data: photo }, function (err, data, response) {
				console.log('data', data)
			  // now we can reference the media and post a tweet (media will attach to the tweet)
			  var mediaIdStr = data.media_id_string

			  console.log('mediaID', mediaIdStr);
			  var params = { status: 'We just roasted batch # '+ status._id.substring(0,5) + ' - ' + status.name + '. Follow us for real time production updates! '+ hashtag , media_ids: [mediaIdStr] }

			  T.post('statuses/update', params, function (err, data, response) {
			    console.log(data)
			  })
			})

			//
			//  tweet 'hello world!'
			//
			// T.post('statuses/update', { status: 'We just roasted batch # '+ status._id.substring(0,5) + ' - ' + data.name + '. Follow us for real time production updates! '+ hashtag }, function(err, data, response) {
			//   console.log(data)
			// })
    },
    'postCase': function(name, id, number){
    	console.log('name', name);
    	console.log('number', number);
    	var T = new Twit({
			    consumer_key:         'DYJWnJVtiDBFs65hMYPAMDoyg'
			  , consumer_secret:      'fpqVsYoeI6flvL90W9zBu8v0ui9hl9UcBLc4hj4uuEyhYZYwJq'
			  , access_token:         '3258045090-rXMjMJ4pbwJuIYCbPY0dNR3IsJl7oL8rLDU2n0w'
			  , access_token_secret:  'QWLEgYpJa8F7RtDCFr7PY89AvvFffA9gYNXJVQulNwh4Z'
			})

			//
			//  tweet 'hello world!'
			//
			T.post('statuses/update', { status: 'We just packaged batch # '+ id.substring(0,5) + ' - ' + name + ' into ' + number + ' cases. Follow us for real time production updates!' }, function(err, data, response) {
			  console.log(data)
			})
    },
    'deletePrimary': function(id){
    	Primary.remove(id);
    },
    'deleteSecondary': function(id){
    	Secondary.remove(id);
    },
    'deleteTertiary': function(id){
    	Tertiary.remove(id);
    }
});
});
