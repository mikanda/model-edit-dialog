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
  var formTemplate =
      [
        'form.form-horizontal',
        '  .control-group',
        '    label.control-label Title:',
        '    .controls',
        '      input(type="text",value="",data-value="title",name="title")',
        '  .control-group',
        '    label.control-label Name:',
        '    .controls.controls-row',
        '      input.span2(type="text",value="",data-value="forename",name="forename")',
        '      input.span2(type="text",value="",data-value="surname",name="surname")',
        '  .control-group',
        '    label.control-label Email:',
        '    .controls',
        '      input(type="text",value="",data-value="email",name="email")'
      ].join('\n');
  modelEditDialog(user, formTemplate, {title: 'Change Model'});
}