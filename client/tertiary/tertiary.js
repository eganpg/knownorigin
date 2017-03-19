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

	// Print the qr code

  'click canvas'(event, instance){
    console.log()
    var data = document.getElementById(this._id).childNodes[0];; //attempt to save base64 string to server using this var  
    console.log(data);
    var dataUrl = data.toDataURL();
    console.log("id",this._id);
    
    
    var windowContent = '<!DOCTYPE html>';
  
    windowContent += '<html>'
    windowContent += '<body>'
    windowContent += '<img src="' + dataUrl + '">';
    windowContent += '<p style="width: 75px; font-size:6px;">'+this.name+'</p>'
    windowContent += '<p style="width: 75px; font-size:6px;">'+this._id.substring(0,4)+'</p>'
    windowContent += '<p style="width: 75px; font-size:6px;">'+this.dateReceived +'</p>'
    windowContent += '</body>';
    windowContent += '</html>';
    
    var printWin = window.open('','','width=840,height=760');
    printWin.document.open();
    printWin.document.write(windowContent);
    printWin.document.close();
    printWin.focus();
    printWin.print();
    printWin.close();
  },

	
	// Creates a qrcode containing the _id corresponding to the unique instance of the ingredient

  'click .createQr'(event, instance){
    var id = String(this._id);
    // console.log(id)
    // Generate the QR Code Here
   $('#'+this._id).qrcode({width: 64,height: 64,text: id});
  },

	'click #delete'(){
		 Meteor.call('deleteTertiary', this._id, function(err, response){
      if(err){
        sweetAlert('404 error.')
      }

      console.log('response', response)
    })
		
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
			  		// photo: photo,
			  		user: Meteor.user(),
						userId: Meteor.userId()
			  	}, function(error, result){ 
						// alert('complete'); 
						console.log(result);

					});
		  	}
		  	// Meteor.call('postCase', tertiaryToMove.name, tertiaryToMove._id, inputValue, function(err,response) {
	    //         if(err) {
	    //           Session.set('serverDataResponse', "Error:" + err.reason);
	    //           return;
	    //         }
	    //         console.log('response', response)
	    //       });


		  });	
 	
					  
   	// });
    
    // event.preventDefault();
	}
})

Template.tertiarydisplay.helpers({
	tertiary(){
		return Tertiary.find({},{sort:{dateReceived: -1}});
	}
})