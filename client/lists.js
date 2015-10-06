subs = new SubsManager();
Books = new Mongo.Collection('books');
SearchBooks = new Mongo.Collection('searchBooks');
Categories = new Mongo.Collection('categories');
SearchStrs = new Mongo.Collection('searchStrs');
Session.setDefault("browseActive", true);
Session.setDefault("searchActive", true);
Session.setDefault("selectedCategory", "0");
Session.setDefault("searchString", null);

Template.recommendBooks.onCreated(function () {
  var instance = this;
  instance.loaded = new ReactiveVar(0);
  instance.limit = new ReactiveVar(10);
  instance.ready = new ReactiveVar(false);

  var context = {};
  var subscription = subs.subscribe('books', instance.limit.get(), context);
  instance.autorun(function () {
    var limit = instance.limit.get();
    if (subscription.ready()) {
      instance.loaded.set(limit);
      instance.ready.set(true);
    } else {
      //
    }
  });
  instance.books = function() { 
    return Books.find({}, {limit: instance.loaded.get()});
  }  
});

Template.recommendBooks.helpers({
  available: function () {
    return true;
  },
  notInFavourites: function () {
    return true;
  },
  books: function () {
    return Template.instance().books();
  },
  books: function () {
    return Template.instance().books();
  },
  hasMoreBooks: function () {
    return Template.instance().books().count() >= Template.instance().limit.get()
  }
});

Template.recommendBooks.events({
  'click .load-more': function (e, instance) {
    e.preventDefault();
    var limit = instance.limit.get();
    limit += 10;
    instance.limit.set(limit);
  },
  'click .add-to-cart': function (e, instance) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Added to cart: " + e.currentTarget.id)
  },
  'click .add-to-fav': function (e, instance) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Added to cart: " + e.currentTarget.id)
  },
  'click .book': function (e, instance) {
    e.preventDefault();
    r = "/book/" + e.currentTarget.id.replace("li-", "");
    Router.go(r);
  },
});

//=========================================

Template.browseBooks.onCreated(function () {
  var instance = this;
  instance.loaded = new ReactiveVar(0);
  instance.limit = new ReactiveVar(10);
  instance.ready = new ReactiveVar(false);

  var context = {};
  var category = Session.get("selectedCategory");
  if(category) context.category = category;
  var subscription = subs.subscribe('books', instance.limit.get(), context);
  instance.autorun(function () {
    var limit = instance.limit.get();
    if (subscription.ready()) {
      instance.loaded.set(limit);
      instance.ready.set(true);
    } else {
      //
    }
  });
  instance.books = function() { 
    return Books.find({}, {limit: instance.loaded.get()});
  }  
});

Template.browseBooks.helpers({
  noBooks: function () {
    return (Template.instance().books().count() === 0);
  },
  browseActive: function () {
    return Session.get("browseActive");
  },
  category: function () {
    var category = Session.get("selectedCategory");
    return (category === null) ? "Tap to browse categories" : Categories.findOne({"_id": category}).name ;
  },
  books: function () {
    return Template.instance().books();
  },
  hasMoreBooks: function () {
    return Template.instance().books().count() >= Template.instance().limit.get()
  }
});

Template.browseBooks.events({
  'click .browseCat': function (e, instance) {
    e.preventDefault();
    Session.set("browseActive", true);
  },
  'click .load-more': function (e, instance) {
    e.preventDefault();
    var limit = instance.limit.get();
    limit += 10;
    instance.limit.set(limit);
  },
  'click .add-to-cart': function (e, instance) {
    e.preventDefault();
    console.log("Added to cart: " + e.currentTarget.id)
  },
  'click .add-to-fav': function (e, instance) {
    e.preventDefault();
    console.log("Added to cart: " + e.currentTarget.id)
  },
});

//=========================================

Template.browseCategories.onCreated(function () {
  var instance = this;
  instance.ready = new ReactiveVar(false);
  var subscription = subs.subscribe('categories');
  instance.autorun(function () {
    if (subscription.ready()) {
      instance.ready.set(true);
    } else {
      //
    }
  });
  instance.categories = function() { 
    return Categories.find();
  }  
});

Template.browseCategories.helpers({
  noBooks: function () {
    return (Template.instance().books().count() === 0);
  },
  browseActive: function () {
    return Session.get("browseActive");
  },
  categories: function () {
    var nodeId;
    this._id ? nodeId = this._id : nodeId = "0"
    return Template.instance().categories({"parentId": nodeId});
  },
});

Template.browseCategories.events({
  'click .browseCat': function (e, instance) {
    e.preventDefault();
    Session.set("selectedCategory", e.currentTarget.id);
    Session.set("browseActive", false);
  },
});


//=========================================

Template.searchBooks.onCreated(function () {
  var instance = this;
  instance.loaded = new ReactiveVar(0);
  instance.limit = new ReactiveVar(10);
  instance.ready = new ReactiveVar(false);

  var subscription = subs.subscribe('searchBooks', instance.limit.get());
  instance.autorun(function () {
    var limit = instance.limit.get();
    if (subscription.ready()) {
      instance.loaded.set(limit);
      instance.ready.set(true);
    } else {
      //
    }
  });
  instance.books = function() { 
    return SearchBooks.find({}, {limit: instance.loaded.get()});
  }  
  instance.searchStrs = function() { 
    return SearchStrs.find();
  }  
});

Template.searchBooks.helpers({
  noBooks: function () {
    return (Template.instance().books().count() === 0);
  },
  searchActive: function () {
    return Session.get("searchActive");
  },
  searchString: function () {
    return Session.get("searchString");
  },
  searchStrs: function () {
    return Template.instance().searchStrs();
  },
  books: function () {
    return Template.instance().books();
  },
  hasMoreBooks: function () {
    return Template.instance().books().count() >= Template.instance().limit.get()
  }
});

Template.searchBooks.events({
  'click .browseCat': function (e, instance) {
    e.preventDefault();
    Session.set("browseActive", true);
  },
  'click .load-more': function (e, instance) {
    e.preventDefault();
    var limit = instance.limit.get();
    limit += 10;
    instance.limit.set(limit);
  },
  'click .add-to-cart': function (e, instance) {
    e.preventDefault();
    console.log("Added to cart: " + e.currentTarget.id)
  },
  'click .add-to-fav': function (e, instance) {
    e.preventDefault();
    console.log("Added to cart: " + e.currentTarget.id)
  },
});
