/*
 * require dependencies
 */
var reactive = require('reactive'),
    yesNoDialog = require('yes-no-dialog'),
    jade = require('jade'),
    domify = require('domify'),
    each = require('each'),
    value = require('value'),
    query = require('query');

/*
 * create new instance
 */
function ModelEditDialog (model, template, lang) {
  var title,
      tmp;
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
  this.formEl = domify('<div>'+jade.compile(template, {})()+'<div>')[0];
  this.form = reactive(this.formEl, model);

  /*
   * make new bootstrap-dialog
   */
  yesNoDialog(
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
};
ModelEditDialog.prototype.save = function () {
  /*
   * get all input fields and update model
   */
  var self = this;
  each(this.model.attrs, function(key, oldValue){
    var val,
        el;
    el = query('[name='+key+']', self.formEl);
    if (!el)
      return;
    val = value(el);
    if (oldValue !== val)
      self.model[key](val);
  });
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