var SSH = Meteor.npmRequire('simple-ssh');
var fs = Meteor.npmRequire('fs');
Future = Npm.require('fibers/future');

Meteor.startup(function () {
  var ssh = new SSH({
      host: 'localhost',
      user: 'felipe',
      pass: 'bysat123'
  });
	Meteor.methods({
	  getCronTab: function () {
      // load Future
      var myFuture = new Future();
      // call the function and store its result
      ssh.exec('crontab -l', {
        out: function(stdout) {
          myFuture.return(stdout);
        }
      }).start();
      return myFuture.wait();
	  },
    addCronJob: function(job){
      // load Future
      var myFuture = new Future();
      // call the function and store its result
      var comand = 'echo -e "`crontab -l`\n'+job+'" | crontab -';
      ssh.exec(comand, {
        out: function(stdout) {
          myFuture.return(stdout);
        },
        err: function(stderr) {
          myFuture.return(stderr); // this-does-not-exist: command not found
        }
      }).start();
      return myFuture.wait();
    }
	});
});
