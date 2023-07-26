import View from '@ioc:Adonis/Core/View'
View.global('range', (start, size) => {
  return [...Array(size).keys()].map(i => i + start)
})
View.global('menu', [
  {
    url: '/beranda',
    text: 'Beranda',
    icon: '<i class="fa-solid fa-tablet-screen-button"></i>'
  },
  {
    text: 'Sistem',
    child: [
      { url: '/pengguna', text: 'Pengguna', icon: '<i class="fa-solid fa-users"></i>' },
      { url: '/role', text: 'Peran', icon: '<i class="fa-brands fa-critical-role"></i>' },
      { url: '/permission', text: 'Akses', icon: '<i class="fa-brands fa-keycdn"></i>' },
      { url: '/set-role-permission', text: 'Pengaturan Akses Peran', icon: '<i class="fa-solid fa-unlock"></i>' },
    ]
  },
  {
    url: '/client',
    text: 'Pelanggan',
    icon: '<i class="fa-solid fa-users-line"></i>'
  },
  {
    text: 'Materi belajar',
    child: [
      { url: '/learning-category', text: 'Kategori', icon: '<i class="fa-solid fa-cube"></i>' },
      { url: '/learning-subcategory', text: 'Sub Kategori', icon: '<i class="fa-solid fa-table-cells-large"></i>' },
      { url: '/learning-material', text: 'Materi', icon: '<i class="fa-solid fa-book-open"></i>' },
    ]
  },
  {
    text: 'Materi karir',
    child: [
      { url: '/career-category', text: 'Kategori', icon: '<i class="fa-solid fa-cube"></i>' },
      { url: '/career-subcategory', text: 'Sub Kategori', icon: '<i class="fa-solid fa-table-cells-large"></i>' },
      { url: '/career-material', text: 'Materi', icon: '<i class="fa-solid fa-book-open"></i>' },
    ]
  },
  {
    text: 'Syarat & Ketentuan',
    child: [
      { url: '/masterdata-term-condition', text: 'Master Data', icon: '<i class="fa-solid fa-cube"></i>' },
      { url: '/client-term-condition', text: 'Daftar Persetujuan', icon: '<i class="fa-solid fa-table-cells-large"></i>' },
    ]
  }
])
