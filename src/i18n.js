import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {
	format as formatDate,
	formatRelative,
	formatDistance,
	isDate,
} from 'date-fns';
import { enUS, fr, uk } from 'date-fns/locale';
import convert from 'convert';

const locales = { enUS, fr, uk };

i18n.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: 'en',
		parseMissingKeyHandler: (key) => {
			return `No translation found for "${key}"`;
		},
		debug: false,
		interpolation: {
			escapeValue: false,
			format: (value, format, lng) => {
				let locale =
					lng === 'en' ? Object.values(locales)[0] : locales[lng];
				if (isDate(value)) {
					switch (format) {
						case 'short':
							formatDate(value, 'P', { locale });
							break;
						case 'long':
							formatDate(value, 'PPPP', { locale });
							break;
						case 'relative':
							formatRelative(value, new Date(), {
								locale,
							});
							break;
						case 'ago':
							formatDistance(value, new Date(), {
								locale,
								addSuffix: true,
							});
							break;
						default:
							formatDate(value, format, { locale });
					}
				} else {
					if (locale?.code.startsWith('en')) {
						switch (format) {
							case 'cm':
								new Intl.NumberFormat('fr', {
									maximumSignificantDigits: 4,
								}).format(convert(value, 'cm').to('in'));
								break;
							case 'kg':
								new Intl.NumberFormat('fr', {
									maximumSignificantDigits: 4,
								}).format(convert(value, 'kg').to('lb'));
								break;
							case 'L':
								new Intl.NumberFormat('fr', {
									maximumSignificantDigits: 4,
								}).format(convert(value, 'L').to('fl oz'));
								break;
							case 'num':
								new Intl.NumberFormat('en-US').format(value);
								break;
							case 'num2':
								new Intl.NumberFormat('en-US', {
									maximumSignificantDigits: 9,
								}).format(value);
								break;
							default:
								break;
						}
					} else {
						switch (format) {
							case 'in':
								convert(value, 'in').to('cm');
								break;
							case 'lb':
								convert(value, 'lb').to('kg');
								break;
							case 'fl oz':
								convert(value, 'fl oz').to('L');
								break;
							case 'num':
								new Intl.NumberFormat('fr').format(value);
								break;
							case 'num2':
								new Intl.NumberFormat('fr', {
									maximumSignificantDigits: 9,
								}).format(value);
								break;
							default:
								break;
						}
					}
				}

				return value;
			},
		},
	});

export default i18n;
