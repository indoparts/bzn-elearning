import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CareerCategory from 'App/Models/CareerCategory'
import User from 'App/Models/User';

export default class extends BaseSeeder {
  public async run() {
    const $user = await User.findByOrFail('name', 'Superadmin')
    const cCareerData: any[] = []
    const cCareer = [
      'Pertanian, Pangan, dan Sumber Daya Alam',
      'Ilmu Kesehatan',
      'Keuangan',
      'Information Technology',
      'Pendidikan dan Pelatihan',
      'Manajemen dan Administrasi Bisnis',
      'Pemasaran, Penjualan, dan Layanan',
      'Perhotelan dan Pariwisata',
      'Sains, Teknologi, Teknik, dan Matematika',
      'Arsitektur dan Konstruksi',
      'Pemerintahan dan Administrasi Publik',
      'Hukum, Keamanan Publik, Pemasyarakatan, dan Keamanan',
      'Manufaktur',
      'Transportasi, Distribusi, dan Logistik',
      'Pelayanan Masyarakat',
      'Seni, Teknologi Audio/Video, dan Komunikasi'
    ];

    const $pertanian = ['Kimiawan Pertanian', 'Konsultan Pertanian', 'Insinyur pertanian', 'Operator Alat Pertanian', 'Inspektur Pertanian', 'Ahli agronomi', 'Penjaga Hewan', 'Ahli Genetika Hewan', 'Ilmuwan Hewan', 'Akuakultur', 'Arboris', 'Tukang roti', 'Pembuat bir', 'Cokelat', 'Koki Penganan', 'Ilmuwan Konservasi', 'Peternak Susu', 'Penyuling', 'ahli enologi', 'Ilmuwan lingkungan', 'Pembasmi', 'Manajer Peternakan', 'Nelayan', 'Pekerja Persiapan Makanan', 'Teknisi Ilmu Pangan', 'Ilmuwan Pangan', 'Manajer Layanan Makanan', 'Rimbawan', 'Tukang kebun', 'Hortikulturis', 'Pengawas Layanan Makanan Rumah Sakit', 'Ahli hidrologi', 'Logger', 'Penebang', 'Ahli biologi kelautan', 'Naturalis', 'Petani Organik', 'Penjaga Taman', 'Manajer Patiseri', 'Ahli Geologi Perminyakan', 'Ilmuwan Tumbuhan', 'Tangan Peternakan', 'Pengusaha peternakan', 'Ilmuwan Tanah', 'Ahli Bedah Pohon', 'Operator Instalasi Pengolahan Air Limbah', 'Ahli Biologi Margasatwa', 'Pelestari Satwa Liar', 'Dokter Hewan Kebun Binatang',
    ]

    const $kesehatan = ['Ahli akupunktur', 'Perawat Perawatan Akut', 'Spesialis Pendidikan Jasmani Adaptasi', 'Alergi', 'Ahli anestesi', 'Asisten Ahli Anestesi', 'Terapis Seni', 'Atlet', 'Pelatih atletik', 'Praktisi Ayurveda', 'Ahli biokimia', 'Perawat Jantung', 'Ahli jantung', 'Ahli Bedah Kardiotoraks', 'Teknisi Kardiovaskular', 'Asisten Perawat Bersertifikat', 'Ketua petugas medis', 'Spesialis Kehidupan Anak', 'Psikiater Anak', 'Terapis Anak', 'Asisten Chiropractic', 'Chiropractor', 'Ahli Diet Klinis', 'Ilmuwan Laboratorium Klinis', 'Spesialis Perawat Klinis', 'Perawat kosmetik', 'Psikolog Konseling', 'Asisten dokter gigi', 'Kebersihan gigi', 'Teknisi Gigi', 'Dokter gigi', 'Dermatolog', 'Asisten Dokter Dermatologi', 'Psikolog Perkembangan', 'Perawat Dialisis', 'Teknisi Dialisis', 'Ahli diet', 'Teknisi medis gawat darurat', 'Perawat Endoskopi', 'Teknisi Endoskopi', 'Pakar Kesehatan Lingkungan', 'Ahli epidemiologi', 'Perawat UGD', 'Latihan Fisiologis', 'Psikolog Eksperimental', 'Praktisi Perawat Keluarga', 'Dokter Keluarga', 'Perawat Forensik', 'Dokter Umum', 'Konselor Genetik', 'Ahli Bedah Laparoskopi Ginekologi', 'Ginekolog', 'Kepala perawat', 'Manajer Informasi Kesehatan', 'Teknisi Informasi Kesehatan', 'Spesialis Promosi Kesehatan', 'Manajer Pelayanan Kesehatan', 'Teknisi Kesehatan', 'Spesialis Alat Bantu Dengar', 'Penjual jamu', 'Histoteknik', 'Perawat Kesehatan Rumah', 'Perawat Rumah Sakit', 'Petugas Rumah Sakit', 'Perawat bayi', 'Radiolog Intervensi', 'Kinesiolog', 'Persalinan dan Persalinan Perawat', 'Konsultan Laktasi', 'Insinyur mekanik', 'Asisten Medis', 'Biller Medis', 'Kode Medis', 'Direktur Medis', 'Dokter Dosimetri', 'Bengkel Peralatan Medis', 'Teknisi Lab Medis', 'Manajer Kantor Medis', 'Fisikawan Medis', 'Residen Medis', 'Juru Tulis Medis', 'Ajudan Kesehatan Mental', 'Konselor Kesehatan Jiwa', 'Teknisi Kesehatan Jiwa', 'Bidan', 'Teknisi MRI', 'Ahli neonatologi', 'Ahli saraf', 'Ahli saraf', 'Ahli bedah saraf', 'Perawat Anestesi', 'Praktisi keperawatan', 'Assosiasi Keperawatan', 'Pendidik Keperawatan', 'Spesialis Kesehatan dan Keselamatan Kerja', 'Perawat Kesehatan Kerja', 'Terapis okupasi', 'Onkologi', 'Dokter mata', 'Ahli kacamata', 'Ahli Bedah Mulut & Maksilofasial', 'Tertib', 'Paramedis', 'Ahli patologi', 'Perawat Anak', 'Dokter anak', 'Perfusionis', 'Apoteker', 'Teknisi Farmasi', 'Phlebotomist', 'Terapis Fisik', 'Asisten Terapis Fisik', 'Asisten Dokter', 'Ilmuwan Dokter', 'Ahli Bedah Plastik dan Rekonstruksi', 'Ahli penyakit kaki', 'Dokter Perawatan Primer', 'Prostetik', 'Prostodontis', 'Perawat Terdaftar Praktik Lanjutan Psikiatri', 'Teknisi Psikiatri', 'Psikiater', 'Psikolog', 'Penyuluh Kesehatan Masyarakat', 'Ahli Onkologi Radiasi', 'Radiolog', 'Teknisi Radiologi', 'Mantri kesehatan', 'Terapis pernapasan', 'Perawat Sekolah (Profesional Terdaftar)', 'Psikolog Sosial', 'Ahli patologi wicara', 'Dokter Kedokteran Olahraga', 'Ahli bedah', 'Asisten Bedah', 'Perawat Bedah', 'Perawat Perjalanan', 'Teknisi USG', 'Ahli urologi', 'Dokter hewan', 'Asisten Dokter Hewan', 'Dokter Bedah Hewan', 'Teknisi Hewan', 'Ahli virus', 'Terapis Yoga', 'Penjaga kebun binatang',
    ]

    const $keuangan = ['Akuntan', 'Rekan Akuntansi', 'Manajer aset', 'Teller Bank', 'Bankir', 'Spesialis Penagihan', 'Pemegang buku', 'Makelar', 'Analis Anggaran', 'Akuntan', 'Pemeriksa Klaim', 'Pinjaman Komersial Lebih Dekat', 'Pedagang Komoditi', 'Bankir Perusahaan', 'Akuntan biaya', 'Analis Kredit', 'Manajer Kredit', 'Spesialis Perbaikan Kredit', 'Pedagang Kripto', 'Penagih hutang', 'Ekonom', 'Agen Terdaftar', 'Ekonom Lingkungan', 'Analis Ekuitas', 'Direktur Keuangan', 'Akuntan keuangan', 'Penasihat keuangan', 'Analis Keuangan', 'Pelatih Keuangan', 'Pengontrol keuangan', 'Insinyur Keuangan', 'Analis Hedge Fund', 'Ekonom Industri', 'Adjuster Asuransi', 'Agen Penjualan Asuransi', 'Auditor internal', 'Bankir Investasi', 'Analis Perbankan Investasi', 'Manajer Dana Investasi', 'Konselor Pinjaman', 'Petugas pinjaman', 'Pemroses Pinjaman', 'Makroekonomi', 'Akuntan manajemen', 'Ahli ekonomi mikro', 'Perencana Keuangan Pribadi', 'Analis Harga', 'Pedagang Proprietary', 'Akuntan Publik', 'Spesialis Manajemen Risiko', 'Penyedia Pajak', 'Pedagang', 'Penanggung',
    ]

    const $it = ['Pelatih Agile', 'Enginer AI', 'Pengembang Aplikasi', 'Pemrogram Bisnis', 'Kepala Penerangan', 'Arsitek Awan', 'Ilmuwan Komputasi', 'Programmer komputer', 'Spesialis Keamanan Komputer', 'Teknisi Servis Komputer', 'Operator Sistem Komputer', 'Analis data', 'Arsitek Data', 'Operator Entri Data', 'Konsultan Privasi Data', 'Ilmuwan Data', 'Spesialis Gudang Data', 'Administrator basis data', 'Arsitek Basis Data', 'Pengembang Stack Penuh', 'Penguji Game', 'Konsultan TI', 'Manajer IT', 'Manajer Proyek TI', 'Spesialis TI', 'Insinyur Pembelajaran Mesin', 'Administrator Jaringan', 'Arsitek Jaringan', 'Desainer Jaringan', 'Insinyur Keamanan Jaringan', 'Pengembang Python', 'Scrum Master', 'Pakar SEO', 'Arsitek perangkat lunak', 'Pengembang perangkat lunak', 'Insinyur Perangkat Lunak', 'Analis Jaminan Kualitas Perangkat Lunak', 'Arsitek Solusi', 'Analis sistem', 'Pengembang Perangkat Lunak Sistem', 'Spesialis Tableau', 'Peneliti UX', 'Administrator Web',
    ]

    const $pendidikan = ['Penasehat akademik', 'Dekan Akademik', 'Pelatih hewan', 'Arsiparis', 'Pelatih Bola Basket', 'Guru Bisnis', 'Pelatih Karir', 'Pustakawan Katalog', 'Pengasuh anak-anak', 'Profesor perguruan tinggi', 'CPR dan Instruktur Pertolongan Pertama', 'Penasihat Krisis', 'Pelatih CrossFit', 'Kurator', 'Instruktur Pembelajaran Jarak Jauh', 'Instruktur Mengemudi', 'Guru Pendidikan Awal', 'Administrator Pendidikan', 'Manajer Pendidikan dan Pelatihan', 'Psikolog Pendidikan', 'Konselor Sekolah Dasar', 'Guru Sekolah Dasar', 'Guru bahasa Inggris', 'Guru ESL', 'Pelatih Kebugaran', 'Pelatih Sepakbola', 'Ahli silsilah', 'Guru Geografi', 'Pelatih Senam', 'Pendidik Kesehatan', 'Guru SMA', 'Sejarawan', 'Pelatih Kuda', 'Desainer Instruksional', 'Guru TK', 'Pelatih Kepemimpinan', 'Pustakawan', 'Pendidik medis', 'Penerjemah Medis', 'Guru musik', 'Pasangan Pengasuh/Au', 'Paraedukator', 'Filsuf', 'Guru olahraga', 'Guru pra sekolah', 'Spesialis Baca', 'Kepala sekolah', 'Psikolog Sekolah', 'Penerjemah Bahasa Isyarat', 'Instruktur Terjun Payung', 'Guru pendidikan khusus', 'Pelatih olahraga', 'Pramuka Olahraga', 'Guru pengganti', 'Instruktur Renang', 'Tutor', 'Pelatih Kesehatan',
    ]

    const $management = ['Manajer Akuntansi', 'Aktuaris', 'Asisten administratif', 'Manajer Administrasi', 'Spesialis Operasi Lapangan Terbang', 'Pembeli Seni', 'Manajer Artis', 'Direktur Atletik', 'Pengusaha Biomedis', 'Manajer cabang', 'Analis Bisnis', 'Perencana Kelangsungan Bisnis', 'Manajer Pengembangan Bisnis', 'Analis Intelijen Bisnis', 'Manajer bisnis', 'Ketua Dewan Direksi', 'Direktur Eksekutif Kamar Dagang', 'Direktur Komersial', 'Pejabat tertinggi Eksklusif', 'Kepala Petugas Operasi', 'Kepala Petugas Pendapatan', 'Sekretaris Perusahaan', 'Analis Kompensasi', 'Manajer Kepatuhan', 'Pengusaha', 'Asisten Eksekutif', 'Manajer Fasilitas', 'Pemilik Waralaba', 'Agen meja depan', 'Penggalangan dana', 'Manajer umum', 'Pengusaha Hijau', 'Administrator Kesehatan', 'Wiraswasta Kesehatan', 'Analis Sumber Daya Manusia', 'Asisten Sumber Daya Manusia', 'Direktur Sumber Daya Manusia', 'Manajer Sumber Daya Manusia', 'Manajer Produksi Industri', 'Manajer Pencegahan Kerugian', 'Konsultan manajemen', 'Direktur pengatur', 'Manajer Medis', 'Sekretaris Medis', 'Manajer Musik', 'Analis Operasi', 'Analis Proyek', 'Manajer proyek', 'Manajer properti', 'Manajer pembelian', 'Resepsionis', 'Pemilik restoran', 'Pengusaha sosial', 'Manajer Olahraga', 'Makelar saham', 'Manajer toko', 'Manajer Keberlanjutan', 'Resepsionis Hewan',
    ]

    cCareer.forEach(e => {
      cCareerData.push({
        name: e,
        icon: 'example.png',
        created_by: $user.id
      })
    });

    await CareerCategory.createMany(cCareerData);
  }
}
