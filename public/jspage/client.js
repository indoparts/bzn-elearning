$(function () {
    index();
    $(document).on('click', '.btn-action', function () {
        if ($(this).attr('type-request') === 'get') {
            window.location.replace($(this).attr('link'));
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
                data: 'fullname',
                name: 'fullname'
            },
            {
                data: 'username',
                name: 'username'
            },
            {
                data: 'email',
                name: 'email'
            },
            {
                data: 'status',
                name: 'status'
            },
            {
                data: 'created_at',
                name: 'created_at'
            },
            {
                data: 'action',
                name: '#'
            },
        ]
    });
}