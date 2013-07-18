/*
 * require dependencies
 */
var yesNoDialog = require('yes-no-dialog'),
    domify = require('domify'),
    Emitter = require('emitter'),
    attr = require('attr'),
    classes = require('classes'),
    query = require('query'),
    each = require('each'),
    syncModel = require('sync-model');


module.exports = ModelEditDialog;

/*
 * create new instance
 */
function ModelEditDialog (model, template, lang, opt) {
  if (!(this instanceof ModelEditDialog))
    return new ModelEditDialog(model, template, lang, opt);
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
  this.opt = opt;

  /*
   * create new form
   */
  this.form = domify(template);
  /*
   * make new bootstrap-dialog
   */
  var ynd = this.ynd = yesNoDialog(
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
  var errors,
      self = this;
  this.model.syncWith(this.form);
  /*
   * save model
   */
  this.model.save(function (err) {
    clearErrors.call(self);
    if (err && err.message === 'validation failed') {
      errors = self.model.errors;
      self.emit('error', errors);
      displayErrors.call(self, errors);
      self.ynd.show();

    } else if (err) {
      self.emit('save', err);
      self.ynd.show();
      displayError.call(self);

    } else {
      self.emit('save');
    }
  });
};
ModelEditDialog.prototype.cancel = function () {
};

function displayError () {
  var errorBox = query('.alert', this.form);
  classes(errorBox).remove('hidden');
  errorBox.innerHTML = this.opt.error;
}

function displayErrors (errors) {
  clearErrors.call(this);
  var errorBox,
      errorEl,
      self = this;

  errorBox = query('.alert', this.form);
  classes(errorBox).remove('hidden');
  errorBox.innerHTML = this.opt.validationError;

  errors.forEach(function (err) {
    errorEl = query('[name="' + err.attr + '"]', self.form);
    if (!errorEl)
      return;
    attr(errorEl).set('title', err.message);
    classes(errorEl).add('error');
  });
}

function clearErrors () {
  var errorBox = query('.alert', this.form);
  if (errorBox) {
    classes(errorBox).add('hidden');
    errorBox.innerHTML = '';
  }

  each(query.all('.error', this.form), function (errorEl) {
    attr(errorEl).set('title', '');
    classes(errorEl).remove('error');
  });
}
