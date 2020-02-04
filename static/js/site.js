// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.
// Write your JavaScript code.
jQuery(document).ready(function($) {
    var bsDefaults = {
            offset: false,
            overlay: true,
            width: '250px'
        },
        bsMain = $('.bs-offset-main'),
        bsOverlay = $('.bs-canvas-overlay');

    $('[data-toggle="canvas"][aria-expanded="false"]').on('click', function() {


         $('.dropdown').hide();

        var canvas = $(this).data('target'),
            opts = $.extend({}, bsDefaults, $(canvas).data()),
            prop = $(canvas).hasClass('bs-canvas-right') ? 'margin-right' : 'margin-left';

        if (opts.width === '100%')
            opts.offset = false;

        $(canvas).css('width', opts.width);
        if (opts.offset && bsMain.length)
            bsMain.css(prop, opts.width);

        $(canvas + ' .bs-canvas-close').attr('aria-expanded', "true");
        $('[data-toggle="canvas"][data-target="' + canvas + '"]').attr('aria-expanded', "true");
        if (opts.overlay && bsOverlay.length)
            bsOverlay.addClass('show');
        return false;
    });

    $('.bs-canvas-close, .bs-canvas-overlay').on('click', function() {
        var canvas, aria;
        if ($(this).hasClass('bs-canvas-close')) {

            $('.dropdown').show();


            canvas = $(this).closest('.bs-canvas');
            aria = $(this).add($('[data-toggle="canvas"][data-target="#' + canvas.attr('id') + '"]'));
            if (bsMain.length)
                bsMain.css(($(canvas).hasClass('bs-canvas-right') ? 'margin-right' : 'margin-left'), '');
        } else {

          $('.dropdown').show();
            canvas = $('.bs-canvas');
            aria = $('.bs-canvas-close, [data-toggle="canvas"]');
            if (bsMain.length)
                bsMain.css({
                    'margin-left': '',
                    'margin-right': ''
                });
        }
        canvas.css('width', '');
        aria.attr('aria-expanded', "false");
        if (bsOverlay.length)
            bsOverlay.removeClass('show');
        return false;
    });




    /*---------------------------------------------------*/


    function sumOfDataVal(dataArray) {
        return dataArray['datasets'][0]['data'].reduce(function(sum, value) {
            return sum + value;
        }, 0);
    }

    var dataResponse = {
        datasets: [{
            data: [10, 20, 30, 55, 75],
            backgroundColor: [
                '#2b92d8',
                '#2ab96a',
                '#e9c061',
                '#d95d6b',
                '#9173d8'
            ],
            borderColor: '#25272f',
            borderWidth: 0,
            hoverBackgroundColor: [
                '#2b92d8',
                '#2ab96a',
                '#e9c061',
                '#d95d6b',
                '#9173d8'
            ],
            hoverBorderColor: '#25272f',
            hoverBorderWidth: 0
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Football;1500;165;12.5',
            'Hockey;700;165;12.2',
            'Horses;8200;1165;2.3',
            'Baskte;300;165;32.5',
            'Robot;500;165;6.1'
        ]
    };

   
    Chart.defaults.global.tooltips.custom = function(tooltip) {
        // Tooltip Element


        var tooltipEl = document.getElementById('chartjs-tooltip-mobile');

        // Hide if no tooltip
        if (tooltip.opacity === 0) {
            tooltipEl.style.color = "#464950";

            var name1 = 'Main Portfolio';
            var portValue1 = '5644';
            var profit11 = '122';
            var percentProfit1 = '1.23';

            var elPortfolioName1 = '<div id="donut-portfolio-name">' + name1 + '</div>';
            var elPortfolioValue1 = '<div id="donut-portfolio-value">£' + portValue1 + '</div>';
            var elPortfolioProfit1 = '<div id="donut-portfolio-profit" class="down">-£' + profit11 + '</div>';
            var elPortfolioProfitPercent1 = '<div id="donut-portfolio-profit-percent" class="up"><i class="fas fa-sort-up"></i>' + percentProfit1 + '%<div>';



            var tableRoot = tooltipEl.querySelector('div');
            tableRoot.innerHTML = elPortfolioName1 + elPortfolioValue1 + elPortfolioProfit1 + elPortfolioProfitPercent1;


            tooltipEl.style.opacity = 0;
            return;
        }


        // Set caret Position
        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltip.yAlign) {
            tooltipEl.classList.add(tooltip.yAlign);
        } else {
            tooltipEl.classList.add('no-transform');
        }

        function getBody(bodyItem) {
            return bodyItem.lines;
        }

        // Set Text
        if (tooltip.body) {
            var bodyLines = tooltip.body.map(getBody);

            var innerHtml = '<div>';

            bodyLines.forEach(function(body, i) {
                var dataNumber = body[i].split(":");

                var array1 = dataNumber[0].split(";");
                var name = array1[0];
                var portValue = array1[1];
                var profit1 = array1[2];
                var percentProfit = array1[3];


                var perc = dataNumber[1];

                var elPortfolioName = '<div id="donut-portfolio-name">' + name + '</div>';
                var elPortfolioValue = '<div id="donut-portfolio-value">£' + portValue + '</div>';
                //var elPortfolioProfit = '<div id="donut-portfolio-profit">£'+profit1+'<div>';
                //var elPortfolioProfitPercent = '<div id="donut-portfolio-profit-percent">'+percentProfit+'%<div>';




                //var dataValNum = parseInt(dataNumber[1].trim());
                //var dataToPercent = (dataValNum / sumOfDataVal(dataResponse) * 100).toFixed(2) + '%';
                innerHtml += elPortfolioName + elPortfolioValue;
            });

            innerHtml += '</div>';

            var tableRoot = tooltipEl.querySelector('div');
            tableRoot.innerHTML = innerHtml;
        }


        tooltipEl.style.opacity = 1;
        tooltipEl.style.color = "#333";
    };


    /*---------------------------------------------------*/


    var ctx = document.getElementById('myChart').getContext('2d');
    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: dataResponse,
        options: {
            legend: {
                display: false
            },
            cutoutPercentage: 73,
            circumference: 2 * Math.PI,
            maintainAspectRatio: false,
            animation: {
                animateRotate: false,
                animateScale: true
            },
            tooltips: {
                enabled: false,

            }
        }
    });




    /*---------------------------------------------------*/

    var ctx3 = document.getElementById('myChart-mobile').getContext('2d');
    var myDoughnutChart = new Chart(ctx3, {
     type: 'doughnut',
     data: dataResponse,
     options: {
         legend: {
             display: false
         },
         cutoutPercentage: 73,
         circumference: 2 * Math.PI,
         maintainAspectRatio: false,
         animation: {
             animateRotate: false,
             animateScale: false
         },
         tooltips: {
             enabled: false,

         }
        }
    });



    /*---------------------------------------------------*/

    var ctx = document.getElementById('myChartLine').getContext('2d'); 
    var myChart = new Chart(ctx, {
        type: 'line',

        data: {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            datasets: [{
                label: 'apples',
                data: [12, 19, 3, 17, 6, 3, 7],
                backgroundColor: "rgba(153,255,51,0.6)"
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    gridLines: {
                        drawOnChartArea: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        drawOnChartArea: true,
                        drawBorder: false,
                        color: "#eee"
                    },
                    ticks: {
                        padding: 10
                    }
                }]
            },
            legend: {
                display: false,
                labels: {
                    display: false
                }
            },
            elements: {
                point: {
                    radius: 0
                }
            }
        }
    });








    /*---------------------------------------------------*/



    var ctx1 = document.getElementById('myChartLine-mobile').getContext('2d'); 
    var myChart1 = new Chart(ctx1, {
        type: 'line',

        data: {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            datasets: [{
                label: 'apples',
                data: [12, 19, 3, 17, 6, 3, 7],
                backgroundColor: "rgba(153,255,51,0.6)"
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    gridLines: {
                        drawOnChartArea: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        drawOnChartArea: true,
                        drawBorder: false,
                        color: "#eee"
                    },
                    ticks: {
                        padding: 10
                    }
                }]
            },
            legend: {
                display: false,
                labels: {
                    display: false
                }
            },
            elements: {
                point: {
                    radius: 0
                }
            }
        }
    });








    /*----------------------------------------------------*/
    var swiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
        },
    });







   /*----------------------------------------------------*/
 

    


     $('.dropbtn').on('click', function() {
       document.getElementById("myDropdown").classList.toggle("show");
    });



    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }





   /*----------------------------------------------------*/
 



});