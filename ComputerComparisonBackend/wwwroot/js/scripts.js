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

    // Define a range of time values in hours
    const timeRange = [0, 3000];

    // Calculate the cost of Local Solution and Cloud Compute for each time value
    const localSolutionCosts = timeRange.map(function (time) {
        return (600 + 159) + (22 * 100) * time / 100000;
    });
    const cloudComputeCosts = timeRange.map(function (time) {
        return 0.4 * time;
    });

    // Create chart with calculated data
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            // Use the calculated costs as the chart data
            labels: timeRange,
            datasets: [{
                label: 'Local Solution',
                data: localSolutionCosts,
                borderColor: 'red'
            }, {
                label: 'Cloud Compute',
                data: cloudComputeCosts,
                borderColor: 'grey'
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Comparison of Local Solution and Cloud Compute'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time (hours)'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)',
                        borderDash: [5, 5]
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Cost (USD)'
                    }
                }
            }
        }
    });

    chart.data.datasets[0].data = localSolutionCosts;
    chart.data.datasets[1].data = cloudComputeCosts;
    chart.update();

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
            updateChart(data);

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
            updateChart(data);

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

function updateChart(response) {
    // Define a range of time values in hours
    const timeRange = [0, Math.ceil(response.breakEvenPoint / 1000) * 1000];

    // Calculate the cost of Local Solution and Cloud Compute for each time value
    const localSolutionCosts = timeRange.map(function (time) {
        return (response.costOfRig + response.graphicsCard.msrp) + (response.costOfElectricity * response.graphicsCard.powerDraw) * time / 100000;
    });
    const cloudComputeCosts = timeRange.map(function (time) {
        return response.cheapestCloudCompute.costPerHour * time;
    });

    // Update the chart with the calculated data
    const chart = Chart.getChart("myChart");
    chart.data.labels = timeRange;
    chart.data.datasets[0].data = localSolutionCosts;
    chart.data.datasets[1].data = cloudComputeCosts;
    chart.update();
}