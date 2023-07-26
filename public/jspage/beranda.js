document.addEventListener("DOMContentLoaded", function () {
    var ctx = document.getElementById("chartjs-dashboard-line").getContext("2d");
    var gradient = ctx.createLinearGradient(0, 0, 0, 225);
    gradient.addColorStop(0, "rgba(215, 227, 244, 1)");
    gradient.addColorStop(1, "rgba(215, 227, 244, 0)");
    // Line chart
    new Chart(document.getElementById("chartjs-dashboard-line"), {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
                label: "Sales ($)",
                fill: true,
                backgroundColor: gradient,
                borderColor: window.theme.primary,
                data: [
                    2115,
                    1562,
                    1584,
                    1892,
                    1587,
                    1923,
                    2566,
                    2448,
                    2805,
                    3438,
                    2917,
                    3327
                ]
            }]
        },
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            tooltips: {
                intersect: false
            },
            hover: {
                intersect: true
            },
            plugins: {
                filler: {
                    propagate: false
                }
            },
            scales: {
                xAxes: [{
                    reverse: true,
                    gridLines: {
                        color: "rgba(0,0,0,0.0)"
                    }
                }],
                yAxes: [{
                    ticks: {
                        stepSize: 1000
                    },
                    display: true,
                    borderDash: [3, 3],
                    gridLines: {
                        color: "rgba(0,0,0,0.0)"
                    }
                }]
            }
        }
    });
});
$(function () {
    $('.table-pelanggan')
        .dataTable({
            destroy: true,
            responsive: true,
            "processing": true,
            "serverSide": true,
            "ajax": {
                url: `${baseUrl()}${$('.table-pelanggan').attr('url-data').substring(1)}`,
                async: true,
                dataSrc: function (res) {
                    res.recordsTotal = res.data.meta.total;
                    res.recordsFiltered = res.data.meta.total
                    return res.data.data;
                }
            },
            columns: [
                { data: "frontname" },
                { data: "midname" },
                { data: "backname" },
                { data: "fullname" },
                { data: "username" },
                { data: "email" },
                {
                    data: "status", render: function (data, type) {
                        var badge = `<span class="badge bg-${color(data)}">${textString(data)}</span>`
                        return type === 'display' ?
                            badge :
                            '';
                    }
                },
            ],
        });
})

function color(params) {
    if (params === 'block') {
        return 'danger'
    } else if (params === 'inactive') {
        return 'warning'
    } else if (params === 'active') {
        return 'info'
    }
}
function textString(params) {
    if (params === 'block') {
        return 'Blokir'
    } else if (params === 'inactive') {
        return 'Tidak aktif'
    } else if (params === 'active') {
        return 'Aktif'
    }
}