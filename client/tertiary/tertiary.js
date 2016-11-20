import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tertiary } from '../../api/api.js';
import { Secondary } from '../../api/api.js';
import { Primary } from '../../api/api.js';

import './tertiary.html';

Template.tertiary.helpers({
	tertiary(){
		return Tertiary.find();
	}
})

Template.tertiary.events({
	'click #delete'(){
		Tertiary.remove(this._id)
	},
	'click #secondary'(){
		console.log(this._id)
    var tertiaryToMove = Tertiary.findOne({_id: this._id})
    console.log(tertiaryToMove);
    Secondary.insert(tertiaryToMove);
    Tertiary.remove(this._id);
	}
})