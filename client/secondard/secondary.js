import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Secondary } from '../../api/api.js';
import { Primary } from '../../api/api.js';

import './secondary.html';

// Global Array that holds the array of primary before saving

let secondary = [];

Template.secondary.rendered = function () { 
  
 }

////////////////////////////////////
// Helpers for the secondary template
//////////////////////////////////// 


Template.secondary.helpers({

// 

  // qr(){
  //   console.log(qrScanner.message());
  //   return qrScanner.message();  
  // },

//scanning function for computer

  scan(){
    console.log('winning')
    
  },

// Display all the secondarys

  second(){
    console.log(Secondary.findOne())
    return Secondary.find();
  }
});
////////////////////////////////////
// Events for the secondary template
////////////////////////////////////

Template.secondary.events({

// Create a new secondary
	
  'click #create'(event, instance) {
    console.log(secondary);
    var name = document.getElementById("name").value;

    Secondary.insert({
      name: name,
    	secondary: secondary,
    	
    });
    
  },

// Delete a existing primary

  'click #delete'(event, instance) {
  	Secondary.remove(this._id)
  },

// Update an existing primary

// Turn on the qr scanner - when code is read the scanner turns off automatically

  'click #scan'(event, instance) {
    
    qrScanner.on('scan', function(err, message) {
      console.log(message);
      if ((message != null) && (message !=undefined)) {

        qrScanner.off('scan', function(err, message) {
          console.log(message);
        });

        // Search for both primary and secondary components

        var primary = Primary.findOne({_id : message});
        console.log('primary', primary);

        // if(primary == undefined){
        //   var secondary = Secondary.findOne({_id : secondary});
        // }

        // Confirmation that the correct item is being added

        sweetAlert({
          title: "Add?" + primary.name + " to the recipe",
          text: "",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes",
          closeOnConfirm: false,
          html: false
        }, function(){
          secondary.push(primary);
          // console.log('array', secondary)
          swal("Added!",
          primary.name + " has been added to this secondary",
          "success");
        });
        // var secondard = Secondary.findOne({_id : message});
        
      }
    });
  },

// manually turn of the scanner

  'click #scanOff'(){
    qrScanner.off('scan', function(err, message) {
      console.log(message);
    });
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




// QR scanner for mobile - functions differently than the lap top scanner below

// if (Meteor.isCordova) {

//   Template.barcode_scanner.events({
//     'click button': function () {

//       cordova.plugins.barcodeScanner.scan(
//         function (result) {
//           alert("We got a barcode\n" +
//             "Result: " + result.text + "\n" +
//             "Format: " + result.format + "\n" +
//             "Cancelled: " + result.cancelled);


//           var ingredient = Raws.findOne({'_id': result.text})
//           var divOne = document.getElementById(ingredient.productId);
//           alert(divOne)
//           divOne.style.display='none';
//           var list = $('#ingredientList').children(':visible').length
//           if(list == 0){
//             $('#newBatch').show();
//           }      
//         }, 
//         function (error) {
//           alert("Scanning failed: " + error);
//         }
//      );

//     }

//   });

// }

// This scan works on the computer only, the scanner in the code above is what works on mobile

