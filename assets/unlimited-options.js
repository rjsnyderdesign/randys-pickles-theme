          // To change what your customers would see if they try to
          // add to cart without completing an option, edit the yellow text enclosed within the quotation marks.
          var errorMessages = {
            for_text_inputs  : "Please add your personalized text before adding to cart.",
            for_number_inputs: "Please enter a custom quantity.",
            for_checkboxes   : "Please select your options before adding to cart",
            for_dropdowns    : "You must select a flavor for all jars!"
          };
          jQuery("form[action='/cart/add'] [type=submit]").on("click", function(e) {
            if (
              window.Shoppad &&
              window.Shoppad.apps &&
              window.Shoppad.apps.customizery &&
              window.Shoppad.apps.customizery.overrideDeprecatedValidation
            ) return true;

            $io = $('#infiniteoptions-container');
            var invalidTextInputs = $io.find("input[type=text][required], textarea[required]").filter(function (idx, el) {
              return $(el).val() === '';
            });
            var invalidNumberInputs = $io.find('input[type=number][required]').filter(function (idx, el) {
              return $(el).val() === '';
            });
            var invalidFieldSets = $io.find('fieldset[data-required=true]').filter(function (idx, fieldSet) {
              if ($(fieldSet).find('input[type=checkbox]').length === 0) {
                return false;
              } else {
                return $(fieldSet).find('input[type=checkbox]').filter(function (idx, el) {
                  return el.checked === true;
                }).length === 0;
              }
            });
            var invalidDropdowns = $io.find('select[required]').filter(function (idx, select) {
              return !select.selectedOptions[0] || select.selectedOptions[0].disabled === true;
            });
  
            var errMsg = '';

            if (invalidTextInputs.length > 0) {
              errMsg = errorMessages.for_text_inputs;
            } else if (invalidNumberInputs.length > 0) {
              errMsg = errorMessages.for_number_inputs;
            } else if (invalidFieldSets.length > 0) {
              errMsg = errorMessages.for_number_inputs;
            } else if (invalidDropdowns.length > 0) {
              errMsg = errorMessages.for_dropdowns;
            }

            if (errMsg.length) {
              alert(errMsg);
              e.stopImmediatePropagation();
              return false;
            }

            return true;
          });