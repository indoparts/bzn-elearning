import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import LearningCategory from 'App/Models/LearningCategory';
import LearningSubcategory from 'App/Models/LearningSubcategory';
import User from 'App/Models/User';

export default class extends BaseSeeder {
  public async run() {
    const $user = await User.findByOrFail('name', 'Superadmin')
    const cLearningData: any[] = []
    const cLearning = [
      'IT',
      'Kesehatan',
      'Bahasa',
      'Bisnis',
      'Pengelolaan',
      'Pengembangan diri',
      'penjualan & Pemasaran',
      'Konstruksi teknik',
      'Pengajaran & Akademisi',
    ]
    cLearning.forEach(e => {
      cLearningData.push({
        name: e,
        icon: 'example.png',
        created_by: $user.id
      })
    });

    const IT = ['Keamanan jaringan', 'Pemograman', 'Sistem Informasi', 'Pengelolaan', 'Engineering', 'Data Science', 'Basis Data', 'Administrasi', 'AWS', 'Pengelolaan Bisnis', 'CCNA', 'Comptia', 'Jaringan Komputer', 'Cryptocurrency', 'Keamanan Data', 'DevOps', 'Microsoft', 'Keamanan', 'Server', 'Bisnis kecil',
    ]
    const Kesehatan = ['Kesehatan mental', 'Kesehatan', 'Perawatan', 'Pengasuhan', 'Nutrisi', 'Keamanan makanan', 'Farmakologi', 'Demensia', 'Disabilitas', 'Kesehatan dan Kebugaran', 'Kebersihan', 'Pengelolaan', 'Terapi fisik', 'Fisiologi', 'Fisioterapi', 'Penyalahgunaan Zat', 'Terapi', 'Trauma',
    ]
    const Bahasa = ['Bahasa Inggris', 'Bahasa Spanyol', 'Bahasa Jerman', 'Bahasa Irlandia', 'Bahasa Perancis', 'Bahasa Cina', 'Bahasa Swedia', 'Bahasa Jepang', 'Bahasa Inggris Bisnis', 'Percakapan bahasa inggris', 'Bahasa Inggris Untuk Batang', 'Literatur Inggris', 'Pengucapan bahasa Inggris', 'Kosakata bahasa Inggris', 'Penulisan Bahasa Inggris', 'Resepsionis', 'TESL', 'Bepergian',
    ]
    const Bisnis = ['Sumber daya manusia', 'Operasi', 'Manajemen rantai persediaan', 'Pelayanan pelanggan', 'Manufaktur', 'Kesehatan dan keselamatan', 'Manajemen mutu', 'Perdagangan elektronik', 'Pengelolaan', 'Penjualan', 'Akuntansi', 'Keramahan', 'Kemampuan berkomunikasi', 'Audit', 'ISO', 'Pemasaran', 'Microsoft', 'Motivasi', 'Produktifitas',
    ]
    const Pengelolaan = ['Operasi', 'Akuntansi', 'Pengawasan', 'Audit', 'Kesehatan dan keselamatan', 'Sumber daya manusia', 'ISO', 'Bersandar', 'Manufaktur', 'Motivasi', 'Perawatan', 'Produktifitas', 'Manajemen proyek', 'Manajemen mutu', 'Pengecer', 'Manajemen rantai persediaan',
    ]
    const PengembanganDiri = ['Kebugaran', 'Psikologi', 'Keuangan', 'Musik', 'Fotografi', 'Kecemasan', 'Kemampuan berkomunikasi', 'Depresi', 'Diet', 'Dslr', 'Kesehatan', 'Kesehatan mental', 'Kerangka berpikir', 'Motivasi', 'Psikologi Positif', 'Manajemen stres', 'Terapi', 'Manajemen waktu',
    ]
    const KontruksiTeknik = ['Kewiraswastaan', 'Pengelolaan', 'Pemasaran Digital', 'Periklanan', 'Amazon', 'Pemasaran Konten', 'Keamanan data', 'Etika', 'Riset Pasar', 'Strategi pemasaran', 'Kemampuan presentasi', 'Pemasaran produk', 'Pengecer', 'Penjualan', 'Media sosial',
    ]
    const Akademis = ['Sains', 'Sejarah', 'Geografi', 'Hukum', 'Jurnalistik', 'Ekonomi', 'Matematika', 'literatur', 'Pendidikan Orang Dewasa', 'Arsitektur', 'Manajemen Kelas', 'Perubahan iklim', 'Psikologi Pendidikan', 'Anatomi manusia', 'Motivasi', 'Teori musik', 'Psikologi', 'Pengajaran', 'Kemampuan menulis',
    ]
    const Penjualan = ['Kewiraswastaan','Pengelolaan','Pemasaran Digital','Periklanan','Amazon','Pemasaran Konten','Keamanan data','Etika','Riset Pasar','Strategi pemasaran','Kemampuan presentasi','Pemasaran produk','Pengecer','Penjualan','Media sosial',
    ]

    if (await LearningCategory.createMany(cLearningData)) {
      const $cekit = await LearningCategory.findBy('name', 'IT')
      if ($cekit) {
        const $dataIt: any[] = []
        IT.forEach(e => {
          $dataIt.push({
            learning_category_id: $cekit.id,
            created_by: $user.id,
            icon: `default.png`,
            cover_image: `default.png`,
            name: e,
          })
        })
        await LearningSubcategory.createMany($dataIt)
      }

      const $cekKesehatan = await LearningCategory.findBy('name', 'Kesehatan')
      if ($cekKesehatan) {
        const $dataKesehatan: any[] = []
        Kesehatan.forEach(e => {
          $dataKesehatan.push({
            learning_category_id: $cekKesehatan.id,
            created_by: $user.id,
            icon: `default.png`,
            cover_image: `default.png`,
            name: e,
          })
        })
        await LearningSubcategory.createMany($dataKesehatan)
      }

      const $cekBahasa = await LearningCategory.findBy('name', 'Bahasa')
      if ($cekBahasa) {
        const $dataBahasa: any[] = []
        Bahasa.forEach(e => {
          $dataBahasa.push({
            learning_category_id: $cekBahasa.id,
            created_by: $user.id,
            icon: `default.png`,
            cover_image: `default.png`,
            name: e,
          })
        })
        await LearningSubcategory.createMany($dataBahasa)
      }

      const $cekBisnis = await LearningCategory.findBy('name', 'Bisnis')
      if ($cekBisnis) {
        const $dataBisnis: any[] = []
        Bisnis.forEach(e => {
          $dataBisnis.push({
            learning_category_id: $cekBisnis.id,
            created_by: $user.id,
            icon: `default.png`,
            cover_image: `default.png`,
            name: e,
          })
        })
        await LearningSubcategory.createMany($dataBisnis)
      }

      const $cekPengelolaan = await LearningCategory.findBy('name', 'Pengelolaan')
      if ($cekPengelolaan) {
        const $dataPengelolaan: any[] = []
        Pengelolaan.forEach(e => {
          $dataPengelolaan.push({
            learning_category_id: $cekPengelolaan.id,
            created_by: $user.id,
            icon: `default.png`,
            cover_image: `default.png`,
            name: e,
          })
        })
        await LearningSubcategory.createMany($dataPengelolaan)
      }
      const $cekPengDiri = await LearningCategory.findBy('name', 'Pengembangan diri')
      if ($cekPengDiri) {
        const $dataPengDiri: any[] = []
        PengembanganDiri.forEach(e => {
          $dataPengDiri.push({
            learning_category_id: $cekPengDiri.id,
            created_by: $user.id,
            icon: `default.png`,
            cover_image: `default.png`,
            name: e,
          })
        })
        await LearningSubcategory.createMany($dataPengDiri)
      }

      const $cekPenPem = await LearningCategory.findBy('name', 'penjualan & Pemasaran')
      if ($cekPenPem) {
        const $dataPenPem: any[] = []
        Penjualan.forEach(e => {
          $dataPenPem.push({
            learning_category_id: $cekPenPem.id,
            created_by: $user.id,
            icon: `default.png`,
            cover_image: `default.png`,
            name: e,
          })
        })
        await LearningSubcategory.createMany($dataPenPem)
      }

      const $cekTeknik = await LearningCategory.findBy('name', 'Konstruksi teknik')
      if ($cekTeknik) {
        const $dataTeknik: any[] = []
        KontruksiTeknik.forEach(e => {
          $dataTeknik.push({
            learning_category_id: $cekTeknik.id,
            created_by: $user.id,
            icon: `default.png`,
            cover_image: `default.png`,
            name: e,
          })
        })
        await LearningSubcategory.createMany($dataTeknik)
      }

      const $cekPengajaran = await LearningCategory.findBy('name', 'Pengajaran & Akademisi')
      if ($cekPengajaran) {
        const $dataPengajaran: any[] = []
        Akademis.forEach(e => {
          $dataPengajaran.push({
            learning_category_id: $cekPengajaran.id,
            created_by: $user.id,
            icon: `default.png`,
            cover_image: `default.png`,
            name: e,
          })
        })
        await LearningSubcategory.createMany($dataPengajaran)
      }
    }
  }
}


