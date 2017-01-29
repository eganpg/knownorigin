import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Quaternary } from '../../api/api.js';
import { Tertiary } from '../../api/api.js';
import { Secondary } from '../../api/api.js';
import { Primary } from '../../api/api.js';

import './quaternary.html';

Template.quaternary.helpers({
	quaternary(){
		console.log(Quaternary.findOne())
		return Quaternary.find();
	}
})

Template.quaternary.events({
	'click #delete'(){
		
    var quat = Quaternary.findOne({_id: this._id});
    console.log(quat.contents)
    // Tertiary.insert(quat.contents)
    // Quaternary.remove({_id: this._id})

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
})