Command to deploy to galaxy

DEPLOY_HOSTNAME=eu-west-1.galaxy-deploy.meteor.com meteor deploy --settings settings.json knownorigin.eu.meteorapp.com

DEPLOY_HOSTNAME=eu-west-1.galaxy-deploy.meteor.com meteor deploy knownorigin.eu.meteorapp.com

Command to build mobile while maintaining deployed DB

MONGO_URL='mongodb://peter:alden3258@ds023465.mlab.com:23465/production' meteor run ios-device --mobile-server http://knowrigin.eu.meteorapp.com/

Instructions for how to deploy 




{{#each secondary}}
	<div class="col-md-4">
		{{name}} - {{_id}}
		<img style="width: 100%" src="http://netdna.copyblogger.com/images/chile-pepper.jpg">
	
		{{#each secondary}}
		  				<div class="col-md-4">
			  				{{name}} <img style="width: 100%" src={{photo}}>
			  				<!-- {{#each secondary}}
			  					<li>{{name}} - {{_id}} - <img src={{photo}}></li> -->
			  				<!-- {{/each}} -->
		  				</div>
		  			{{/each}}
	</div>	
{{/each}}