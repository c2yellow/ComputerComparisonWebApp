/*!
* Start Bootstrap - Creative v7.0.7 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    var graphicsCardsLoaded = false;

    $('.fade').css('opacity', 1);

    $('[lang="zh"]').hide();

    $('#languageToggle').click(function () {
        $('[lang="zh"]').toggle();
        $('[lang="en"]').toggle();
    });

    $('#chooseForMeButton').on('click', function () {
        $('#chooseForMe').collapse('show');
        $('#iWillChoose').collapse('hide');
    });

    $('#iWillChooseButton').on('click', function () {

        const graphicsCardDropdown =  $('#graphicsCardDropdown')

        if (!graphicsCardsLoaded) {
            // Fetch the list of graphics cards
            $.get('/api/graphics-cards', function (data) {
                // Clear existing options
                graphicsCardDropdown.empty();

                // Iterate through the fetched graphics cards list
                data.forEach(function (graphicsCard) {
                    // Add new options to the dropdown
                    graphicsCardDropdown.append(`<option value="${graphicsCard.id}">${graphicsCard.name}</option>`);

                });
                // mark the graphics card list as loaded
                graphicsCardsLoaded = true;

                $('#chooseForMe').collapse('hide');
                $('#iWillChoose').collapse('show');
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error("Error: " + textStatus + ": " + errorThrown);
            });

        } else {
            $('#chooseForMe').collapse('hide');
            $('#iWillChoose').collapse('show');
        }
    });

    $('#goForMeButton').on('click', function () {

        $('.fade').css('opacity', 0);
        const vramSize = $("#vramSlider").val();
        const efficiency = $("#efficiencyRadio").prop("checked");

        $.get('/api/comparison', { vramSize: vramSize, efficiency: efficiency }, function (data) {

            updateComparisonElements(data);

            $('#chooseForMe').collapse('hide');
            $('.fade').css('opacity', 1);

        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error("Error: " + textStatus + ": " + errorThrown);
        });
    });

    $('#goIWillButton').on('click', function () {

        $('.fade').css('opacity', 0);
        const graphicsCardId = $('#graphicsCardDropdown').val();

        $.get(`/api/comparison/${graphicsCardId}`, function (data) {

            updateComparisonElements(data);

            $('#iWillChoose').collapse('hide');
            $('.fade').css('opacity', 1);

        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error("Error: " + textStatus + ": " + errorThrown);
        });
    });
});

function updateComparisonElements(response) {
    // Update Graphics Card information
    $('#graphicsCardName').text(response.graphicsCard.name);
    $('#graphicsCardVram').text(response.graphicsCard.vram + ' GB');
    $('#graphicsCardPowerDraw').text(response.graphicsCard.powerDraw + 'W');
    $('#graphicsCardTrainingThroughput').text(response.graphicsCard.trainingThroughput + '%');
    $('#graphicsCardMSRP').text('$' + response.graphicsCard.msrp);

    // Update Cloud Compute Services information
    $('#cloudComputeServiceName').text(response.cheapestCloudCompute.name);
    $('#cloudComputeServiceCostPerHour').text('$' + response.cheapestCloudCompute.costPerHour);
    $('#cloudComputeServiceTrainingThroughput').text(response.cheapestCloudCompute.trainingThroughput + '%');

    // Update costOfRig and costOfElectricity
    $('#costOfRig').text(response.costOfRig);
    $('#costOfElectricity').text(response.costOfElectricity);

    // Update Break-even point
    $('#breakEvenPoint').text(response.breakEvenPoint);
}