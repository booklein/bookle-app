Meteor.publish('books', function(limit, context) {
  var self = this;
  _.each(dummyBooks, function(book) {
    self.added('books', book._id, book);
  });
  self.ready();
});

Meteor.publish('searchBooks', function(user, searchStr) {
  var self = this;
  _.each(dummyBooks, function(book) {
    self.added('searchBooks', book._id, book);
  });
  self.ready();
});

Meteor.publish('categories', function(user, context) {
  var self = this;
  _.each(categories, function(cat) {
    self.added('categories', cat._id, cat);
  });
  self.ready();
});

Meteor.publish('searchStrs', function(user, context) {
  var self = this;
  var searchStrs = [
    {"_id": "1", "searchStr": "Search String 1"},
    {"_id": "2", "searchStr": "Search String 2"},
    {"_id": "3", "searchStr": "Search String 3"},
    {"_id": "4", "searchStr": "Search String 4"},
    {"_id": "5", "searchStr": "Search String 5"},
    {"_id": "6", "searchStr": "Search String 6"},
  ];
  _.each(searchStrs, function(str) {
    self.added('searchStrs', str._id, str);
  });
  self.ready();
});

var dummyBooks = [
  {"_id": "1", "title": "Title One", "author": "Author One"},
  {"_id": "2", "title": "Title 2", "author": "Author 2"},
  {"_id": "3", "title": "Title 3", "author": "Author 3"},
  {"_id": "4", "title": "Title 4", "author": "Author 4"},
  {"_id": "5", "title": "Title 5", "author": "Author 5"},
  {"_id": "6", "title": "Title 6", "author": "Author 6"}
];

var categories = [
  {"_id": "0", "name": "Select category"},
  {"_id": "1", "name": "Category String 1", "parentId": "0"},
  {"_id": "2", "name": "Category String 2", "parentId": "0"},
  {"_id": "3", "name": "Category String 3", "parentId": "0"},
  {"_id": "4", "name": "Category String 4", "parentId": "0"},
  {"_id": "5", "name": "Category String 5", "parentId": "0"},
  {"_id": "6", "name": "Category String 6", "parentId": "0"},
  {"_id": "11", "name": "Category String 1", "parentId": "1"},
  {"_id": "12", "name": "Category String 1", "parentId": "1"},
  {"_id": "13", "name": "Category String 1", "parentId": "1"},
  {"_id": "14", "name": "Category String 1", "parentId": "1"},
  {"_id": "15", "name": "Category String 1", "parentId": "1"},
  {"_id": "21", "name": "Category String 1", "parentId": "2"},
  {"_id": "22", "name": "Category String 1", "parentId": "2"},
  {"_id": "23", "name": "Category String 1", "parentId": "2"},
  {"_id": "24", "name": "Category String 1", "parentId": "2"},
  {"_id": "25", "name": "Category String 1", "parentId": "2"},
];
