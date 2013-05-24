/*
 * require dependencies
 */
var Form = require('forms'),
    yesNoDialog = require('yes-no-dialog');

/*
 * create new instance
 */
function ModelEditDialog (model, formschema, lang) {
  var title;
  /*
   * set default lang if not definied
   */
  if (lang === undefined)
    lang = {};
  if (lang.save === undefined)
    lang.save = 'save';
  if (lang.cancel === undefined)
    lang.cancel = 'cancel';

  title = lang.title;
  if (title === undefined)
    title = 'Edit model';
  else
    delete lang.title;
  
  /*
   * create new form
   */
  var form = this.form = new Form(formschema);
  form.render();
  form.setModel(model);

  /*
   * make new bootstrap-dialog
   */
  yesNoDialog(
    title,
    form.view,
    {
      fn: this.save,
      scope: this
    },
    {
      fn: this.cancel,
      scope: this
    },
    lang
  );
};
ModelEditDialog.prototype.save = function () {
  var model = this.form.getModel();
  model.save(function (err) {
    console.log(err);
  });
};
ModelEditDialog.prototype.cancel = function () {
};
module.exports = function (model, formschema, lang) {
  return new ModelEditDialog(model, formschema, lang);
};