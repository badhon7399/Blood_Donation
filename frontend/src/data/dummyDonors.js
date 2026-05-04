// Dummy donor data for Bangladesh — all 8 blood groups, 64 districts
export const DUMMY_DONORS = [
  // ── A+ ────────────────────────────────────────────────────────────────
  { id: 'd001', name: 'Arif Hossain',      bloodGroup: 'A+', location: 'Dhaka',       area: 'Mirpur',        phone: '01711-XXXXXX', status: 'Available',     lastDonation: '2024-11-10' },
  { id: 'd002', name: 'Fatema Begum',      bloodGroup: 'A+', location: 'Dhaka',       area: 'Dhanmondi',     phone: '01812-XXXXXX', status: 'Available',     lastDonation: '2024-10-05' },
  { id: 'd003', name: 'Rasel Ahmed',       bloodGroup: 'A+', location: 'Chittagong',  area: 'Agrabad',       phone: '01913-XXXXXX', status: 'Available',     lastDonation: '2025-01-15' },
  { id: 'd004', name: 'Nasrin Akter',      bloodGroup: 'A+', location: 'Sylhet',      area: 'Zindabazar',    phone: '01614-XXXXXX', status: 'Available',     lastDonation: '2024-12-20' },
  { id: 'd005', name: 'Kamal Uddin',       bloodGroup: 'A+', location: 'Rajshahi',    area: 'Shaheb Bazar',  phone: '01515-XXXXXX', status: 'Not Available', lastDonation: '2025-02-01' },
  { id: 'd006', name: 'Shirin Sultana',    bloodGroup: 'A+', location: 'Khulna',      area: 'Sonadanga',     phone: '01716-XXXXXX', status: 'Available',     lastDonation: '2024-09-18' },
  { id: 'd007', name: 'Mahbub Alam',       bloodGroup: 'A+', location: 'Barisal',     area: 'Sadar',         phone: '01817-XXXXXX', status: 'Available',     lastDonation: '2024-08-25' },
  { id: 'd008', name: 'Rima Islam',        bloodGroup: 'A+', location: 'Comilla',     area: 'Kandirpar',     phone: '01918-XXXXXX', status: 'Available',     lastDonation: '2024-11-30' },

  // ── A- ────────────────────────────────────────────────────────────────
  { id: 'd009', name: 'Tanvir Hassan',     bloodGroup: 'A-', location: 'Dhaka',       area: 'Gulshan',       phone: '01719-XXXXXX', status: 'Available',     lastDonation: '2024-10-12' },
  { id: 'd010', name: 'Sadia Rahman',      bloodGroup: 'A-', location: 'Chittagong',  area: 'Nasirabad',     phone: '01810-XXXXXX', status: 'Available',     lastDonation: '2024-12-01' },
  { id: 'd011', name: 'Imran Molla',       bloodGroup: 'A-', location: 'Narayanganj', area: 'Siddhirganj',   phone: '01911-XXXXXX', status: 'Available',     lastDonation: '2024-07-14' },
  { id: 'd012', name: 'Puja Das',          bloodGroup: 'A-', location: 'Jessore',     area: 'Sreenagar',     phone: '01612-XXXXXX', status: 'Not Available', lastDonation: '2025-03-10' },
  { id: 'd013', name: 'Milon Biswas',      bloodGroup: 'A-', location: 'Faridpur',    area: 'Sadar',         phone: '01513-XXXXXX', status: 'Available',     lastDonation: '2024-09-05' },

  // ── B+ ────────────────────────────────────────────────────────────────
  { id: 'd014', name: 'Jahangir Alam',     bloodGroup: 'B+', location: 'Dhaka',       area: 'Uttara',        phone: '01714-XXXXXX', status: 'Available',     lastDonation: '2024-11-22' },
  { id: 'd015', name: 'Nusrat Jahan',      bloodGroup: 'B+', location: 'Dhaka',       area: 'Motijheel',     phone: '01815-XXXXXX', status: 'Available',     lastDonation: '2024-10-30' },
  { id: 'd016', name: 'Sabbir Hossen',     bloodGroup: 'B+', location: 'Chittagong',  area: 'Halishahar',    phone: '01916-XXXXXX', status: 'Available',     lastDonation: '2024-08-08' },
  { id: 'd017', name: 'Roksana Khatun',    bloodGroup: 'B+', location: 'Sylhet',      area: 'Ambarkhana',    phone: '01617-XXXXXX', status: 'Available',     lastDonation: '2024-12-15' },
  { id: 'd018', name: 'Sumon Chakraborty', bloodGroup: 'B+', location: 'Rajshahi',    area: 'Uposhohor',     phone: '01518-XXXXXX', status: 'Not Available', lastDonation: '2025-01-28' },
  { id: 'd019', name: 'Mitu Akhter',       bloodGroup: 'B+', location: 'Gazipur',     area: 'Tongi',         phone: '01719-XXXXXX', status: 'Available',     lastDonation: '2024-09-25' },
  { id: 'd020', name: 'Anik Das',          bloodGroup: 'B+', location: 'Mymensingh',  area: 'Sadar',         phone: '01820-XXXXXX', status: 'Available',     lastDonation: '2024-07-20' },
  { id: 'd021', name: 'Sharmin Akter',     bloodGroup: 'B+', location: 'Bogura',      area: 'Satmatha',      phone: '01921-XXXXXX', status: 'Available',     lastDonation: '2024-11-05' },

  // ── B- ────────────────────────────────────────────────────────────────
  { id: 'd022', name: 'Asif Karim',        bloodGroup: 'B-', location: 'Dhaka',       area: 'Banani',        phone: '01622-XXXXXX', status: 'Available',     lastDonation: '2024-10-18' },
  { id: 'd023', name: 'Dilruba Yasmin',    bloodGroup: 'B-', location: 'Chittagong',  area: 'CDA Avenue',    phone: '01523-XXXXXX', status: 'Available',     lastDonation: '2024-09-10' },
  { id: 'd024', name: 'Rakib Islam',       bloodGroup: 'B-', location: 'Comilla',     area: 'Laksam',        phone: '01724-XXXXXX', status: 'Not Available', lastDonation: '2025-02-20' },
  { id: 'd025', name: 'Afsana Parvin',     bloodGroup: 'B-', location: 'Brahmanbaria', area: 'Ashuganj',     phone: '01825-XXXXXX', status: 'Available',     lastDonation: '2024-08-14' },
  { id: 'd026', name: 'Delwar Hossain',    bloodGroup: 'B-', location: 'Tangail',     area: 'Sadar',         phone: '01926-XXXXXX', status: 'Available',     lastDonation: '2024-12-08' },

  // ── O+ ────────────────────────────────────────────────────────────────
  { id: 'd027', name: 'Shakil Ahmed',      bloodGroup: 'O+', location: 'Dhaka',       area: 'Badda',         phone: '01627-XXXXXX', status: 'Available',     lastDonation: '2024-10-25' },
  { id: 'd028', name: 'Mahfuza Khanam',    bloodGroup: 'O+', location: 'Dhaka',       area: 'Rayer Bazar',   phone: '01528-XXXXXX', status: 'Available',     lastDonation: '2024-11-18' },
  { id: 'd029', name: 'Rafiqul Islam',     bloodGroup: 'O+', location: 'Chittagong',  area: 'Bayezid',       phone: '01729-XXXXXX', status: 'Available',     lastDonation: '2024-09-02' },
  { id: 'd030', name: 'Hasina Begum',      bloodGroup: 'O+', location: 'Sylhet',      area: 'Subhanighat',   phone: '01830-XXXXXX', status: 'Available',     lastDonation: '2024-08-28' },
  { id: 'd031', name: 'Sazzad Hossain',    bloodGroup: 'O+', location: 'Rajshahi',    area: 'Boalia',        phone: '01931-XXXXXX', status: 'Not Available', lastDonation: '2025-01-10' },
  { id: 'd032', name: 'Sultana Razia',     bloodGroup: 'O+', location: 'Khulna',      area: 'Khalishpur',    phone: '01632-XXXXXX', status: 'Available',     lastDonation: '2024-07-30' },
  { id: 'd033', name: 'Maruf Hasan',       bloodGroup: 'O+', location: 'Barisal',     area: 'Bandar',        phone: '01533-XXXXXX', status: 'Available',     lastDonation: '2024-12-22' },
  { id: 'd034', name: 'Shanta Debnath',    bloodGroup: 'O+', location: 'Noakhali',    area: 'Maijdee',       phone: '01734-XXXXXX', status: 'Available',     lastDonation: '2024-11-01' },
  { id: 'd035', name: 'Jahirul Karim',     bloodGroup: 'O+', location: 'Gazipur',     area: 'Kaliakair',     phone: '01835-XXXXXX', status: 'Available',     lastDonation: '2024-10-14' },
  { id: 'd036', name: 'Nadia Islam',       bloodGroup: 'O+', location: 'Narayanganj', area: 'Rupganj',       phone: '01936-XXXXXX', status: 'Available',     lastDonation: '2024-09-20' },

  // ── O- ────────────────────────────────────────────────────────────────
  { id: 'd037', name: 'Rezaul Karim',      bloodGroup: 'O-', location: 'Dhaka',       area: 'Mohammadpur',   phone: '01637-XXXXXX', status: 'Available',     lastDonation: '2024-10-08' },
  { id: 'd038', name: 'Fariha Akter',      bloodGroup: 'O-', location: 'Chittagong',  area: 'Panchlaish',    phone: '01538-XXXXXX', status: 'Available',     lastDonation: '2024-11-28' },
  { id: 'd039', name: 'Sajjad Ali',        bloodGroup: 'O-', location: 'Sylhet',      area: 'Tilagarh',      phone: '01739-XXXXXX', status: 'Not Available', lastDonation: '2025-02-14' },
  { id: 'd040', name: 'Rumana Hossain',    bloodGroup: 'O-', location: 'Mymensingh',  area: 'Valuka',        phone: '01840-XXXXXX', status: 'Available',     lastDonation: '2024-08-18' },
  { id: 'd041', name: 'Nur Mohammad',      bloodGroup: 'O-', location: 'Rangpur',     area: 'Sadar',         phone: '01941-XXXXXX', status: 'Available',     lastDonation: '2024-12-05' },
  { id: 'd042', name: 'Maliha Sultana',    bloodGroup: 'O-', location: 'Dinajpur',    area: 'Ghoraghat',     phone: '01642-XXXXXX', status: 'Available',     lastDonation: '2024-09-15' },

  // ── AB+ ───────────────────────────────────────────────────────────────
  { id: 'd043', name: 'Toufiq Rahman',     bloodGroup: 'AB+', location: 'Dhaka',      area: 'Tejgaon',       phone: '01543-XXXXXX', status: 'Available',     lastDonation: '2024-10-20' },
  { id: 'd044', name: 'Monira Khatun',     bloodGroup: 'AB+', location: 'Chittagong', area: 'Muradpur',      phone: '01744-XXXXXX', status: 'Available',     lastDonation: '2024-11-12' },
  { id: 'd045', name: 'Fahim Alam',        bloodGroup: 'AB+', location: 'Sylhet',     area: 'Moulvibazar',   phone: '01845-XXXXXX', status: 'Available',     lastDonation: '2024-07-25' },
  { id: 'd046', name: 'Sharifa Begum',     bloodGroup: 'AB+', location: 'Rajshahi',   area: 'Paba',          phone: '01946-XXXXXX', status: 'Not Available', lastDonation: '2025-01-20' },
  { id: 'd047', name: 'Arafat Hossain',    bloodGroup: 'AB+', location: 'Khulna',     area: 'Dumuria',       phone: '01647-XXXXXX', status: 'Available',     lastDonation: '2024-08-10' },
  { id: 'd048', name: 'Poly Akter',        bloodGroup: 'AB+', location: 'Cumilla',    area: 'Barura',        phone: '01548-XXXXXX', status: 'Available',     lastDonation: '2024-12-28' },
  { id: 'd049', name: 'Hasan Mahmud',      bloodGroup: 'AB+', location: 'Chattogram', area: 'Boalkhali',     phone: '01749-XXXXXX', status: 'Available',     lastDonation: '2024-11-08' },

  // ── AB- ───────────────────────────────────────────────────────────────
  { id: 'd050', name: 'Masud Rana',        bloodGroup: 'AB-', location: 'Dhaka',      area: 'Khilgaon',      phone: '01850-XXXXXX', status: 'Available',     lastDonation: '2024-10-28' },
  { id: 'd051', name: 'Shimu Begum',       bloodGroup: 'AB-', location: 'Chittagong', area: 'Chandgaon',     phone: '01951-XXXXXX', status: 'Available',     lastDonation: '2024-09-22' },
  { id: 'd052', name: 'Robiul Islam',      bloodGroup: 'AB-', location: 'Gazipur',    area: 'Sreepur',       phone: '01652-XXXXXX', status: 'Not Available', lastDonation: '2025-03-02' },
  { id: 'd053', name: 'Tasnim Jahan',      bloodGroup: 'AB-', location: 'Narsingdi',  area: 'Sadar',         phone: '01553-XXXXXX', status: 'Available',     lastDonation: '2024-08-05' },
  { id: 'd054', name: 'Belal Hossain',     bloodGroup: 'AB-', location: 'Sirajganj',  area: 'Ullapara',      phone: '01754-XXXXXX', status: 'Available',     lastDonation: '2024-12-18' },
];
