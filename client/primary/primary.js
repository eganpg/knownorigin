import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Primary } from '../../api/api.js';

import './primary.html';



Template.primarylistview.helpers({
  primaryList() {
  	console.log(Primary.findOne());
    return Primary.find({},{sort:{dateReceived: -1}});
  },
  
});
Session.set('showupdate', false)
Template.update.helpers({
	showupdate(){

  	return Session.get('showupdate')
  	console.log(Session.get('showupdate'));
  },
  value(){
  	return Primary.findOne({_id : Session.get('update')})
  }
})

Template.primarylistview.events({
	// Delete a existing primary

  'click #delete'(event, instance) {
  	Primary.remove(this._id)
  },

  // Creates a qrcode containing the _id corresponding to the unique instance of the ingredient

	'click .createQr'(event, instance){
    var id = String(this._id);
    console.log(id)
    // Generate the QR Code Here
   $('#'+this._id).qrcode({width: 64,height: 64,text: id});
  },

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
    windowContent += '<p style="width: 50px; font-size:10px;">'+this.name+'</p>'
    // windowContent += '<p>'+this.batchNumber+'</p>'
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

  // This shows the update form for each of the primarys

  'click #update'(){
  	console.log(this._id);
  	Session.set('update', this._id);
  	Session.set('showupdate', true);
  }
})

Template.primarylistview.rendered=function() {
	
}

Template.primary.onRendered(function() {
	$('#my-datepicker').datepicker();
  this.autorun(function () {
    if (GoogleMaps.loaded()) {
      $("#origin").geocomplete().bind("geocode:result", function(event, result){
    console.log(result);
  });;
    }
  });
});



Template.primary.events({

// Create a new primary
	
  'click #create'(event, instance) {
  	var name = document.getElementById("name").value;
  	console.log(name);
  	var date = document.getElementById("my-datepicker").value;
  	console.log(date);
  	var origin = document.getElementById("origin").value;
  	console.log(origin);
  	var lotnumber = document.getElementById("lotnumber").value;
  	console.log(lotnumber);
  	var description = document.getElementById("description").value;
  	console.log(description);
  	var photo = document.getElementById("photo").getAttribute('src');
 		// for some reason the photo won't save without removing the last character
  	// photo = photo.substring(0, photo.length - 1);
  	console.log(photo)
    Primary.insert({
    	name: name,
    	dateReceived: new Date(),
    	lotNumber: lotnumber,
    	expirationDate: date,
    	placeOfOrigin: origin,
    	description: description,
    	
    	// climate: climate,
    	// heatLevel: heatLevel,
    	// farmName: farmNamem,
    	// growerName: growerName,
    	photo: photo
 
    },
    function(error, result){
      // or try function(error, result) and still get nothing 
      // console.log('result: ' + result);
      if(error){
      	alert(error);
      }
      console.log('error: ' + error);
      console.log('_id: ' + result); //this._id doesn't work either
      document.getElementById("name").value = "";
	  	document.getElementById("my-datepicker").value = "";
	  	document.getElementById("origin").value = "";
	  	document.getElementById("lotnumber").value = "";
	  	// document.getElementById("size").value = "";
	  	sweetAlert('Complete')
      // $('#photo').attr('src', '')
    });
    // document.getElementById("name").value('');
  },

// Delete a existing primary

  'click #delete'(event, instance) {
  	Primary.remove(this._id)
  },


  // take a photo

  'click #phototrigger'(){
  	var cameraOptions = {
            width: 200,
            height: 200
        };
    MeteorCamera.getPicture(cameraOptions, function (error, data) {
       if (!error) {

           $('.photo').attr('src', data); 
           $('.photo').attr('value', data); 
       }
    });
    event.preventDefault();
  }

});


// Updating a record in the update template

Template.update.events({
	// Create a new primary
	
  'click #update'(event, instance) {
  	var name = document.getElementById("name").value;
  	var date = document.getElementById("my-datepicker").value;
  	var origin = document.getElementById("origin").value;
  	var lotnumber = document.getElementById("lotnumber").value;
  	var description = document.getElementById("description").value;
  	var photo = document.getElementById("photo").getAttribute('src');
 		// for some reason the photo won't save without removing the last character
 		// if(photo != null){
  	// 	photo = photo.substring(0, photo.length - 1);
  	// }
  	var id = Session.get('update');
  	console.log(id);
    Primary.update(id, { 
    	$set:{
	    	name: name,
	    	dateReceived: new Date(),
	    	lotNumber: lotnumber,
	    	expirationDate: date,
	    	placeOfOrigin: origin,
	    	description: description,
	    	date: date,
	    	
	    }
    	// climate: climate,
    	// heatLevel: heatLevel,
    	// farmName: farmNamem,
    	// growerName: growerName,
    	// photo: photo
 
    },
    function(error, result){
      // or try function(error, result) and still get nothing 
      // console.log('result: ' + result);
      if(error){
      	alert(error);
      }
      console.log('error: ' + error);
      console.log('_id: ' + result); //this._id doesn't work either
      document.getElementById("name").value = "";
	  	document.getElementById("my-datepicker").value = "";
	  	document.getElementById("origin").value = "";
	  	document.getElementById("lotnumber").value = "";
	  	// document.getElementById("size").value = "";
	  	
      Session.set('showupdate', false);
     
      // $('#photo').attr('src', '')
    });
    // document.getElementById("name").value('');
  },
})


// Loading Google Maps

// client
Meteor.startup(function() {
  GoogleMaps.load({
    key: 'AIzaSyDiyK7NJ3myjN7SRKtgC5KNx92ChSp2eAI',
    libraries: 'places'  // also accepts an array if you need more than one
  });
});