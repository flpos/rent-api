db.cars.drop();
db.cars.insertMany([
  {
    brand: 'Ford',
    model: 'Ka',
    color: 'black',
    imageUrl:
      'https://www.webmotors.com.br/imagens/prod/345742/FORD_KA_1.0_TIVCT_FLEX_SE_PLUS_MANUAL_INTERNA_34574212102729396.png',
    kilometers: 200,
    year: 2019,
  },
  {
    brand: 'Chevrolet',
    model: 'Onix',
    color: 'gray',
    imageUrl:
      'https://www.webmotors.com.br/imagens/prod/348146/CHEVROLET_ONIX_1.0_FLEX_MANUAL_34814611043340082.png',
    kilometers: 100,
    year: 2019,
  },
  {
    brand: 'Fiat',
    model: 'Uno',
    color: 'red',
    imageUrl:
      'https://www.webmotors.com.br/imagens/prod/347726/FIAT_UNO_1.0_FIREFLY_FLEX_DRIVE_MANUAL_34772615540036341.png',
    kilometers: 80,
    year: 2021,
  },
]);
