import { Mongo } from 'meteor/mongo';
 
export const Primary = new Mongo.Collection('Primary');
export const Secondary = new Mongo.Collection('Secondary');