$(document).ready(function() {
    $.get('/vacation', function(data) {
        data.forEach(function(vacation) {
            const startDate = vacation.beginning.substring(0, 10);
            const endDate = vacation.ending.substring(0, 10);

            const vacationElement = $('<div>').text(
                `Name: ${vacation.name},  Reason: ${vacation.reasonL},  Start Date: ${startDate},  End Date: ${endDate}`
            );
            $('#vacations').append(vacationElement);
        });
    });
});

