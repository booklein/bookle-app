Session.setDefault("msgShow", true);

Template._footer.helpers({
  countInCart: function () {
    return 3;
  },
  totalPrice: function () {
    return 430;
  }
});

Template._message.helpers({
  msgShow: function () {
    return Session.get("msgShow");
  },
  totalPrice: function () {
    return 430;
  }
});

Template._message.events({
  'click #cancelmsg': function (e) {
    e.preventDefault();
    Session.set("msgShow", false);
  },    
});
