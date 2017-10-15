function GetEnvironmentSpecificUrl(urlWithoutEnvironmentPrefix) {
    var appdirectory = document.getElementById('appdirectory').value;
    var urlWithEnvironmentPrefix = urlWithoutEnvironmentPrefix;
    if (appdirectory != "")
        urlWithEnvironmentPrefix = '/' + appdirectory + urlWithoutEnvironmentPrefix;

    return urlWithEnvironmentPrefix;
}

function reInitControls() {
    // Here we'll unbind/rebind and reinitialize controls that override base controls, on modal
    // or other async content replacements.
    select2Custom();
    calendar();
};

function select2Custom() {
    // Remove aLll existing instances of Select 2, before re-initalizing.
    // $(".selectize-control").remove();

    // Replacement for select boxes
    $('#modal select.select-box').each(function (index, value) {
        // console.log(value);
        if ($(this).children().length < 2) {
            $(this).attr('disabled', 'disabled');
        }
        $(this).selectize();
    });
}

function calendar() {
    // assign the input field if it does not exist
    if (!$('.pika-single').length > 0) {
        $('.datepicker').each(function (index, value) {
            firstDate = $(this).attr("data-startdate");
            endDays = $(this).attr("data-range");
            var startDate = new Date(firstDate);
            var endDate = new Date();
            // Set date range equal endDay's from now
            endDate.setDate(endDate.getDate()+ parseInt(endDays));
            $(this).pikaday({
                firstDay: 1,
                format: 'MMMM DD, YYYY',
                minDate: startDate,
                maxDate: endDate
            });
            $(this).val(moment(startDate).format('MMMM DD, YYYY'));
        });
    // otherwise destroy the existing and get the new input field
    } else {
        $('.pika-single').remove();
        $('.datepicker').each(function (index, value) {
            firstDate = $(this).attr("data-startdate");
            endDays = $(this).attr("data-range");
            var startDate = new Date(firstDate);
            var endDate = new Date();
            // Set date range equal endDay's from now
            endDate.setDate(endDate.getDate()+ parseInt(endDays));
            $(this).pikaday({
                firstDay: 1,
                format: 'MMMM DD, YYYY',
                minDate: startDate,
                maxDate: endDate
            });
            $(this).val(moment(startDate).format('MMMM DD, YYYY'));
        });
    }
}

function modalTabbing() {
    inputs = $('#modal').find(':input:visible:enabled, a');
    firstInput = inputs.first();
    lastInput = inputs.last();

    /*redirect last tab to first input*/
    lastInput.on('keydown', function (e) {
        if ((e.which === 9 && !e.shiftKey)) {
            e.preventDefault();
            firstInput.focus();
        }
    });
}

function ChangeUserId() {
    $.ajax({
        type: "GET",
        url: GetEnvironmentSpecificUrl("/ProfileDetails/ChangeUserID"),
        success: function (jsReturnArgs) {
            window.location.href = jsReturnArgs;
        },
    });
}

function ChangeUserPassword() {
    $.ajax({
        type: "GET",
        url: GetEnvironmentSpecificUrl("/ProfileDetails/ChangeUserPassword"),
        success: function (jsReturnArgs) {
            window.location.href = jsReturnArgs;
        }
    });
}