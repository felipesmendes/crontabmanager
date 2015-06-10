Router.configure({
  layoutTemplate: 'basicLayout',
  notFoundTemplate: 'notFound'
});
Router.route('/', function () {
  this.render('crontab');
});
