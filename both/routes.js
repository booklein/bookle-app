Router.route('/', {name: 'recommendBooks'});
Router.route('/browseBooks', {name: 'browseBooks'});
Router.route('/searchBooks', {name: 'searchBooks'});
Router.route('/favourites', {name: 'favourites'});
Router.route('/book/:isbn', {name: 'book'});
Router.route('/cart', {name: 'cart'});
Router.route('/orderhistory', {name: 'orderhistory'});
Router.route('/profile', {name: 'profile'});
Router.route('/preferences', {name: 'preferences'});
Router.route('/notifications', {name: 'notifications'});



Router.configure({controller: 'AppController', loadingTemplate: 'loading'});
Router.plugin('ensureSignedIn', {only: ['cart', 'orderhistory', 'profile', 'preferences', 'notifications']});
Router.plugin('loading', {loadingTemplate: 'loading'});
Router.plugin('dataNotFound', {dataNotFoundTemplate: 'notFound'});

AppController = RouteController.extend({layoutTemplate: 'appLayout', fastRender: true});

AppController.events({
  'click [data-action=logout]' : function() {
    AccountsTemplates.logout();
  }
});

