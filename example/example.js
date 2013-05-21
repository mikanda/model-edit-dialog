function init () {
  var modelEditDialog = require('model-edit-dialog');
  var model = require('component-model');

  var User = model('User')
              .attr('id')
              .attr('title')
              .attr('forename')
              .attr('surname')
              .attr('email');
  var user = new User({
    title: 'Mrs',
    forename: 'Quark',
    surname: 'Quarki',
    email: 'e@mail.com'
  });
  var formschema = {
    title: {
      title: "Title",
      type: "String"
    },
    forename: {
      title: "Forename",
      type: "String"
    },
    surname: {
      title: "Surname",
      type: "String"
    },
    email: {
      title: "Email",
      type: "String"
    }
  };
  modelEditDialog(user, formschema, {title: 'Change Model'});
}