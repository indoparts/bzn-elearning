$(function () {
    index();
    $(document).on('click', '.btn-action', function () {
        let type = $(this).attr('type-act')
        if ($(this).attr('type-request') === 'get') {
            get($(this).attr('link'))
                .done(function (res) {
                    $('.form-input').attr('action', `${$('.form-input').attr('action')}/${res.data.id}?_method=PUT`)
                    $('#inputname').val(res.data.name)
                    $('.btn-primary').html('Perbaharui')
                    if (type === 'read') {
                        $('.btn-primary').hide()
                    }else{
                        $('.btn-primary').show()
                    }
                })
                .fail(function (jqXHR, textStatus) {
                    Swal.fire(
                        'Tindakan Gagal!',
                        'Terjadi kesalahan dengan code ' + textStatus + ', hubungi tim pengembang aplikasi!',
                        'info'
                    );
                });
        } else {
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
                    del($(this).attr('link'))
                        .done(function (res) {
                            if (res.status) {
                                index();
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
    });
});
function index() {
    $('#example').DataTable({
        destroy: true,
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: `${$("#example").attr("url")}`,
            type: 'get'
        },
        columns: [
            {
                data: 'name',
                name: 'Nama Role'
            },
            {
                data: 'created_at',
                name: 'Waktu Dibuat'
            },
            {
                data: 'updated_at',
                name: 'Waktu Diubah'
            },
            {
                data: 'action',
                name: '#'
            },
        ]
    });
}