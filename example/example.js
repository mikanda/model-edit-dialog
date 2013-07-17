function init () {
  var modelEditDialog = require('model-edit-dialog');
  var model = require('component-model');
  var jade = require('luka5-jade');
  var syncModel = require('sync-model');

  var User = model('User')
              .attr('id')
              .attr('title')
              .attr('forename')
              .attr('surname')
              .attr('email');
  User.use(syncModel());
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
        '      input(type="text",value="",value=title,name="title")',
        '  .control-group',
        '    label.control-label Name:',
        '    .controls.controls-row',
        '      input.span2(type="text",value="",value=forename,name="forename")',
        '      input.span2(type="text",value="",value=surname,name="surname")',
        '  .control-group',
        '    label.control-label Email:',
        '    .controls',
        '      input(type="text",value="",value=email,name="email")'
      ].join('\n');
  formTemplate = jade.compile(formTemplate)(user.attrs);
  var med = modelEditDialog(user, formTemplate, {title: 'Change Model'});
  med.on('close', function(){
    console.log('close');
  });
  med.on('hide', function(){
    console.log('hide');
  });
  med.on('show', function(){
    console.log('show');
  });
}
