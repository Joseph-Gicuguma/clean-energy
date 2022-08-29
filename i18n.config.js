const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['en', 'sw'],
  defaultLocale: 'en',
  directory: path.join(__dirname, 'locales'),
  objectNotation: true,
  api: {
    __: 'translate',
    __n: 'translateN',
  },
});

module.exports = i18n;
