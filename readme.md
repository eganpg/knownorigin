Command to deploy to galaxy

DEPLOY_HOSTNAME=eu-west-1.galaxy-deploy.meteor.com meteor deploy --settings settings.json knownorigin.eu.meteorapp.com

Command to build mobile while maintaining deployed DB

MONGO_URL='mongodb://peter:alden3258@ds023465.mlab.com:23465/production' meteor run ios-derigin.eu.meteorapp.com/