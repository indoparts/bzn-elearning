$(function () {
    index();
    var linkSelect2 = $('.select').attr('url-data')
    $('.select').select2({
        minimumInputLength: 2,
        ajax: {
            url: linkSelect2,
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term,
                };
            },
            processResults: function (res) {
                return {
                    results: $.map(res.data, function (res) {
                        return {
                            text: res.name,
                            id: res.id
                        }
                    }),
                };
            },
            cache: true
        }
    });
    $(document).on('click', '.btn-action', function () {
        if ($(this).attr('type-request') === 'get') {
            let link = $(this).attr('link')
            let xlink = []
            var x = link.split('/')
            if (x.length > 2) {
                $('.bt').prop("disabled", false);
                xlink.push(`${x[0]}/${x[1]}`)
            } else {
                $('.bt').prop("disabled", true);
                xlink.push(`${x[0]}/${x[1]}`)
            }
            get(link)
                .done(function (res) {
                    $('.form-input-form-send').attr('action', `${xlink[0]}?_method=patch`)
                    $('.img-file').attr('src', `${baseUrl()}images/sub-category-learning/${res[0].icon}`)
                    $('.name').val(res[0].name)
                    $('.form-select').html(`<option value="${res[0].category.id}" selected>${res[0].category.name}</option>`)
                })
                .fail(function (jqXHR, textStatus) {
                    Swal.fire(
                        'Gagal Dihapus!',
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
                data: 'icon',
                name: 'Icon'
            },
            {
                data: 'name',
                name: 'Nama Sub Kategori'
            },
            {
                data: 'action',
                name: '#'
            },
        ]
    });
}