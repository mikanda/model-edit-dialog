/*
 * require dependencies
 */
var Form = require('forms'),
    dialog = require('bootstrap-dialog'),
    domify = require('domify'),
    event = require('event');
/*
 * create new instance
 */
function ModelEditDialog (model, formschema, lang) {
  /*
   * set default lang if not definied
   */
  if (lang === undefined)
    lang = {};
  if (lang.save === undefined)
    lang.save = 'save';
  if (lang.cancel === undefined)
    lang.cancel = 'cancel';
  if (lang.title === undefined)
    lang.title = 'Edit model';
  
  /*
   * create new form
   */
  var form = new Form(formschema);
  form.render();
  form.setModel(model);

  /*
   * set footer
   */
  var saveEl = domify('<button class="btn btn-primary">' + lang.save + '</button>')[0];
  var cancelEl = domify('<button class="btn">' + lang.cancel + '</button>')[0];
  var footEl = domify('<span></span>')[0];
  footEl.appendChild(cancelEl);
  footEl.appendChild(saveEl);
  
  /*
   * make new bootstrap-dialog
   */
  var d = dialog(lang.title, form.view, footEl)
    .closable()
    .overlay()
    .movable()
    .show();

  /*
   * bind button events and implement standard behaviour
   */
  event.bind(saveEl, 'click', 
    function () {
      /*
       * hide dialog
       * update and save model
       */
      d.hide();
      var model = form.getModel();
      model.save(function (err) {
        console.log(err);
      });
    }
  );
  event.bind(cancelEl, 'click', 
    function () {
      /*
       * hide dialog
       */
      d.hide();
    }
  );
};

module.exports = function (model, formschema, lang) {
  return new ModelEditDialog(model, formschema, lang);
};