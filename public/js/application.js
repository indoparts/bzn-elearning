$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="_csrf"]').attr('content'),
    'Content-Type': 'application/json'
  }
});
function baseUrl() {
  return $('meta[name="base_url"]').attr('content')
}
function post(url, data) {
  if (url.indexOf('/') > -1) {
    url = url.substring(1)
  }
  return $.ajax({
    type: 'POST',
    url: `${baseUrl()}${url}`,
    data: data,
    processData: false,
    contentType: false,
  });
}
function put(url, data) {
  return $.ajax({
    type: 'PUT',
    url: `${baseUrl()}${url}`,
    data: data,
  });
}
function patch(url, data) {
  return $.ajax({
    type: 'PATCH',
    url: `${baseUrl()}${url}`,
    data: data
  });
}
function get(url) {
  return $.ajax({
    type: 'GET',
    url: `${baseUrl()}${url}`
  });
}
function del(url) {
  return $.ajax({
    type: 'delete',
    url: `${baseUrl()}${url}`,
  })
}
