const tanzaniaRegions = [
  {
    name: 'Arusha',
    districts: [
      'Arusha City',
      'Arusha District',
      'Karatu',
      'Longido',
      'Monduli',
      'Ngorongoro'
    ]
  },
  {
    name: 'Dar es Salaam',
    districts: [
      'Ilala',
      'Kinondoni',
      'Temeke',
      'Ubungo',
      'Kigamboni'
    ]
  },
  {
    name: 'Dodoma',
    districts: [
      'Dodoma City',
      'Bahi',
      'Chamwino',
      'Chemba',
      'Kondoa',
      'Kongwa',
      'Mpwapwa'
    ]
  },
  {
    name: 'Geita',
    districts: [
      'Bukombe',
      'Chato',
      'Geita',
      'Mbogwe',
      'Nyang\'hwale'
    ]
  },
  {
    name: 'Iringa',
    districts: [
      'Iringa City',
      'Iringa District',
      'Kilolo',
      'Mafinga',
      'Mufindi',
      'Njombe'
    ]
  },
  {
    name: 'Kagera',
    districts: [
      'Biharamulo',
      'Bukoba',
      'Bukoba Rural',
      'Karagwe',
      'Kyerwa',
      'Missenyi',
      'Muleba',
      'Ngara'
    ]
  },
  {
    name: 'Katavi',
    districts: [
      'Mlele',
      'Mpanda',
      'Mpanda City'
    ]
  },
  {
    name: 'Kigoma',
    districts: [
      'Buhigwe',
      'Kakonko',
      'Kasulu',
      'Kasulu Town',
      'Kibondo',
      'Kigoma',
      'Uvinza'
    ]
  },
  {
    name: 'Kilimanjaro',
    districts: [
      'Hai',
      'Moshi',
      'Moshi City',
      'Mwanga',
      'Rombo',
      'Same',
      'Siha'
    ]
  },
  {
    name: 'Lindi',
    districts: [
      'Kilwa',
      'Lindi',
      'Liwale',
      'Nachingwea',
      'Ruangwa'
    ]
  },
  {
    name: 'Manyara',
    districts: [
      'Babati',
      'Babati Town',
      'Hanang',
      'Kiteto',
      'Mbulu',
      'Simanjiro'
    ]
  },
  {
    name: 'Mara',
    districts: [
      'Bunda',
      'Butiama',
      'Musoma',
      'Musoma City',
      'Rorya',
      'Serengeti',
      'Tarime'
    ]
  },
  {
    name: 'Mbeya',
    districts: [
      'Busokelo',
      'Chunya',
      'Kyela',
      'Mbarali',
      'Mbeya City',
      'Mbeya District',
      'Rungwe'
    ]
  },
  {
    name: 'Morogoro',
    districts: [
      'Gairo',
      'Kilombero',
      'Kilosa',
      'Malinyi',
      'Morogoro',
      'Morogoro City',
      'Mvomero',
      'Ulanga'
    ]
  },
  {
    name: 'Mtwara',
    districts: [
      'Masasi',
      'Masasi Town',
      'Mtwara',
      'Mtwara City',
      'Nanyumbu',
      'Newala',
      'Tandahimba'
    ]
  },
  {
    name: 'Mwanza',
    districts: [
      'Ilemela',
      'Kwimba',
      'Magu',
      'Misungwi',
      'Nyamagana',
      'Sengerema',
      'Ukerewe'
    ]
  },
  {
    name: 'Njombe',
    districts: [
      'Ludewa',
      'Makambako',
      'Makete',
      'Njombe',
      'Njombe Town',
      'Wanging\'ombe'
    ]
  },
  {
    name: 'Pemba North',
    districts: [
      'Micheweni',
      'Wete'
    ]
  },
  {
    name: 'Pemba South',
    districts: [
      'Chake Chake',
      'Mkoani'
    ]
  },
  {
    name: 'Pwani',
    districts: [
      'Bagamoyo',
      'Chalinze',
      'Kibaha',
      'Kibaha Town',
      'Kisarawe',
      'Mafia',
      'Mkuranga',
      'Rufiji'
    ]
  },
  {
    name: 'Rukwa',
    districts: [
      'Kalambo',
      'Nkasi',
      'Sumbawanga',
      'Sumbawanga City'
    ]
  },
  {
    name: 'Ruvuma',
    districts: [
      'Mbinga',
      'Songea',
      'Songea City',
      'Tunduru'
    ]
  },
  {
    name: 'Shinyanga',
    districts: [
      'Kahama',
      'Kahama Town',
      'Kishapu',
      'Msalala',
      'Shinyanga',
      'Shinyanga City'
    ]
  },
  {
    name: 'Simiyu',
    districts: [
      'Bariadi',
      'Busega',
      'Itilima',
      'Maswa',
      'Meatu'
    ]
  },
  {
    name: 'Singida',
    districts: [
      'Ikungi',
      'Iramba',
      'Manyoni',
      'Mkalama',
      'Singida',
      'Singida City'
    ]
  },
  {
    name: 'Songwe',
    districts: [
      'Ileje',
      'Mbozi',
      'Momba',
      'Songwe'
    ]
  },
  {
    name: 'Tabora',
    districts: [
      'Igunga',
      'Kaliua',
      'Nzega',
      'Sikonge',
      'Tabora',
      'Urambo',
      'Uyui'
    ]
  },
  {
    name: 'Tanga',
    districts: [
      'Handeni',
      'Handeni Town',
      'Kilindi',
      'Korogwe',
      'Korogwe Town',
      'Lushoto',
      'Muheza',
      'Mkinga',
      'Pangani',
      'Tanga City'
    ]
  },
  {
    name: 'Unguja North',
    districts: [
      'Kaskazini A',
      'Kaskazini B'
    ]
  },
  {
    name: 'Unguja South',
    districts: [
      'Kusini',
      'Kusini Town'
    ]
  },
  {
    name: 'Unguja West',
    districts: [
      'Magharibi',
      'Magharibi Town'
    ]
  }
];

module.exports = tanzaniaRegions; 