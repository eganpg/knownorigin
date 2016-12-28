import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Quaternary } from '../../api/api.js';
import { Tertiary } from '../../api/api.js';
import { Secondary } from '../../api/api.js';
import { Primary } from '../../api/api.js';

import './tertiary.html';

Template.tertiary.helpers({
	tertiary(){
		return Tertiary.find({},{sort:{dateReceived: -1}});
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
	},
	'click #quaternary'(){
		var tertiaryToMove = Tertiary.findOne({_id: this._id})

		// Save a Photo of an individual package

		var cameraOptions = {
            width: 200,
            height: 200
        };
    MeteorCamera.getPicture(cameraOptions, function (error, data) {
     	if (!error) {

           // $('.photo').attr('src', data); 
           // $('.photo').attr('value', data); 

           var photo = data
       	swal({
					  title: "An input!",
					  text: "How many jars in this run",
					  type: "input",
					  showCancelButton: true,
					  closeOnConfirm: true,
					  animation: "slide-from-top",
					  inputPlaceholder: "Write something"
					},
					function(inputValue){
					  if (inputValue === false) return false;
					  
					  if (inputValue === "") {
					    swal.showInputError("You need to write something!");
					    return false
					  }
					  for(var x = 1; x <= inputValue; x++){
					  	console.log(x)
					  	Quaternary.insert({
					  		name: tertiaryToMove.name,
					  		totalBatchQuantity: inputValue,
					  		packageNumber: x,
					  		contents: tertiaryToMove,
					  		photo: photo
					  	})
				  	}
				  });	
     	}
					  // swal("success");
   	});
    
    event.preventDefault();



		
		
		
		// Quaternary.insert(tertiaryToMove);
		// Tertiary.remove(this._id);
	}
})