/*
* add yourself Plug-in
* Copyright (c) 2026 Cybozu
* Licensed under the MIT License
*/
jQuery.noConflict();
(($, PLUGIN_ID) => {
  'use strict';
  // Get configuration settings
  const CONF = kintone.plugin.app.getConfig(PLUGIN_ID);

  const $form = $('.js-submit-settings');
  const $cancelButton = $('.js-cancel-button');
  const $space = $('select[name="js-select-space-field"]');
  const $label = $('input[name="js-text-button-label"]');
  const $user = $('select[name="js-select-user-field"]');

  const setDropDownForUser = () => {
    // Retrieve field information, then set dropdown
    return kintone.app.getFormFields().then((resp) => {
      const $userDropDown = $user;
      for (const key in resp) {
        if (!resp.hasOwnProperty(key)) {
            continue;
        }
        const respField = resp[key];
        const $option = $('<option></option>');
        switch (respField.type) {
          case 'USER_SELECT':
            $option.attr('value', respField.code);
            $option.text(respField.label);
            $userDropDown.append($option.clone());
            break;
          default:
            break;
        }
      };

      // Set default values
      if (CONF.user) {
        $userDropDown.val(CONF.user);
      }
    }, (resp) => {
      return alert('Failed to retrieve fields information');
    });
  }
  const setDropDownForSpace = () => {
    // Retrieve layout information, then set dropdown
    return kintone.app.getFormLayout().then((resp) => {
      const $spaceDropDown = $space;
      resp.forEach((layout) => {
        let fields = [];
        if (layout.type === 'ROW') {
          fields = layout.fields;
        } else if (layout.type === 'GROUP') {
          layout.layout.forEach((row)=>{
            if (row.type === 'ROW') {
              fields = row.fields;
            }
          });
        }
        fields.forEach((field) => {
          const $option = $('<option></option>');
          switch (field.type) {
            // Only pick Space fields
            case 'SPACER':
              if (!field.elementId) {
                break;
              }
              $option.attr('value', field.elementId);
              $option.text(field.elementId);
              $spaceDropDown.append($option.clone());
              break;
            default:
                break;
          }
        });
      });
      // Set default value
      if (CONF.space) {
        $spaceDropDown.val(CONF.space);
      }
    }, (resp) => {
        return alert('Failed to retrieve layout information.');
    });
  }
  $(document).ready(() => {
  // Set default values
    if (!CONF.label) {
      CONF.label = 'Add yourself';
    }
    $label.val(CONF.label);
    // Set drop-down list
    setDropDownForUser()
      .then(setDropDownForSpace);

    // Set input values when 'Save' button is clicked
    $form.on('submit', (e) => {
      e.preventDefault();
      const config = {};

      config.space = $space.val();
      config.label = $label.val();
      config.user = $user.val();

      kintone.plugin.app.setConfig(config, () =>  {
        alert('The plug-in settings have been saved. Please update the app!');
        window.location.href = '/k/admin/app/flow?app=' + kintone.app.getId();
      });
    });
    // Process when 'Cancel' is clicked
    $cancelButton.on('click', () => {
      window.location.href = '/k/admin/app/' + kintone.app.getId() + '/plugin/';
    });
  });
})(jQuery, kintone.$PLUGIN_ID);
