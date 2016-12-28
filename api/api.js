import { Mongo } from 'meteor/mongo';
 
export const Primary = new Mongo.Collection('Primary');
export const Secondary = new Mongo.Collection('Secondary');
export const Tertiary = new Mongo.Collection('Tertiary');
export const Quaternary = new Mongo.Collection('Quaternary');