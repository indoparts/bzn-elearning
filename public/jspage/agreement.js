$(function () {
    table()
})
function table(tgl1, tgl2) {
    $('#example')
        .dataTable({
            destroy: true,
            responsive: true,
            "processing": true,
            "serverSide": true,
            "ajax": {
                url: `${baseUrl()}${$('#example').attr('url-data').substring(1)}`,
                async: true,
                dataSrc: function (res) {
                    res.recordsTotal = res.data.meta.total;
                    res.recordsFiltered = res.data.meta.total
                    return res.data.data;
                }
            },
            columns: [
                {
                    data: "clients", render: function (data) {
                        return data !== null ?
                            data.fullname :
                            '';
                    }
                },
                {
                    data: "status", render: function (data) {
                        return data === 'agree' ?
                            'Menyetujui' :
                            'Tidak Menyetujui';
                    }
                },
                {
                    data: "id", render: function (data, type) {
                        var html = '<div class="btn-group" role="group" aria-label="Basic example">'
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