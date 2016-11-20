import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Primary } from '../../api/api.js';

import './primary.html';

Template.primary.helpers({
  primaryList() {
    return Primary.find();
  },
});



Template.primary.events({

// Create a new primary
	
  'click #create'(event, instance) {
  	var name = document.getElementById("name").value;
  	console.log(name);
    Primary.insert({
    	name: name,
    	// dateReceived: dateReceived,
    	// detail: detail,
    	// lotNumber: lotNumber,
    	// expirationDate: expirationDate,
    	// placeOfOrigin: placeOfOrigin,
    	// climate: climate,
    	// heatLevel: heatLevel,
    	// farmName: farmNamem,
    	// growerName: growerName,
    	// location: location
    });
    // document.getElementById("name").value('');
  },

// Delete a existing primary

  'click #delete'(event, instance) {
  	Primary.remove(this._id)
  },

// Update an existing primary

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
    windowContent += '<p>'+this.name+'</p>'
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

});