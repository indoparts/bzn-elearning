import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import CareerCategory from 'App/Models/CareerCategory'
import CareerSubcategory from 'App/Models/CareerSubcategory';
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

    const $marketing = ['Direktur Seni Periklanan', 'Copywriter Periklanan', 'Eksekutif periklanan', 'Manajer periklanan', 'Agen Penjualan Iklan', 'Perwakilan Penjualan Periklanan', 'Petugas Hiburan dan Rekreasi', 'Manajer Area', 'Penjual Mobil', 'Pedagang Mobil', 'Kasir', 'Kepala Petugas Pemasaran', 'Manajer pelayanan pelanggan', 'Perwakilan Layanan Pelanggan', 'Pemasar Digital', 'Spesialis Pemasaran Digital', 'Model Kebugaran', 'Model Tangan', 'Manajer Akun Utama', 'Pelobi', 'Analis Riset Pasar', 'Analis Pemasaran', 'Manajer Pemasaran', 'Spesialis pemasaran', 'Pembeli Media', 'Perwakilan Penjualan Medis', 'Merchandiser', 'Model', 'Pembawa berita', 'Konsultan Personal Branding', 'Perwakilan Penjualan Farmasi', 'Spesialis Humas (Humas).', 'Petugas Humas', 'Agen Real Estat', 'Agensi perumahan', 'Grosir Real Estat', 'Makelar barang tak bergerak', 'Manajer Hubungan', 'Pembeli Eceran', 'Penjual Eceran', 'Konsultan Penjualan', 'Manajer Layanan Sosial dan Masyarakat', 'Manajer Media Sosial', 'Telemarketer', 'Grosir',
    ]

    const $travel = ['Pramugari', 'Barista', 'Bartender', 'Bel Hop', 'Dealer kasino', 'Koki', 'Ruang serbaguna', 'Koki eksekutif', 'Manajer hotel', 'Pengurus rumah', 'Manajer Dapur', 'Koki Pribadi', 'Operator Kolam', 'Katering Pribadi', 'Pekerja Kantin Sekolah', 'Sommelier', 'Pengawas Pekerja Penyiapan dan Penyajian Makanan', 'Koki Sushi', 'Pemandu wisata', 'Pengemudi Bus Transit dan Antar Kota', 'Pramugari kapal pesiar',
    ]

    const $stem = ['Teknisi Pencetakan 3D', 'Insinyur Penerbangan', 'Insinyur luar angkasa', 'Teknik Dirgantara dan Teknologi Operasi', 'Mekanik Pesawat dan Teknisi Servis', 'Kimia Analitik', 'Insinyur Aplikasi', 'Astronaut', 'Ahli astrofisika', 'Kimiawan Atmosfer', 'Ilmuwan Atmosfer', 'Insinyur Audio', 'Audiolog', 'Teknisi Bodi Otomatis', 'Mekanik Otomatis', 'Teknisi Bioinformatika', 'Antropolog Biologi', 'Teknisi Biologi', 'Ahli biologi', 'Insinyur biomedis', 'Pengendali Penerbangan Biomedis', 'Ahli biostatistik', 'Pengembang Blockchain', 'Insinyur Kimia', 'Ahli kimia', 'Kepala Staf Ilmiah', 'kepala petugas teknologi', 'Operator Sensor Drone Sipil', 'Analis Perubahan Iklim', 'Ilmuwan Iklim', 'Ahli iklim', 'Klinik Psikologi', 'Koordinator Riset Klinis', 'Insinyur komputer', 'Insinyur Perangkat Keras Komputer', 'Arsitek Jaringan Komputer', 'Ilmuwan komputer', 'Analis Sistem Komputer', 'Spesialis Dukungan Pengguna Komputer', 'Antropolog Budaya', 'Pembuat Sepeda Motor Kustom', 'Pilot Drone', 'Ahli ekologi', 'Insinyur listrik', 'Insinyur elektronik', 'Spesialis Konservasi Energi', 'Ahli Geologi Teknik', 'Ahli ilmu serangga', 'Insinyur Lingkungan', 'Insinyur Serat Optik', 'Kimiawan Pangan', 'Antropolog Forensik', 'Insinyur Genetik', 'Ahli ilmu bumi', 'Ahli geologi', 'Surveyor Geomatika', 'Ahli geofisika', 'Geoscientist', 'Insinyur Kesehatan dan Keselamatan', 'Mekanik Helikopter', 'Ahli imunologi', 'Desainer Industri', 'Insinyur Industri', 'Analis Keamanan Informasi', 'Antropolog Linguistik', 'Insinyur Kelautan', 'Insinyur Ilmu Material', 'Ahli matematika', 'Teknisi Teknik Mesin', 'Ahli meteorologi', 'Mikro biologi', 'Operator Sensor Drone Militer', 'Operator Mesin Penambangan', 'Insinyur Keselamatan Pertambangan', 'Ahli Biologi Molekuler', 'Insinyur nanoteknologi', 'Teknisi Jaringan', 'Ahli kelautan', 'Kimiawan Organik', 'Ortodontis', 'Ahli paleontologi', 'Ahli paleoklimatologi', 'Fisikawan Partikel', 'Insinyur Perminyakan', 'Ilmuwan Farmasi', 'Ahli fotogrametri', 'Insinyur Pipa', 'Desainer produk', 'Perencana Produksi', 'Penguji Jaminan Kualitas', 'Pengemudi Mobil Balap', 'Ilmuwan Riset', 'Peneliti', 'Teknisi Rekayasa Robotika', 'Seismolog', 'Sosiolog', 'Insinyur Sistem Energi Surya', 'Teknisi Tenaga Surya', 'Analis Olahraga', 'Ahli statistik', 'Akuntan pajak', 'Pengusaha Teknologi', 'Matematikawan Teoritis', 'Ahli toksikologi', 'Ultrasonografi', 'Insinyur Validasi', 'Ahli vulkanologi', 'Pengembang Web', 'Teknisi Turbin Angin', 'Ahli ilmu hewan',
    ]

    const $arsitektur = ['Arkeolog', 'Arsitek', 'Pandai besi', 'Operator Ketel', 'Pembuat ketel', 'Operator Gedung', 'Pembuat CAD', 'Tukang kayu', 'Tukang Semen', 'Teknik Sipil', 'Penambang batu bara', 'Konseptor Komersial', 'Estimator Konstruksi', 'Manajer konstruksi', 'Manajer proyek konstruksi', 'Pengawas Lokasi Konstruksi', 'Operator Derek', 'Konseptor', 'Pemasang Drywall', 'Montir listrik', 'Mekanik Lift', 'Operator Peralatan', 'Teknisi Layanan Lapangan', 'Inspektur Rumah', 'Pengecat rumah', 'Interior desainer', 'Arsitek lanskap', 'Desainer Lanskap', 'Mekanik Pemeliharaan', 'Pekerja pemeliharaan', 'Tukang ledeng', 'Pengembang Keadaan Nyata', 'Teknisi Bangunan Cerdas', 'Insinyur Struktur', 'Tukang kayu',
    ]

    const $pemerintahan = ['Manajer Kota', 'Perencana Kota', 'Ajudan Kongres', 'Diplomat', 'Petugas eskro', 'Petugas Dinas Luar Negeri', 'Legislator', 'Petugas Pemkot', 'Asisten Politik (Pembantu Kongres Inggris)', 'Ilmuwan politik', 'Politikus', 'Petugas Pos', 'Senator (AS)', 'Pakar Pertanian Perkotaan', 'Perencana Kota',
    ]

    const $hukum = ['911 Operator', 'Pekerja Kontrol Hewan', 'Penyelamat Hewan', 'Wasit', 'Pengacara', 'Jaminan Bondsman', 'Juru sita', 'Agen Unit Analisis Perilaku (AS)', 'Analis Percikan Darah', 'Petugas Patroli Perbatasan', 'Abstraktor Bersertifikat', 'Kepala Polisi AS', 'Pengacara Hak Sipil', 'Penyesuai Klaim', 'Petugas Penjaga Pantai', 'Penjaga pantai Inggris', 'Ditugaskan Perwira Angkatan Darat', 'Ditugaskan Perwira Angkatan Laut', 'Pengacara perusahaan', 'Petugas Pemasyarakatan', 'Petugas Pengadilan', 'Wartawan Pengadilan', 'Penyidik ​​TKP', 'Pengacara Pembela Pidana', 'Profiler Kriminal', 'Kriminolog', 'Inspektur Bea Cukai', 'Petugas Penahanan', 'Direktur Urusan Konsumen', 'Jaksa wilayah', 'Instruktur Selam', 'Pengacara Lingkungan', 'Agen Khusus FBI', 'Hakim Federal', 'Pilot tempur', 'Investigator Kebakaran', 'Pemadam kebakaran', 'Fish and Game Warden', 'Patologi forensik', 'Fotografer Forensik', 'Psikolog Forensik', 'Ilmuwan Forensik', 'Ahli Toksikologi Forensik', 'Petugas Pendengaran (AS)', 'Spesialis Pendukung Imigran', 'Konsultan Imigrasi', 'Petugas imigrasi', 'Hakim', 'Konsultan Perawat Hukum', 'Sekretaris legal', 'Hakim', 'Penengah', 'Pemeriksa Medis', 'Pengacara Medis', 'Perwira Angkatan Laut', 'Notaris Publik (Inggris)', 'Notaris Publik (AS)', 'Paralegal', 'Petugas pembebasan bersyarat', 'Pengacara Paten', 'Petugas Perdamaian', 'Komisaris Polisi', 'Polisi', 'Inspektur Pos', 'Detektif pribadi', 'Penyelidik Swasta', 'Pengawas masa percobaan', 'Perwira Angkatan Udara Kerajaan (Inggris)', 'Petugas Sumber Daya Sekolah', 'Prajurit Negara', 'Hakim Agung', 'Pemungut Pajak', 'Perwira Angkatan Udara Amerika Serikat', 'Petugas Waran', 'Petugas Penegakan Satwa Liar',
    ]

    const $manufaktur = ['Bengkel Sepeda', 'Operator Kimia', 'Ahli permata', 'Mekanik Mesin Industri', 'Tukang kunci', 'Insinyur Manufaktur', 'Teknisi Produksi Manufaktur', 'Operator Produksi Minyak dan Gas', 'Insinyur Pengemasan', 'Operator Pembangkit Listrik', 'Spesialis Jaminan Kualitas', 'Inspektur Kontrol Kualitas',
    ]

    const $transportasi = ['Pengontrol lalu lintas udara', 'Pengawas Penanganan Kargo Pesawat', 'Dispatcher Pesawat', 'Pilot maskapai penerbangan', 'Pengemudi dan Petugas Ambulans', 'Pelukis Mobil', 'Agen Kargo dan Kargo', 'Pilot kargo', 'Sopir', 'Penyelam Komersial', 'Percontohan Komersial', 'Sopir Pengiriman', 'Mekanik Diesel', 'Pramugari', 'Operator Forklif', 'Petugas Pengiriman Barang', 'Spesialis Inventaris', 'ahli logistik', 'Analis Logistik', 'Mekanik Kelautan', 'Surveyor Kelautan', 'Pelaut Pedagang', 'Pemilik-Operator', 'Pilot Pribadi', 'Spesialis Pengadaan', 'Konduktor Kereta Api', 'Sopir Bus Sekolah', 'Nahkoda kapal', 'Masinis', 'Supir truk', 'Pengemudi Uber', 'Pelayan', 'Rekan Gudang', 'Manajer gudang', 'Kapten kapal pesiar',
    ]

    const $pelayananMasyarakat = ['Konselor Kecanduan', 'Pelatih ADHD', 'Instruktur Aerobik', 'Aromaterapis', 'Analis Perilaku', 'Spesialis Perilaku', 'Ajudan Perawatan', 'Pengasuh', 'Pekerja Sosial Kesejahteraan Anak', 'Orang Pendeta', 'Tenaga Kesehatan Masyarakat', 'Penyelenggara Komunitas', 'Koroner', 'Konselor', 'Operator krematorium', 'Konselor Intervensi Krisis', 'Konselor Garis Krisis', 'Pelatih Kencan', 'Konselor Hutang', 'Spesialis Cacat Perkembangan', 'Pekerja Pendukung Disabilitas', 'Perawat Anjing', 'Pelatih anjing', 'Advokat Penampungan Kekerasan Dalam Rumah Tangga', 'Advokat Korban KDRT', 'Pembalsem', 'Petugas Kesetaraan & Keanekaragaman', 'Ahli kecantikan', 'Pekerja Kasus Keuangan', 'Direktur Pemakaman', 'Penjaga lapangan', 'Bimbingan konseling', 'Psikolog Kesehatan', 'Konselor SMA', 'Manajer Tempat Penampungan Tunawisma', 'Ibu rumah tangga', 'Pekerja Perawatan Rumah Sakit', 'Penerjemah', 'Artis Lash', 'Pelatih Kehidupan', 'Pemulung', 'Wasit', 'Pelayan', 'Konsultan Pernikahan', 'Fotografer Pernikahan', 'Perencana Acara pernikahan', 'Pemimpin Pemuda', 'Instruktur Zumba',
    ]

    const $arts = ['Animasi 3D', 'Aktor', 'Antropolog', 'Pedagang Seni', 'Direktur Seni', 'Guru seni', 'Artis', 'Produser Asosiasi', 'Teknisi Audio dan Video', 'Spesialis Audiovisual', 'Pengembang Realitas Tertambah', 'Pengarang', 'Penari Cadangan', 'Penari balet', 'Blogger', 'Pakar Bahasa Tubuh', 'Pendongeng Merek', 'Jurnalis Penyiaran', 'Artis Kaligrafi', 'Operator Kamera (Televisi & Film)', 'Pembuat peta', 'Direktur Pengecoran', 'Koreografer', 'Sinematografer', 'Badut', 'Pelawak', 'Artis Buku Komik', 'manajer Komunikasi', 'Manajer komunitas', 'Artis Konsep', 'Manajer Konten', 'Ahli Strategi Konten', 'Penulis Konten', 'Pemeriksa naskah', 'Penulis salinan', 'Ahli kecantikan', 'Desainer kostum', 'Sutradara kreatif', 'Penulis Kreatif', 'Pengkritik', 'Penjahit Kustom', 'Instruktur Tari', 'Penari', 'Manajer desain', 'Seniman Digital', 'Disk Joki', 'Pelatih Drama', 'Asisten Redaktur', 'Produser Musik Elektronik', 'Penghibur', 'Perencana Acara', 'Perancang busana', 'Ilustrator mode', 'Penata busana', 'Editor Film & Video', 'Sutradara', 'Produser film', 'Seniman Halus', 'Desainer Bunga', 'Penjual bunga', 'Artis Foley', 'Perancang permainan', 'Peniup kaca', 'Seniman grafis', 'Perancang grafis', 'Penata rambut', 'Ilustrator', 'Perancang interior', 'Wartawan', 'Teknisi Pencahayaan', 'Penulis lirik', 'Juru rias', 'Seniman Manga', 'Pekerja Peralatan Media dan Komunikasi', 'Spesialis Multimedia', 'Kurator Museum', 'Konduktor Musik', 'Insinyur Musik', 'Produser musik', 'Pemilik Studio Musik', 'Direktur Video Musik', 'Produser Berita', 'Menampilkan Penulis Lagu', 'Jurnalis foto', 'Guru Piano', 'Pembuat podcast', 'Cheerleader Profesional', 'Korektor', 'Wartawan', 'Model landasan pacu', 'Penulis skenario', 'Penulis cerita', 'Tetapkan Desainer', 'Penyanyi', 'Penulis Lagu', 'Teknisi Sound Engineering', 'Penyiar Olahraga', 'Petugas untuk pentas', 'Artis papan cerita', 'Stunt Ganda', 'Seniman tato', 'Penulis teknis', 'Penata Rias Teater dan Pertunjukan', 'Pendaki Menara', 'Teknisi Menara', 'Transkreator', 'Penerjemah', 'Blogger Perjalanan', 'Influencer perjalanan', 'Produser TV', 'Desainer UX', 'Desainer Realitas Virtual', 'Artis Pengisi Suara', 'Penulis Konten Web', 'Desainer web',
    ]

    cCareer.forEach(e => {
      cCareerData.push({
        name: e,
        icon: 'example.png',
        created_by: $user.id
      })
    });

    if (await CareerCategory.createMany(cCareerData)) {
      const $cekPPNSDA = await CareerCategory.findBy('name', 'Pertanian, Pangan, dan Sumber Daya Alam')
      if ($cekPPNSDA) {
        const $datacekPPNSDA: any[] = []
        $pertanian.forEach(e => {
          $datacekPPNSDA.push({
            career_category_id: $cekPPNSDA.id,
            created_by: $user.id,
            icon: `${e}.png`,
            name: e,
          })
        });
        await CareerSubcategory.createMany($datacekPPNSDA)
      }
      const $cekIKES = await CareerCategory.findBy('name', 'Ilmu Kesehatan')
      if ($cekIKES) {
        const $datacekIKES: any[] = []
        $kesehatan.forEach(e => {
          $datacekIKES.push({
            career_category_id: $cekIKES.id,
            created_by: $user.id,
            icon: `${e}.png`,
            name: e,
          })
        });
        await CareerSubcategory.createMany($datacekIKES)
      }
      const $cekKEU = await CareerCategory.findBy('name', 'Keuangan')
      if ($cekKEU) {
        const $datacekKEU: any[] = []
        $keuangan.forEach(e => {
          $datacekKEU.push({
            career_category_id: $cekKEU.id,
            created_by: $user.id,
            icon: `${e}.png`,
            name: e,
          })
        });
        await CareerSubcategory.createMany($datacekKEU)
      }
      const $cekIT = await CareerCategory.findBy('name', 'Information Technology')
      if ($cekIT) {
        const $datacekIT: any[] = []
        $it.forEach(e => {
          $datacekIT.push({
            career_category_id: $cekIT.id,
            created_by: $user.id,
            icon: `${e}.png`,
            name: e,
          })
        });
        await CareerSubcategory.createMany($datacekIT)
      }
      const $cekPDP = await CareerCategory.findBy('name', 'Pendidikan dan Pelatihan')
      if ($cekPDP) {
        const $datacekPDP: any[] = []
        $pendidikan.forEach(e => {
          $datacekPDP.push({
            career_category_id: $cekPDP.id,
            created_by: $user.id,
            icon: `${e}.png`,
            name: e,
          })
        });
        await CareerSubcategory.createMany($datacekPDP)
      }
      const $cekMDAB = await CareerCategory.findBy('name', 'Manajemen dan Administrasi Bisnis')
      if ($cekMDAB) {
        const $datacekMDAB: any[] = []
        $management.forEach(e => {
          $datacekMDAB.push({
            career_category_id: $cekMDAB.id,
            created_by: $user.id,
            icon: `${e}.png`,
            name: e,
          })
        });
        await CareerSubcategory.createMany($datacekMDAB)
      }
      const $cekPPDL = await CareerCategory.findBy('name', 'Pemasaran, Penjualan, dan Layanan')
      if ($cekPPDL) {
        const $datacekPPDL: any[] = []
        $marketing.forEach(e => {
          $datacekPPDL.push({
            career_category_id: $cekPPDL.id,
            created_by: $user.id,
            icon: `${e}.png`,
            name: e,
          })
        });
        await CareerSubcategory.createMany($datacekPPDL)
      }
      const $cekPDPAR = await CareerCategory.findBy('name', 'Perhotelan dan Pariwisata')
      if ($cekPDPAR) {
        const $datacekPDPAR: any[] = []
        $travel.forEach(e => {
          $datacekPDPAR.push({
            career_category_id: $cekPDPAR.id,
            created_by: $user.id,
            icon: `${e}.png`,
            name: e,
          })
        });
        await CareerSubcategory.createMany($datacekPDPAR)
      }
      const $cekSTTDM = await CareerCategory.findBy('name', 'Sains, Teknologi, Teknik, dan Matematika')
      if ($cekSTTDM) {
        const $datacekSTTDM: any[] = []
        $stem.forEach(e => {
          $datacekSTTDM.push({
            career_category_id: $cekSTTDM.id,
            created_by: $user.id,
            icon: `${e}.png`,
            name: e,
          })
        });
        await CareerSubcategory.createMany($datacekSTTDM)
      }
      const $cekADK = await CareerCategory.findBy('name', 'Arsitektur dan Konstruksi')
      if ($cekADK) {
        const $datacekADK: any[] = []
        $arsitektur.forEach(e => {
          $datacekADK.push({
            career_category_id: $cekADK.id,
            created_by: $user.id,
            icon: `${e}.png`,
            name: e,
          })
        });
        await CareerSubcategory.createMany($datacekADK)
      }
      const $cekPDAP = await CareerCategory.findBy('name', 'Pemerintahan dan Administrasi Publik')
      if ($cekPDAP) {
        const $datacekPDAP: any[] = []
        $pemerintahan.forEach(e => {
          $datacekPDAP.push({
            career_category_id: $cekPDAP.id,
            created_by: $user.id,
            icon: `${e}.png`,
            name: e,
          })
        });
        await CareerSubcategory.createMany($datacekPDAP)
      }
      const $cekHKPDK = await CareerCategory.findBy('name', 'Hukum, Keamanan Publik, Pemasyarakatan, dan Keamanan')
      if ($cekHKPDK) {
        const $datacekHKPDK: any[] = []
        $hukum.forEach(e => {
          $datacekHKPDK.push({
            career_category_id: $cekHKPDK.id,
            created_by: $user.id,
            icon: `${e}.png`,
            name: e,
          })
        });
        await CareerSubcategory.createMany($datacekHKPDK)
      }
      const $cekMANUF = await CareerCategory.findBy('name', 'Manufaktur')
      if ($cekMANUF) {
        const $datacekMANUF: any[] = []
        $manufaktur.forEach(e => {
          $datacekMANUF.push({
            career_category_id: $cekMANUF.id,
            created_by: $user.id,
            icon: `${e}.png`,
            name: e,
          })
        });
        await CareerSubcategory.createMany($datacekMANUF)
      }
      const $cekTDDL = await CareerCategory.findBy('name', 'Transportasi, Distribusi, dan Logistik')
      if ($cekTDDL) {
        const $datacekTDDL: any[] = []
        $transportasi.forEach(e => {
          $datacekTDDL.push({
            career_category_id: $cekTDDL.id,
            created_by: $user.id,
            icon: `${e}.png`,
            name: e,
          })
        });
        await CareerSubcategory.createMany($datacekTDDL)
      }
      const $cekPM = await CareerCategory.findBy('name', 'Pelayanan Masyarakat')
      if ($cekPM) {
        const $datacekPM: any[] = []
        $pelayananMasyarakat.forEach(e => {
          $datacekPM.push({
            career_category_id: $cekPM.id,
            created_by: $user.id,
            icon: `${e}.png`,
            name: e,
          })
        });
        await CareerSubcategory.createMany($datacekPM)
      }
      const $cekARTS = await CareerCategory.findBy('name', 'Seni, Teknologi Audio/Video, dan Komunikas')
      if ($cekARTS) {
        const $datacekARTS: any[] = []
        $arts.forEach(e => {
          $datacekARTS.push({
            career_category_id: $cekARTS.id,
            created_by: $user.id,
            icon: `${e}.png`,
            name: e,
          })
        });
        await CareerSubcategory.createMany($datacekARTS)
      }
    }

  }
}
