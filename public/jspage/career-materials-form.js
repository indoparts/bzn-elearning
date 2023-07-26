$(function () {
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
    summernote()
    $('.tags-input')
        .on('change', function (event) {
            var $element = $(event.target);
            var $container = $element.closest('.example');

            if (!$element.data('tagsinput')) return;

            var val = $element.val();
            if (val === null) val = 'null';
            var items = $element.tagsinput('items');

            $('code', $('pre.val', $container)).html(
                $.isArray(val)
                    ? JSON.stringify(val)
                    : '"' + val.replace('"', '\\"') + '"'
            );
            $('code', $('pre.items', $container)).html(
                JSON.stringify($element.tagsinput('items'))
            );
        })
        .trigger('change');
    if ($('.html-halaman').attr('data-content') !== 'undefined') {
        var content = JSON.parse($('.html-halaman').attr('data-content'))
        var htmlREndered = ''
        $.each(content, function (i, v) {
            htmlREndered += `<div class="rendered">`
            htmlREndered += `<div class="mb-3 mt-3">`
            htmlREndered += `<label class="form-label">Judul Konten Halaman</label>`
            htmlREndered += `<input type="text" class="form-control" placeholder="Judul halaman" name="title[]" value="${v.title_page}">`
            htmlREndered += `</div>`
            htmlREndered += `<textarea class="form-control konten-halaman" name="content[]">${v.content_page}</textarea>`
            htmlREndered += `</div>`
        });
        $('.html-halaman').append(htmlREndered)
        summernote()
    }
    $('.change-halaman').on('change', function () {
        $('.rendered').remove();
        const data = ($('.html-halaman').attr('data-content') !== 'undefined') ? JSON.parse($('.html-halaman').attr('data-content')) : []

        var htmlREndered = ''
        for (let i = 0; i < $(this).val(); i++) {
            htmlREndered += `<div class="rendered">`
            htmlREndered += `<div class="mb-3 mt-3">`
            htmlREndered += `<label class="form-label">Judul Konten Halaman</label>`
            htmlREndered += `<input type="text" class="form-control" placeholder="Judul halaman" name="title[]" value="${data.length > 0 ? data[i].title_page : ''}">`
            htmlREndered += `</div>`
            htmlREndered += `<textarea class="form-control konten-halaman" name="content[]">${data.length > 0 ? data[i].content_page : ''}</textarea>`
            htmlREndered += `</div>`
        }
        $('.html-halaman').append(htmlREndered)
        summernote()
    })
    $('.btn-submit').on('click', function () {
        $('form').trigger("submit");
    })
})

function summernote() {
    $('.konten-halaman').summernote({
        placeholder: 'Buat konten untuk halaman anda disini.',
        tabsize: 2,
        height: 100,
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview', 'help']]
        ]
    });
}