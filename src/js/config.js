/*
MIT License
Copyright (c) 2018 Cybozu
https://github.com/kintone/SAMPLE-Add-yourself-plug-in/blob/master/LICENSE
*/
jQuery.noConflict();
(function($, PLUGIN_ID) {
  'use strict';
  // Get configuration settings
  var CONF = kintone.plugin.app.getConfig(PLUGIN_ID);

  var $form = $('.js-submit-settings');
  var $cancelButton = $('.js-cancel-button');
  var $space = $('select[name="js-select-space-field"]');
  var $label = $('input[name="js-text-button-label"]');
  var $user = $('select[name="js-select-user-field"]');

  function setDropDown(type) {
    // Retrieve field information, then set drop-down
    return KintoneConfigHelper.getFields(['USER_SELECT', 'SPACER']).then(function(resp) {
      var $userDropDown = $user;
      var $spaceDropDown = $space;
      resp.forEach(function(respField) {
        var $option = $('<option></option>');
        switch (respField.type) {
          case 'USER_SELECT':
            $option.attr('value', respField.code);
            $option.text(respField.label);
            $userDropDown.append($option.clone());
            break;
          case 'SPACER':
            if (!respField.elementId) {
              break;
            }
            $option.attr('value', respField.elementId);
            $option.text(respField.elementId);
            $spaceDropDown.append($option.clone());
            break;
          default:
            break;
        }
      });

      // Set default values
      if (CONF.user) {
        $userDropDown.val(CONF.user);
      }
      if (CONF.space) {
        $spaceDropDown.val(CONF.space);
      }
    }, function(resp) {
      return alert('Failed to retrieve fields information');
    });
  }

  $(document).ready(function() {
  // Set default values
    if (!CONF.label) {
      CONF.label = 'Add yourself';
    }
    $label.val(CONF.label);
    // Set drop-down list
    setDropDown();

    // Set input values when 'Save' button is clicked
    $form.on('submit', function(e) {
      e.preventDefault();
      var config = {};

      config.space = $space.val();
      config.label = $label.val();
      config.user = $user.val();

      kintone.plugin.app.setConfig(config, function() {
        alert('The plug-in settings have been saved. Please update the app!');
        window.location.href = '/k/admin/app/flow?app=' + kintone.app.getId();
      });
    });
    // Process when 'Cancel' is clicked
    $cancelButton.on('click', function() {
      window.location.href = '/k/admin/app/' + kintone.app.getId() + '/plugin/';
    });
  });
})(jQuery, kintone.$PLUGIN_ID);
