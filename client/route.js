// import './primary/primary.html';


FlowRouter.route('/', {
  action: function() {
    BlazeLayout.render( "baseTemplate", {content: "welcome"});
  }
});

FlowRouter.route('/primary', {
  action: function() {
    BlazeLayout.render( "baseTemplate", {content: "primary"});
  }
});
FlowRouter.route('/primarylistview', {
  action: function() {
    BlazeLayout.render( "baseTemplate", {content: "primarylistview"});
  }
});

FlowRouter.route('/secondary', {
  action: function() {
    BlazeLayout.render( "baseTemplate", {content: "secondary"});
  }
});

FlowRouter.route('/tertiary', {
  action: function() {
    BlazeLayout.render( "baseTemplate", {content: "tertiary"});
  }
});

FlowRouter.route('/tertiarydisplay', {
  action: function() {
    BlazeLayout.render( "emptyTemplate", {content: "tertiarydisplay"});
  }
});

FlowRouter.route('/quaternary', {
  action: function() {
    BlazeLayout.render( "baseTemplate", {content: "quaternary"});
  }
});

FlowRouter.route('/scan', {
  action: function() {
    BlazeLayout.render( "baseTemplate", {content: "scan"});
  }
});