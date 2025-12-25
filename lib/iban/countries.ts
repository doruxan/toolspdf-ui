// IBAN Country Specifications for 80+ countries
// Based on SWIFT IBAN Registry and ISO 13616 standard

export interface IBANCountrySpec {
  country: string;
  code: string;
  length: number;
  bbanFormat: string; // Format pattern for the BBAN part
  example: string;
  bankIdentifier: {
    position: number; // 0-indexed position after check digits
    length: number;
  };
  branchIdentifier?: {
    position: number;
    length: number;
  };
  sepa: boolean; // SEPA member
  regex: RegExp; // Validation pattern
}

export const IBAN_COUNTRIES: Record<string, IBANCountrySpec> = {
  AD: {
    country: 'Andorra',
    code: 'AD',
    length: 24,
    bbanFormat: '4n 4n 12c',
    example: 'AD12 0001 2030 2003 5910 0100',
    bankIdentifier: { position: 0, length: 4 },
    branchIdentifier: { position: 4, length: 4 },
    sepa: true,
    regex: /^AD\d{2}\d{4}\d{4}[A-Z0-9]{12}$/
  },
  AE: {
    country: 'United Arab Emirates',
    code: 'AE',
    length: 23,
    bbanFormat: '3n 16n',
    example: 'AE07 0331 2345 6789 0123 456',
    bankIdentifier: { position: 0, length: 3 },
    sepa: false,
    regex: /^AE\d{2}\d{3}\d{16}$/
  },
  AL: {
    country: 'Albania',
    code: 'AL',
    length: 28,
    bbanFormat: '8n 16c',
    example: 'AL47 2121 1009 0000 0002 3569 8741',
    bankIdentifier: { position: 0, length: 3 },
    branchIdentifier: { position: 3, length: 5 },
    sepa: false,
    regex: /^AL\d{2}\d{8}[A-Z0-9]{16}$/
  },
  AT: {
    country: 'Austria',
    code: 'AT',
    length: 20,
    bbanFormat: '5n 11n',
    example: 'AT61 1904 3002 3457 3201',
    bankIdentifier: { position: 0, length: 5 },
    sepa: true,
    regex: /^AT\d{2}\d{5}\d{11}$/
  },
  AZ: {
    country: 'Azerbaijan',
    code: 'AZ',
    length: 28,
    bbanFormat: '4a 20c',
    example: 'AZ21 NABZ 0000 0000 1370 1000 1944',
    bankIdentifier: { position: 0, length: 4 },
    sepa: false,
    regex: /^AZ\d{2}[A-Z]{4}[A-Z0-9]{20}$/
  },
  BA: {
    country: 'Bosnia and Herzegovina',
    code: 'BA',
    length: 20,
    bbanFormat: '3n 3n 8n 2n',
    example: 'BA39 1290 0794 0102 8494',
    bankIdentifier: { position: 0, length: 3 },
    branchIdentifier: { position: 3, length: 3 },
    sepa: false,
    regex: /^BA\d{2}\d{3}\d{3}\d{8}\d{2}$/
  },
  BE: {
    country: 'Belgium',
    code: 'BE',
    length: 16,
    bbanFormat: '3n 7n 2n',
    example: 'BE68 5390 0754 7034',
    bankIdentifier: { position: 0, length: 3 },
    sepa: true,
    regex: /^BE\d{2}\d{3}\d{7}\d{2}$/
  },
  BG: {
    country: 'Bulgaria',
    code: 'BG',
    length: 22,
    bbanFormat: '4a 4n 2n 8c',
    example: 'BG80 BNBG 9661 1020 3456 78',
    bankIdentifier: { position: 0, length: 4 },
    branchIdentifier: { position: 4, length: 4 },
    sepa: true,
    regex: /^BG\d{2}[A-Z]{4}\d{4}\d{2}[A-Z0-9]{8}$/
  },
  BH: {
    country: 'Bahrain',
    code: 'BH',
    length: 22,
    bbanFormat: '4a 14c',
    example: 'BH67 BMAG 0000 1299 1234 56',
    bankIdentifier: { position: 0, length: 4 },
    sepa: false,
    regex: /^BH\d{2}[A-Z]{4}[A-Z0-9]{14}$/
  },
  BR: {
    country: 'Brazil',
    code: 'BR',
    length: 29,
    bbanFormat: '8n 5n 10n 1a 1c',
    example: 'BR97 0036 0305 0000 1000 9795 493C 1',
    bankIdentifier: { position: 0, length: 8 },
    branchIdentifier: { position: 8, length: 5 },
    sepa: false,
    regex: /^BR\d{2}\d{8}\d{5}\d{10}[A-Z][A-Z0-9]$/
  },
  BY: {
    country: 'Belarus',
    code: 'BY',
    length: 28,
    bbanFormat: '4c 4n 16c',
    example: 'BY13 NBRB 3600 9000 0000 2Z00 AB00',
    bankIdentifier: { position: 0, length: 4 },
    sepa: false,
    regex: /^BY\d{2}[A-Z0-9]{4}\d{4}[A-Z0-9]{16}$/
  },
  CH: {
    country: 'Switzerland',
    code: 'CH',
    length: 21,
    bbanFormat: '5n 12c',
    example: 'CH93 0076 2011 6238 5295 7',
    bankIdentifier: { position: 0, length: 5 },
    sepa: true,
    regex: /^CH\d{2}\d{5}[A-Z0-9]{12}$/
  },
  CR: {
    country: 'Costa Rica',
    code: 'CR',
    length: 22,
    bbanFormat: '4n 14n',
    example: 'CR05 0152 0200 1026 2840 66',
    bankIdentifier: { position: 0, length: 4 },
    sepa: false,
    regex: /^CR\d{2}\d{4}\d{14}$/
  },
  CY: {
    country: 'Cyprus',
    code: 'CY',
    length: 28,
    bbanFormat: '3n 5n 16c',
    example: 'CY17 0020 0128 0000 0012 0052 7600',
    bankIdentifier: { position: 0, length: 3 },
    branchIdentifier: { position: 3, length: 5 },
    sepa: true,
    regex: /^CY\d{2}\d{3}\d{5}[A-Z0-9]{16}$/
  },
  CZ: {
    country: 'Czech Republic',
    code: 'CZ',
    length: 24,
    bbanFormat: '4n 6n 10n',
    example: 'CZ65 0800 0000 1920 0014 5399',
    bankIdentifier: { position: 0, length: 4 },
    sepa: true,
    regex: /^CZ\d{2}\d{4}\d{6}\d{10}$/
  },
  DE: {
    country: 'Germany',
    code: 'DE',
    length: 22,
    bbanFormat: '8n 10n',
    example: 'DE89 3704 0044 0532 0130 00',
    bankIdentifier: { position: 0, length: 8 },
    sepa: true,
    regex: /^DE\d{2}\d{8}\d{10}$/
  },
  DK: {
    country: 'Denmark',
    code: 'DK',
    length: 18,
    bbanFormat: '4n 9n 1n',
    example: 'DK50 0040 0440 1162 43',
    bankIdentifier: { position: 0, length: 4 },
    sepa: true,
    regex: /^DK\d{2}\d{4}\d{9}\d$/
  },
  DO: {
    country: 'Dominican Republic',
    code: 'DO',
    length: 28,
    bbanFormat: '4c 20n',
    example: 'DO28 BAGR 0000 0001 2124 5361 1324',
    bankIdentifier: { position: 0, length: 4 },
    sepa: false,
    regex: /^DO\d{2}[A-Z0-9]{4}\d{20}$/
  },
  EE: {
    country: 'Estonia',
    code: 'EE',
    length: 20,
    bbanFormat: '2n 2n 11n 1n',
    example: 'EE38 2200 2210 2014 5685',
    bankIdentifier: { position: 0, length: 2 },
    sepa: true,
    regex: /^EE\d{2}\d{2}\d{2}\d{11}\d$/
  },
  EG: {
    country: 'Egypt',
    code: 'EG',
    length: 29,
    bbanFormat: '4n 4n 17n',
    example: 'EG38 0019 0005 0000 0000 2631 8000 2',
    bankIdentifier: { position: 0, length: 4 },
    branchIdentifier: { position: 4, length: 4 },
    sepa: false,
    regex: /^EG\d{2}\d{4}\d{4}\d{17}$/
  },
  ES: {
    country: 'Spain',
    code: 'ES',
    length: 24,
    bbanFormat: '4n 4n 1n 1n 10n',
    example: 'ES91 2100 0418 4502 0005 1332',
    bankIdentifier: { position: 0, length: 4 },
    branchIdentifier: { position: 4, length: 4 },
    sepa: true,
    regex: /^ES\d{2}\d{4}\d{4}\d{1}\d{1}\d{10}$/
  },
  FI: {
    country: 'Finland',
    code: 'FI',
    length: 18,
    bbanFormat: '6n 7n 1n',
    example: 'FI21 1234 5600 0007 85',
    bankIdentifier: { position: 0, length: 6 },
    sepa: true,
    regex: /^FI\d{2}\d{6}\d{7}\d$/
  },
  FO: {
    country: 'Faroe Islands',
    code: 'FO',
    length: 18,
    bbanFormat: '4n 9n 1n',
    example: 'FO62 6460 0001 6316 34',
    bankIdentifier: { position: 0, length: 4 },
    sepa: true,
    regex: /^FO\d{2}\d{4}\d{9}\d$/
  },
  FR: {
    country: 'France',
    code: 'FR',
    length: 27,
    bbanFormat: '5n 5n 11c 2n',
    example: 'FR14 2004 1010 0505 0001 3M02 606',
    bankIdentifier: { position: 0, length: 5 },
    branchIdentifier: { position: 5, length: 5 },
    sepa: true,
    regex: /^FR\d{2}\d{5}\d{5}[A-Z0-9]{11}\d{2}$/
  },
  GB: {
    country: 'United Kingdom',
    code: 'GB',
    length: 22,
    bbanFormat: '4a 6n 8n',
    example: 'GB29 NWBK 6016 1331 9268 19',
    bankIdentifier: { position: 0, length: 4 },
    branchIdentifier: { position: 4, length: 6 },
    sepa: true,
    regex: /^GB\d{2}[A-Z]{4}\d{6}\d{8}$/
  },
  GE: {
    country: 'Georgia',
    code: 'GE',
    length: 22,
    bbanFormat: '2a 16n',
    example: 'GE29 NB00 0000 0101 9049 17',
    bankIdentifier: { position: 0, length: 2 },
    sepa: false,
    regex: /^GE\d{2}[A-Z]{2}\d{16}$/
  },
  GI: {
    country: 'Gibraltar',
    code: 'GI',
    length: 23,
    bbanFormat: '4a 15c',
    example: 'GI75 NWBK 0000 0000 7099 453',
    bankIdentifier: { position: 0, length: 4 },
    sepa: true,
    regex: /^GI\d{2}[A-Z]{4}[A-Z0-9]{15}$/
  },
  GL: {
    country: 'Greenland',
    code: 'GL',
    length: 18,
    bbanFormat: '4n 9n 1n',
    example: 'GL89 6471 0001 0002 06',
    bankIdentifier: { position: 0, length: 4 },
    sepa: true,
    regex: /^GL\d{2}\d{4}\d{9}\d$/
  },
  GR: {
    country: 'Greece',
    code: 'GR',
    length: 27,
    bbanFormat: '3n 4n 16c',
    example: 'GR16 0110 1250 0000 0001 2300 695',
    bankIdentifier: { position: 0, length: 3 },
    branchIdentifier: { position: 3, length: 4 },
    sepa: true,
    regex: /^GR\d{2}\d{3}\d{4}[A-Z0-9]{16}$/
  },
  GT: {
    country: 'Guatemala',
    code: 'GT',
    length: 28,
    bbanFormat: '4c 20c',
    example: 'GT82 TRAJ 0102 0000 0012 1002 9690',
    bankIdentifier: { position: 0, length: 4 },
    sepa: false,
    regex: /^GT\d{2}[A-Z0-9]{4}[A-Z0-9]{20}$/
  },
  HR: {
    country: 'Croatia',
    code: 'HR',
    length: 21,
    bbanFormat: '7n 10n',
    example: 'HR12 1001 0051 8630 0016 0',
    bankIdentifier: { position: 0, length: 7 },
    sepa: true,
    regex: /^HR\d{2}\d{7}\d{10}$/
  },
  HU: {
    country: 'Hungary',
    code: 'HU',
    length: 28,
    bbanFormat: '3n 4n 1n 15n 1n',
    example: 'HU42 1177 3016 1111 1018 0000 0000',
    bankIdentifier: { position: 0, length: 3 },
    branchIdentifier: { position: 3, length: 4 },
    sepa: true,
    regex: /^HU\d{2}\d{3}\d{4}\d{1}\d{15}\d$/
  },
  IE: {
    country: 'Ireland',
    code: 'IE',
    length: 22,
    bbanFormat: '4a 6n 8n',
    example: 'IE29 AIBK 9311 5212 3456 78',
    bankIdentifier: { position: 0, length: 4 },
    branchIdentifier: { position: 4, length: 6 },
    sepa: true,
    regex: /^IE\d{2}[A-Z]{4}\d{6}\d{8}$/
  },
  IL: {
    country: 'Israel',
    code: 'IL',
    length: 23,
    bbanFormat: '3n 3n 13n',
    example: 'IL62 0108 0000 0009 9999 999',
    bankIdentifier: { position: 0, length: 3 },
    branchIdentifier: { position: 3, length: 3 },
    sepa: false,
    regex: /^IL\d{2}\d{3}\d{3}\d{13}$/
  },
  IQ: {
    country: 'Iraq',
    code: 'IQ',
    length: 23,
    bbanFormat: '4a 3n 12n',
    example: 'IQ98 NBIQ 8501 2345 6789 012',
    bankIdentifier: { position: 0, length: 4 },
    branchIdentifier: { position: 4, length: 3 },
    sepa: false,
    regex: /^IQ\d{2}[A-Z]{4}\d{3}\d{12}$/
  },
  IS: {
    country: 'Iceland',
    code: 'IS',
    length: 26,
    bbanFormat: '4n 2n 6n 10n',
    example: 'IS14 0159 2600 7654 5510 7303 39',
    bankIdentifier: { position: 0, length: 4 },
    sepa: true,
    regex: /^IS\d{2}\d{4}\d{2}\d{6}\d{10}$/
  },
  IT: {
    country: 'Italy',
    code: 'IT',
    length: 27,
    bbanFormat: '1a 5n 5n 12c',
    example: 'IT60 X054 2811 1010 0000 0123 456',
    bankIdentifier: { position: 1, length: 5 },
    branchIdentifier: { position: 6, length: 5 },
    sepa: true,
    regex: /^IT\d{2}[A-Z]\d{5}\d{5}[A-Z0-9]{12}$/
  },
  JO: {
    country: 'Jordan',
    code: 'JO',
    length: 30,
    bbanFormat: '4a 4n 18c',
    example: 'JO94 CBJO 0010 0000 0000 0131 0003 02',
    bankIdentifier: { position: 0, length: 4 },
    branchIdentifier: { position: 4, length: 4 },
    sepa: false,
    regex: /^JO\d{2}[A-Z]{4}\d{4}[A-Z0-9]{18}$/
  },
  KW: {
    country: 'Kuwait',
    code: 'KW',
    length: 30,
    bbanFormat: '4a 22c',
    example: 'KW81 CBKU 0000 0000 0000 1234 5601 01',
    bankIdentifier: { position: 0, length: 4 },
    sepa: false,
    regex: /^KW\d{2}[A-Z]{4}[A-Z0-9]{22}$/
  },
  KZ: {
    country: 'Kazakhstan',
    code: 'KZ',
    length: 20,
    bbanFormat: '3n 13c',
    example: 'KZ86 125K ZT50 0410 0100',
    bankIdentifier: { position: 0, length: 3 },
    sepa: false,
    regex: /^KZ\d{2}\d{3}[A-Z0-9]{13}$/
  },
  LB: {
    country: 'Lebanon',
    code: 'LB',
    length: 28,
    bbanFormat: '4n 20c',
    example: 'LB62 0999 0000 0001 0019 0122 9114',
    bankIdentifier: { position: 0, length: 4 },
    sepa: false,
    regex: /^LB\d{2}\d{4}[A-Z0-9]{20}$/
  },
  LC: {
    country: 'Saint Lucia',
    code: 'LC',
    length: 32,
    bbanFormat: '4a 24c',
    example: 'LC55 HEMM 0001 0001 0012 0012 0002 3015',
    bankIdentifier: { position: 0, length: 4 },
    sepa: false,
    regex: /^LC\d{2}[A-Z]{4}[A-Z0-9]{24}$/
  },
  LI: {
    country: 'Liechtenstein',
    code: 'LI',
    length: 21,
    bbanFormat: '5n 12c',
    example: 'LI21 0881 0000 2324 013A A',
    bankIdentifier: { position: 0, length: 5 },
    sepa: true,
    regex: /^LI\d{2}\d{5}[A-Z0-9]{12}$/
  },
  LT: {
    country: 'Lithuania',
    code: 'LT',
    length: 20,
    bbanFormat: '5n 11n',
    example: 'LT12 1000 0111 0100 1000',
    bankIdentifier: { position: 0, length: 5 },
    sepa: true,
    regex: /^LT\d{2}\d{5}\d{11}$/
  },
  LU: {
    country: 'Luxembourg',
    code: 'LU',
    length: 20,
    bbanFormat: '3n 13c',
    example: 'LU28 0019 4006 4475 0000',
    bankIdentifier: { position: 0, length: 3 },
    sepa: true,
    regex: /^LU\d{2}\d{3}[A-Z0-9]{13}$/
  },
  LV: {
    country: 'Latvia',
    code: 'LV',
    length: 21,
    bbanFormat: '4a 13c',
    example: 'LV80 BANK 0000 4351 9500 1',
    bankIdentifier: { position: 0, length: 4 },
    sepa: true,
    regex: /^LV\d{2}[A-Z]{4}[A-Z0-9]{13}$/
  },
  LY: {
    country: 'Libya',
    code: 'LY',
    length: 25,
    bbanFormat: '3n 3n 15n',
    example: 'LY83 0020 4800 0002 0127 3618 11',
    bankIdentifier: { position: 0, length: 3 },
    branchIdentifier: { position: 3, length: 3 },
    sepa: false,
    regex: /^LY\d{2}\d{3}\d{3}\d{15}$/
  },
  MC: {
    country: 'Monaco',
    code: 'MC',
    length: 27,
    bbanFormat: '5n 5n 11c 2n',
    example: 'MC58 1122 2000 0101 2345 6789 030',
    bankIdentifier: { position: 0, length: 5 },
    branchIdentifier: { position: 5, length: 5 },
    sepa: true,
    regex: /^MC\d{2}\d{5}\d{5}[A-Z0-9]{11}\d{2}$/
  },
  MD: {
    country: 'Moldova',
    code: 'MD',
    length: 24,
    bbanFormat: '2c 18c',
    example: 'MD24 AG00 0225 1000 1310 4168',
    bankIdentifier: { position: 0, length: 2 },
    sepa: false,
    regex: /^MD\d{2}[A-Z0-9]{2}[A-Z0-9]{18}$/
  },
  ME: {
    country: 'Montenegro',
    code: 'ME',
    length: 22,
    bbanFormat: '3n 13n 2n',
    example: 'ME25 5050 0001 2345 6789 51',
    bankIdentifier: { position: 0, length: 3 },
    sepa: false,
    regex: /^ME\d{2}\d{3}\d{13}\d{2}$/
  },
  MK: {
    country: 'North Macedonia',
    code: 'MK',
    length: 19,
    bbanFormat: '3n 10c 2n',
    example: 'MK07 2501 2000 0058 984',
    bankIdentifier: { position: 0, length: 3 },
    sepa: false,
    regex: /^MK\d{2}\d{3}[A-Z0-9]{10}\d{2}$/
  },
  MR: {
    country: 'Mauritania',
    code: 'MR',
    length: 27,
    bbanFormat: '5n 5n 11n 2n',
    example: 'MR13 0002 0001 0100 0012 3456 753',
    bankIdentifier: { position: 0, length: 5 },
    branchIdentifier: { position: 5, length: 5 },
    sepa: false,
    regex: /^MR\d{2}\d{5}\d{5}\d{11}\d{2}$/
  },
  MT: {
    country: 'Malta',
    code: 'MT',
    length: 31,
    bbanFormat: '4a 5n 18c',
    example: 'MT84 MALT 0110 0001 2345 MTLC AST0 01S',
    bankIdentifier: { position: 0, length: 4 },
    branchIdentifier: { position: 4, length: 5 },
    sepa: true,
    regex: /^MT\d{2}[A-Z]{4}\d{5}[A-Z0-9]{18}$/
  },
  MU: {
    country: 'Mauritius',
    code: 'MU',
    length: 30,
    bbanFormat: '4a 2n 2n 12n 3n 3a',
    example: 'MU17 BOMM 0101 1010 3030 0200 000M UR',
    bankIdentifier: { position: 0, length: 6 },
    branchIdentifier: { position: 6, length: 2 },
    sepa: false,
    regex: /^MU\d{2}[A-Z]{4}\d{2}\d{2}\d{12}\d{3}[A-Z]{3}$/
  },
  NL: {
    country: 'Netherlands',
    code: 'NL',
    length: 18,
    bbanFormat: '4a 10n',
    example: 'NL91 ABNA 0417 1643 00',
    bankIdentifier: { position: 0, length: 4 },
    sepa: true,
    regex: /^NL\d{2}[A-Z]{4}\d{10}$/
  },
  NO: {
    country: 'Norway',
    code: 'NO',
    length: 15,
    bbanFormat: '4n 6n 1n',
    example: 'NO93 8601 1117 947',
    bankIdentifier: { position: 0, length: 4 },
    sepa: true,
    regex: /^NO\d{2}\d{4}\d{6}\d$/
  },
  PK: {
    country: 'Pakistan',
    code: 'PK',
    length: 24,
    bbanFormat: '4a 16c',
    example: 'PK36 SCBL 0000 0011 2345 6702',
    bankIdentifier: { position: 0, length: 4 },
    sepa: false,
    regex: /^PK\d{2}[A-Z]{4}[A-Z0-9]{16}$/
  },
  PL: {
    country: 'Poland',
    code: 'PL',
    length: 28,
    bbanFormat: '8n 16n',
    example: 'PL61 1090 1014 0000 0712 1981 2874',
    bankIdentifier: { position: 0, length: 8 },
    sepa: true,
    regex: /^PL\d{2}\d{8}\d{16}$/
  },
  PS: {
    country: 'Palestine',
    code: 'PS',
    length: 29,
    bbanFormat: '4a 21c',
    example: 'PS92 PALS 0000 0000 0400 1234 5670 2',
    bankIdentifier: { position: 0, length: 4 },
    sepa: false,
    regex: /^PS\d{2}[A-Z]{4}[A-Z0-9]{21}$/
  },
  PT: {
    country: 'Portugal',
    code: 'PT',
    length: 25,
    bbanFormat: '4n 4n 11n 2n',
    example: 'PT50 0002 0123 1234 5678 9015 4',
    bankIdentifier: { position: 0, length: 4 },
    branchIdentifier: { position: 4, length: 4 },
    sepa: true,
    regex: /^PT\d{2}\d{4}\d{4}\d{11}\d{2}$/
  },
  QA: {
    country: 'Qatar',
    code: 'QA',
    length: 29,
    bbanFormat: '4a 21c',
    example: 'QA58 DOHB 0000 1234 5678 90AB CDEF G',
    bankIdentifier: { position: 0, length: 4 },
    sepa: false,
    regex: /^QA\d{2}[A-Z]{4}[A-Z0-9]{21}$/
  },
  RO: {
    country: 'Romania',
    code: 'RO',
    length: 24,
    bbanFormat: '4a 16c',
    example: 'RO49 AAAA 1B31 0075 9384 0000',
    bankIdentifier: { position: 0, length: 4 },
    sepa: true,
    regex: /^RO\d{2}[A-Z]{4}[A-Z0-9]{16}$/
  },
  RS: {
    country: 'Serbia',
    code: 'RS',
    length: 22,
    bbanFormat: '3n 13n 2n',
    example: 'RS35 2600 0560 1001 6113 79',
    bankIdentifier: { position: 0, length: 3 },
    sepa: false,
    regex: /^RS\d{2}\d{3}\d{13}\d{2}$/
  },
  SA: {
    country: 'Saudi Arabia',
    code: 'SA',
    length: 24,
    bbanFormat: '2n 18c',
    example: 'SA03 8000 0000 6080 1016 7519',
    bankIdentifier: { position: 0, length: 2 },
    sepa: false,
    regex: /^SA\d{2}\d{2}[A-Z0-9]{18}$/
  },
  SC: {
    country: 'Seychelles',
    code: 'SC',
    length: 31,
    bbanFormat: '4a 2n 2n 16n 3a',
    example: 'SC18 SSCB 1101 0000 0000 0000 1497 USD',
    bankIdentifier: { position: 0, length: 6 },
    branchIdentifier: { position: 6, length: 2 },
    sepa: false,
    regex: /^SC\d{2}[A-Z]{4}\d{2}\d{2}\d{16}[A-Z]{3}$/
  },
  SE: {
    country: 'Sweden',
    code: 'SE',
    length: 24,
    bbanFormat: '3n 16n 1n',
    example: 'SE45 5000 0000 0583 9825 7466',
    bankIdentifier: { position: 0, length: 3 },
    sepa: true,
    regex: /^SE\d{2}\d{3}\d{16}\d$/
  },
  SI: {
    country: 'Slovenia',
    code: 'SI',
    length: 19,
    bbanFormat: '5n 8n 2n',
    example: 'SI56 2633 0001 2039 086',
    bankIdentifier: { position: 0, length: 5 },
    sepa: true,
    regex: /^SI\d{2}\d{5}\d{8}\d{2}$/
  },
  SK: {
    country: 'Slovakia',
    code: 'SK',
    length: 24,
    bbanFormat: '4n 6n 10n',
    example: 'SK31 1200 0000 1987 4263 7541',
    bankIdentifier: { position: 0, length: 4 },
    sepa: true,
    regex: /^SK\d{2}\d{4}\d{6}\d{10}$/
  },
  SM: {
    country: 'San Marino',
    code: 'SM',
    length: 27,
    bbanFormat: '1a 5n 5n 12c',
    example: 'SM86 U032 2509 8000 0000 0270 100',
    bankIdentifier: { position: 1, length: 5 },
    branchIdentifier: { position: 6, length: 5 },
    sepa: true,
    regex: /^SM\d{2}[A-Z]\d{5}\d{5}[A-Z0-9]{12}$/
  },
  ST: {
    country: 'Sao Tome and Principe',
    code: 'ST',
    length: 25,
    bbanFormat: '4n 4n 11n 2n',
    example: 'ST68 0001 0001 0051 8453 1011 2',
    bankIdentifier: { position: 0, length: 4 },
    branchIdentifier: { position: 4, length: 4 },
    sepa: false,
    regex: /^ST\d{2}\d{4}\d{4}\d{11}\d{2}$/
  },
  SV: {
    country: 'El Salvador',
    code: 'SV',
    length: 28,
    bbanFormat: '4a 20n',
    example: 'SV62 CENR 0000 0000 0000 0070 0025',
    bankIdentifier: { position: 0, length: 4 },
    sepa: false,
    regex: /^SV\d{2}[A-Z]{4}\d{20}$/
  },
  TL: {
    country: 'East Timor',
    code: 'TL',
    length: 23,
    bbanFormat: '3n 14n 2n',
    example: 'TL38 0080 0123 4567 8910 157',
    bankIdentifier: { position: 0, length: 3 },
    sepa: false,
    regex: /^TL\d{2}\d{3}\d{14}\d{2}$/
  },
  TN: {
    country: 'Tunisia',
    code: 'TN',
    length: 24,
    bbanFormat: '2n 3n 13n 2n',
    example: 'TN59 1000 6035 1835 9847 8831',
    bankIdentifier: { position: 0, length: 2 },
    branchIdentifier: { position: 2, length: 3 },
    sepa: false,
    regex: /^TN\d{2}\d{2}\d{3}\d{13}\d{2}$/
  },
  TR: {
    country: 'Turkey',
    code: 'TR',
    length: 26,
    bbanFormat: '5n 1c 16c',
    example: 'TR33 0006 1005 1978 6457 8413 26',
    bankIdentifier: { position: 0, length: 5 },
    sepa: false,
    regex: /^TR\d{2}\d{5}[A-Z0-9][A-Z0-9]{16}$/
  },
  UA: {
    country: 'Ukraine',
    code: 'UA',
    length: 29,
    bbanFormat: '6n 19c',
    example: 'UA21 3223 1300 0002 6007 2335 6600 1',
    bankIdentifier: { position: 0, length: 6 },
    sepa: false,
    regex: /^UA\d{2}\d{6}[A-Z0-9]{19}$/
  },
  VA: {
    country: 'Vatican City',
    code: 'VA',
    length: 22,
    bbanFormat: '3n 15n',
    example: 'VA59 0011 2300 0012 3456 78',
    bankIdentifier: { position: 0, length: 3 },
    sepa: true,
    regex: /^VA\d{2}\d{3}\d{15}$/
  },
  VG: {
    country: 'British Virgin Islands',
    code: 'VG',
    length: 24,
    bbanFormat: '4a 16n',
    example: 'VG96 VPVG 0000 0123 4567 8901',
    bankIdentifier: { position: 0, length: 4 },
    sepa: false,
    regex: /^VG\d{2}[A-Z]{4}\d{16}$/
  },
  XK: {
    country: 'Kosovo',
    code: 'XK',
    length: 20,
    bbanFormat: '4n 10n 2n',
    example: 'XK05 1212 0123 4567 8906',
    bankIdentifier: { position: 0, length: 2 },
    branchIdentifier: { position: 2, length: 2 },
    sepa: false,
    regex: /^XK\d{2}\d{4}\d{10}\d{2}$/
  }
};

// Helper to get country by code
export function getCountrySpec(countryCode: string): IBANCountrySpec | undefined {
  return IBAN_COUNTRIES[countryCode.toUpperCase()];
}

// Get all country codes
export function getAllCountryCodes(): string[] {
  return Object.keys(IBAN_COUNTRIES).sort();
}

// Get SEPA countries only
export function getSEPACountries(): IBANCountrySpec[] {
  return Object.values(IBAN_COUNTRIES).filter(country => country.sepa);
}

// Search countries by name
export function searchCountries(query: string): IBANCountrySpec[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(IBAN_COUNTRIES).filter(country =>
    country.country.toLowerCase().includes(lowerQuery) ||
    country.code.toLowerCase().includes(lowerQuery)
  );
}

