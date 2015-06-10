Template.crontab.events({
  'click #cadastrar':function(e,template){
    console.log("clicou");
      Meteor.call('addCronJob',template.find("#job").value,function(err,response){
        console.log("add")
        var flash = template.find("#flash");
        if(response != ""){
          flash.className = 'alert alert-danger';
          flash.innerHTML = response;
        }else{
          flash.className = 'alert alert-success';
          flash.innerHTML = "Job cadastrado com sucesso!";
        }

        Meteor.call('getCronTab',function(err,response){
          console.log("vai atualizar crontab");
          template.find("#cron").innerHTML = response;
          template.find("#job").value = "";
        });
      });
  }
})
Template.crontab.rendered = function(){
  var template = this;
  Meteor.call('getCronTab',function(err,response){
    template.find("#cron").innerHTML = response;
  });
}
