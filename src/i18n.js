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
					if (format === 'short')
						return formatDate(value, 'P', { locale });
					if (format === 'long')
						return formatDate(value, 'PPPP', { locale });
					if (format === 'relative')
						return formatRelative(value, new Date(), { locale });
					if (format === 'ago')
						return formatDistance(value, new Date(), {
							locale,
							addSuffix: true,
						});
					return formatDate(value, format, { locale });
				} else {
					if (locale?.code.startsWith('en')) {
						if (format === 'cm') {
							return new Intl.NumberFormat('fr', {
								maximumSignificantDigits: 4,
							}).format(convert(value, 'cm').to('in'));
						}
						if (format === 'kg') {
							return new Intl.NumberFormat('fr', {
								maximumSignificantDigits: 4,
							}).format(convert(value, 'kg').to('lb'));
						}
						if (format === 'L') {
							return new Intl.NumberFormat('fr', {
								maximumSignificantDigits: 4,
							}).format(convert(value, 'L').to('fl oz'));
						}
						if (format === 'num') {
							return new Intl.NumberFormat('en-US').format(value);
						}
						if (format === 'num2') {
							return new Intl.NumberFormat('en-US', {
								maximumSignificantDigits: 9,
							}).format(value);
						}
					} else {
						if (format === 'in') {
							return convert(value, 'in').to('cm');
						}
						if (format === 'lb') {
							return convert(value, 'lb').to('kg');
						}
						if (format === 'fl oz') {
							return convert(value, 'fl oz').to('L');
						}
						if (format === 'num') {
							return new Intl.NumberFormat('fr').format(value);
						}
						if (format === 'num2') {
							return new Intl.NumberFormat('fr', {
								maximumSignificantDigits: 9,
							}).format(value);
						}
					}
				}

				return value;
			},
		},
	});

export default i18n;
