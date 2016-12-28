import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.login.onCreated(function loginOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.login.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  user(){
  	console.log(Meteor.user())
  }
});

Template.baseTemplate.helpers({
	user(){
		console.log(Meteor.userId())
    
		if(Meteor.userId() == 'wivtT3idLr5Go3eqv'){
			return true;
		}
		else{
			return false;
		}
	}
})

Template.login.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
    console.log(Meteor.userId())
    // console.log(Meteor.users)
    console.log(Meteor.user())
  },
});
