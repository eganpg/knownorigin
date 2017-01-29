import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Quaternary } from '../../api/api.js';
import { Tertiary } from '../../api/api.js';
import { Secondary } from '../../api/api.js';
import { Primary } from '../../api/api.js';

import './scan.html';

Session.set('quatclicked', false)
Session.set('showsecondary', false)
Session.set('showprimary', false)
Session.set('showquat', true)

Template.scan.helpers({
  quaternary(){
    // console.log(Quaternary.findOne())
    var quat = Session.get('quaternary')
    console.log(quat);
    console.log(Quaternary.findOne({_id: quat}))
    return Quaternary.findOne({_id: quat});
  },
  quatclicked(){
    return Session.get('quatclicked')
  },
  showquat(){
    return Session.get('showquat')
  },
  showsecondary(){
    var id = Session.get('showsecondary');
    return Secondary.findOne({_id: id})
  },
  showprimary(){
    var id = Session.get('showprimary');
    return Primary.findOne({_id: id})
  }
})

Template.scan.events({
  


  'click #scan'(event, instance) {
      
      qrScanner.on('scan', function(err, message) {
        console.log(message);
        if ((message != null) && (message !=undefined)) {

          qrScanner.off('scan', function(err, message) {
            console.log(message);
          });

          // Search for both primary and secondary components

          // var quaternary = Quaternary.findOne({_id : message});
          var tertiary = Tertiary.findOne({_id : message});
          console.log('quaternary', tertiary);
          console.log('quaternary_id', tertiary._id);
          // Session.set('quaternary', quaternary._id)

          // if(primary == undefined){
          //   var secondary = Secondary.findOne({_id : secondary});
          // }

          // Confirmation that the correct item is being added

          sweetAlert(tertiary._id);
          // var secondard = Secondary.findOne({_id : message});
          qrScanner.off('scan', function(err, message) {
            console.log(message);
          });
          
        }
      });
    },

    // if the package image is clicked - quaternary image - show / hide the corresponding secondarys

    'click .quaternary'(){
      if(Session.get('quatclicked') == true){
        Session.set('quatclicked', false)
        Session.set('showquat', true)
      }
      else{
        Session.set('quatclicked', true)
        Session.set('showquat', false)
      }
    },

    'click .secondary'(){
      console.log(this);
      Session.set('showsecondary', this._id)
      Session.set('quatclicked', false)
    },

    'click .primary'(){
      console.log(this);
      Session.set('showprimary', this._id)
      Session.set('showsecondary', false)
    },

    // manually turn of the scanner

    'click #scanOff'(){
      qrScanner.off('scan', function(err, message) {
        console.log(message);
      });
    },

    'click #reset'(){
      location.reload();
    },

     // Scanning event for mobile

  'click #mobilescan'() { 

      cordova.plugins.barcodeScanner.scan(
        function (result) {
          // sweetAlert("We got a barcode\n" +
          //   "Result: " + result.text + "\n" +
          //   "Format: " + result.format + "\n" +
          //   "Cancelled: " + result.cancelled);


         if ((result.text != null) && (result.text !=undefined)) {
            var quaternary = Quaternary.findOne({_id : result.text});
            sweetAlert('quaternary', quaternary._id);
            Session.set('quaternary', quaternary._id)
            sweetAlert('Scan Complete');
          }
        }, 
        function (error) {
          alert("Scanning failed: " + error);
        }
     );

    },
  })