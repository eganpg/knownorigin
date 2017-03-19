import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tertiary } from '../../api/api.js';
import { Secondary } from '../../api/api.js';
import { Primary } from '../../api/api.js';

import './secondary.html';
import '../main.html'
// import '../../server'

// Global Array that holds the array of primary before saving

let secondary = [];

Template.secondary.rendered = function () { 
  
 }

////////////////////////////////////
// Helpers for the secondary template
//////////////////////////////////// 


Template.secondary.helpers({

// Autocomplete code

  settings: function() {
      return {
        position: "top",
        limit: 20,
        rules: [
          {
        
          token: '@',
          collection: Meteor.users,
          field: "username",
          template: Template.secondary
        
          }
        ]
      };
    },

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
    return Secondary.find({},{sort:{dateReceived: -1},limit : 50});
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
    var photo = document.getElementById("photo").getAttribute('src');
    console.log(name);
    Secondary.insert({
      name: name,
    	secondary: secondary,
      dateReceived: new Date(),
      photo: photo,
      user: Meteor.user(),
      userId: Meteor.userId(),
    	
    }, function(){
      secondary = [];
    });
    
  },

// Delete a existing secondary

  'click #delete'(event, instance) {
    Meteor.call('deleteSecondary', this._id, function(err, response){
      if(err){
        sweetAlert('404 error.')
      }
      console.log('response', response)
    })
  	
  },

  // 'click #methodtest'(){
  //   console.log('clicked');
    
  //   // Meteor.call('createPlayer');
  //   var name = document.getElementById("name").value;
  //   // var photo = document.getElementById("photo").getAttribute('src');


  //   var cameraOptions = {
  //           width: 600,
  //           height: 600
  //       };
  //   MeteorCamera.getPicture(cameraOptions, function (error, data) {
  //      if (!error) {

  //          Meteor.call('postTwitter', name, data, function(err,response) {
  //           if(err) {
  //             Session.set('serverDataResponse', "Error:" + err.reason);
  //             return;
  //           }
  //           console.log('response', response)
  //         });
  //      }
  //   });


    
  // },

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
        if(primary != undefined){
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
        }
        console.log('primary', primary);

        if(primary == undefined){
          var secondary2 = Secondary.findOne({_id : message});
            sweetAlert({
            title: "Add?" + secondary2.name + " to the recipe",
            text: "",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            closeOnConfirm: false,
            html: false
          }, function(){
            secondary.push(secondary2);
            // console.log('array', secondary)
            swal("Added!",
            secondary2.name + " has been added to this secondary",
            "success");
          });
        }

        

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
    console.log(this);
    
    var windowContent = '<!DOCTYPE html>';
    windowContent += '<html>'
    
    windowContent += '<body>'
    windowContent += '<img src="' + dataUrl + '">';
    windowContent += '<p style="width: 75px; font-size:6px;">'+this.name+'</p>'
    windowContent += '<p style="width: 75px; font-size:6px;">'+this._id.substring(0,4)+'</p>'
    windowContent += '<p style="width: 75px; font-size:6px;">'+this.dateReceived +'</p>'
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

  // Remove the secondary from the secondary DB and move to tertiary database - this may not be the best way to handle the transition from secondary to tertiary

  'click #tertiary'(){
    console.log(this._id)
    var secondaryToMove = Secondary.findOne({_id: this._id})
    console.log(secondaryToMove);
    Tertiary.insert(secondaryToMove);
    var name = document.getElementById("name").value;
    var hashtag = document.getElementById("hashtag").value;
    console.log(hashtag);


    // var photo = document.getElementById("photo").getAttribute('src');

    var cameraOptions = {
            width: 1000,
            height: 1000
        };
    MeteorCamera.getPicture(cameraOptions, function (error, data) {
       if (!error) {

           Meteor.call('postTwitter', name, data, secondaryToMove, hashtag, function(err,response) {
            if(err) {
              Session.set('serverDataResponse', "Error:" + err.reason);
              return;
            }
            console.log('response', response)
          });
       }
    });
    

    
    Secondary.remove(this._id);
  },

  // Scanning event for mobile - currently needs to be updated in order to scan secondary components, only scans primary

  'click #mobilescanprimary'() {
      
    cordova.plugins.barcodeScanner.scan(
      function (result) {
        
        sweetAlert(result.text);

        if ((result.text != null) && (result.text !=undefined)) {

          // Search for both primary and secondary components

          var primary = Primary.findOne({_id : result.text});
          // var sec = Secondary.findOne({_id : result.text});
          // alert(primary)
          // alert(sec)
          swal(primary._id)
          console.log('primary', primary);
          // console.log('secondary', sec);

          if(primary != undefined){
            // Confirmation that the correct item is being added

        
              secondary.push(primary);
              // console.log('array', secondary)
              swal("Added!",
              primary.name + " has been added to this secondary",
              "success");
        
          
          }
        
        } 
        // function (error) {
        //   alert("Scanning failed: " + error);
        // }
      }
     );

    },

    'click #mobilescansecondary'() {
      
    cordova.plugins.barcodeScanner.scan(
      function (result) {
        
        sweetAlert(result.text);

        if ((result.text != null) && (result.text !=undefined)) {

          // Search for both primary and secondary components

          var sec1 = Secondary.findOne({_id : result.text});
          // var sec = Secondary.findOne({_id : result.text});
          // alert(primary)
          // alert(sec)
          swal(sec1._id)
          console.log('secondary', sec1);
          // console.log('secondary', sec);

          if(sec1 != undefined){
            // Confirmation that the correct item is being added

        
              secondary.push(sec1);
              // console.log('array', secondary)
              swal("Added!",
              sec1.name + " has been added to this secondary",
              "success");
        
          
          }
        
        } 
        // function (error) {
        //   alert("Scanning failed: " + error);
        // }
      }
     );

    },

     // take a photo

  'click #phototrigger'(){
    var cameraOptions = {
            width: 600,
            height: 600
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




// QR scanner for mobile - functions differently than the lap top scanner below

if (Meteor.isCordova) {

  Template.secondary.events({


  });

}

// if (Meteor.isServer) {
//   Meteor.methods({
//     'createPlayer': function(){
//         console.log("Hello world - twitter post");
//     }
// });
// }



