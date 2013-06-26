/*
 * require dependencies
 */
var reactive = require('reactive'),
    yesNoDialog = require('yes-no-dialog'),
    jade = require('jade'),
    domify = require('domify'),
    each = require('each'),
    value = require('value'),
    query = require('query'),
    Emitter = require('emitter');

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
  this.formEl = domify('<div>'+jade.compile(template, {})()+'<div>');
  this.form = reactive(this.formEl, model, model);

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
  /*
   * get all input fields and update model
   */
  var self = this,
      fn;
  fn = function(key, oldValue){
    var val,
        el,
        part,
        valObj;
    if (
      (typeof oldValue === 'object'
      || typeof oldValue === 'array')
      && !(oldValue instanceof Date))
        each(oldValue, function (k, v) {
          fn(key + '.' + k, v);
        });
    el = query('[name="'+key+'"]', self.formEl);
    if (!el)
      return;
    val = value(el);
    if (oldValue !== val) {
      key = key.split('.');
      valObj = self.model[key[0]]();
      if (key.length > 1) {
        part = valObj;
        for (var i = 1; i < key.length-1; i++)
          part = part[key[i]];
        part[key[key.length-1]] = val;
      }
      self.model[key[0]](valObj);
    }
  };

  each(this.model.attrs, fn);
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