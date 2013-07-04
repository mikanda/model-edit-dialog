/*
 * require dependencies
 */
var yesNoDialog = require('yes-no-dialog'),
    domify = require('domify'),
    Emitter = require('emitter'),
    syncModel = require('sync-model');

/*
 * create new instance
 */
function ModelEditDialog (model, template, lang) {
  var title,
      tmp,
      self = this;
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
  
  this.model = model;

  /*
   * create new form
   */
  this.form = domify(template);
  /*
   * make new bootstrap-dialog
   */
  var ynd = yesNoDialog(
    title,
    this.form,
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
  ['close','hide'].forEach(function(event){
    ynd.on(event, function () {
      self.emit(event);
    });
  });
};
Emitter(ModelEditDialog.prototype);

ModelEditDialog.prototype.save = function () {
  syncModel(this.form, this.model);
  /*
   * save model
   */
  this.model.save(function (err) {
    if (err)
      console.log('error saving model', err);
  });
};
ModelEditDialog.prototype.cancel = function () {
};
module.exports = function (model, formschema, lang) {
  return new ModelEditDialog(model, formschema, lang);
};