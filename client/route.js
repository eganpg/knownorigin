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

FlowRouter.route('/secondary', {
  action: function() {
    BlazeLayout.render( "baseTemplate", {content: "secondary"});
  }
});