# model-edit-dialog

  A simple component to edit a model inside a dialog

## Installation

    $ component install mikanda/model-edit-dialog

## API

### modelEditDialog(model, form, [lang]);
Create a new instance.
The param ``model`` must be a instance of component/model,
``form`` is the dom element of the form containing which will be displayed inside the dialog.
The object ``lang`` is optional and can override the default language.

    {
      save: 'save',
      cancel: 'cancel',
      title: 'Edit model'
    }

## License

  LGPLv3
