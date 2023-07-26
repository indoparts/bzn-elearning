$(function () {
    $(".datepicker1").datepicker({
        format: 'yyyy-mm-dd'
    });
    $(".datepicker2").datepicker({
        format: 'yyyy-mm-dd'
    });
    $(".datepicker").on("change", function () {
        let tgl1 = new Date($(".datepicker1").val())
        let tgl2 = new Date($(".datepicker2").val())
        var a = moment(tgl1);
        var b = moment(tgl2);
        let calculate = a.diff(b, 'minutes')
        if (calculate > 0) {
            $(".datepicker1").val(null)
            $(".datepicker2").val(null)
            Swal.fire({
                title: 'Rentang tanggal bermasalah',
                text: "Tanggal yang anda masukan tidak valid!!",
                icon: 'info',
            })
        } else {
            table($(".datepicker1").val(), $(".datepicker2").val())
        }
    });
    table($(".datepicker1").val(), $(".datepicker2").val())
})
function table(tgl1, tgl2) {
    $('#example')
        .dataTable({
            destroy: true,
            responsive: true,
            "processing": true,
            "serverSide": true,
            "ajax": {
                url: `${baseUrl()}${$('#example').attr('url-data').substring(1)}?tgl1=${tgl1}&tgl2=${tgl2}`,
                async: true,
                dataSrc: function (res) {
                    res.recordsTotal = res.data.meta.total;
                    res.recordsFiltered = res.data.meta.total
                    return res.data.data;
                }
            },
            columns: [
                { data: 'title' },
                {
                    data: "subcategory", render: function (data, type, row, meta) {
                        return data !== null ?
                            data.name :
                            '';
                    }
                },
                {
                    data: "createdby", render: function (data, type, row, meta) {
                        return data !== null ?
                            data.name :
                            '';
                    }
                },
                {
                    data: "tag", render: function (data, type, row, meta) {
                        var badge = ''
                        arr = jQuery.map(data, function (n, i) {
                            badge += `<span class="badge bg-secondary">${n.tags}</span> `
                        });
                        return type === 'display' ?
                            badge :
                            '';
                    }
                },
                {data:"created_at"},
                {data:"updated_at"},
                {
                    data: "id", render: function (data, type, row, meta) {
                        var html = '<div class="btn-group" role="group" aria-label="Basic example">'
                        html += `<a href="${baseUrl()}${$('#example').attr('url-data').substring(1)}/${data}" class="btn btn-info"><i class="fa-solid fa-file"></i></a>`
                        html += `<a href="${baseUrl()}${$('#example').attr('url-data').substring(1)}/${data}/edit" class="btn btn-secondary"><i class="fa-solid fa-file-pen"></i></a>`
                        html += `<button type="button" onclick="hapus('${$('#example').attr('url-data').substring(1)}/${data}')" class="btn btn-danger"><i class="fa-sharp fa-solid fa-trash"></i></button>`
                        html += '</div>'
                        return type === 'display' ?
                            html :
                            '';
                    }
                },
            ],
        });
}

function hapus(params) {
    Swal.fire({
        title: 'Apa kamu yakin?',
        text: "Kamu tidak akan dapat mengembalikan ini!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!'
    }).then((result) => {
        if (result.isConfirmed) {
            del(params)
                .done(function (res) {
                    if (res.status) {
                        table($(".datepicker1").val(), $(".datepicker2").val())
                        Swal.fire(
                            'Dihapus!',
                            'File Anda telah dihapus.',
                            'success'
                        );
                    } else {
                        Swal.fire(
                            'Gagal Dihapus!',
                            'Terjadi kesalahan, hubungi tim pengembang aplikasi!',
                            'info'
                        );
                    }
                })
                .fail(function (jqXHR, textStatus) {
                    Swal.fire(
                        'Gagal Dihapus!',
                        'Terjadi kesalahan dengan code ' + textStatus + ', hubungi tim pengembang aplikasi!',
                        'info'
                    );
                });
        }
    })
}