const kue=require('kue');
const queue=kue.createQueue();//group of similar jobs

module.exports=queue;
