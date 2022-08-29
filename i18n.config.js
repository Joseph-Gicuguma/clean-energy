const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['responses'],
  defaultLocale: 'responses',
  directory: path.join(__dirname, 'auto'),
  objectNotation: true,
  api: {
    __: 'translate',
    __n: 'translateN',
  },
});

module.exports = i18n;
