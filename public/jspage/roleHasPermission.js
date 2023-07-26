$(function () {
    $(document).on('change', '#inputGroupSelect04', function () {
        let role_id = $(this).val()
        const url = `${$(this).attr('url-get')}/${role_id}`
        $.get(url, function (res) {
            if (res.data.length > 0) {
                res.data.forEach(e => {
                    $(`#permission-${e.permission_id}`).prop("checked", true)
                });
            } else {
                $('.form-check-input').prop("checked", false)
            }
        });
    })
})