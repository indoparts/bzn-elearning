$(function () {
    index();
    $(document).on('click', '.btn-action', function () {
        if ($(this).attr('type-request') === 'get') {
            let link = $(this).attr('link')
            let xlink=[]
            var x = link.split('/')
            if (x.length > 2) {
                $('.bt-update').prop( "disabled", false );
                xlink.push(`${x[0]}/${x[1]}`)
            }else{
                $('.bt-update').prop( "disabled", true );
                xlink.push(`${x[0]}/${x[1]}`)
            }
            get(link)
                .done(function (res) {
                    $('.form-input-form-update').attr('action', `${xlink[0]}?_method=patch`)
                    $('.img-file').attr('src', `${baseUrl()}images/category-career/${res.icon}`)
                    $('.name-update').val(res.name)
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
    $('#button-addon-subcategory').click(function () {
        let htmlParse = '<div class="input-group">'
        htmlParse += '<input type="text" class="form-control" placeholder="Nama Sub Kategori" name="subcategory_name[]">'
        htmlParse += '<input type="file" class="form-control" name="subcategoryicon[]">'
        htmlParse += '<button class="btn btn-outline-secondary" type="button" id="button-delete-subcategory"><i class="fa-sharp fa-solid fa-trash"></i></button>'
        htmlParse += '</div>'
        $('#form-rendered').append(htmlParse)
    })
    $(document).on('click', '#button-delete-subcategory', function (e) {
        e.preventDefault();
        $(this).parent().remove();
    })
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
                name: 'Nama Kategori'
            },
            {
                data: 'action',
                name: '#'
            },
        ]
    });
}