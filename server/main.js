import { Meteor } from 'meteor/meteor';
import  '../api/api.js';

Meteor.startup(() => {
	process.env.MONGO_URL = 'mongodb://agstandard:Alden3258@ds023465.mlab.com:23465/production'
  // code to run on server at startup
  // export MONGO_URL=mongodb://agstandard:Solis3232%@ds023465.mlab.com:23465/production
  // console.log('show db', process.env.MONGO_URL);
});
