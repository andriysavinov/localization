import './App.css';
import React, { useEffect } from 'react';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import Units from './components/Units';
import Dates from './components/Dates';
import Numbers from './components/Numbers';
import Currency from './components/Currency';

function App() {
	const { t, i18n } = useTranslation();

	const locales = {
		uk: { title: 'Українська' },
		en: { title: 'English' },
		fr: { title: 'Frances' },
	};
	const datesList = [
		'timeDif',
		'fullDate',
		'localisedDate',
		'weekDay',
		'postedOn',
	];
	const numbersList = [
		{ intlNumber: 1000000000 },
		{ intlNumber: 0.1233123 },
		{ intlNumber2: 543123 },
		{ intlNumber2: 0.12345453 },
	];
	const unitsList = {
		distance: { distance: 10, units: 'cm' },
		mass: { mass: 25, units: 'kg' },
		volume: { volume: 38, units: 'L' },
	};
	const currencyList = {
		currencyMain: {
			usdValue: 12345.67,
			eurValue: 16543.21,
			uahValue: 240543.21,
			formatParams: {
				usdValue: { currency: 'USD', locale: 'en' },
				eurValue: { currency: 'EUR', locale: 'fr' },
				uahValue: { currency: 'UAH', locale: 'ua' },
			},
		},
	};

	const defaultLang = Object.keys(locales).includes(i18n.language)
		? i18n.language
		: 'en';

	useEffect(() => {
		modifyPath(defaultLang);
	}, []);

	function handleSelectChange(event) {
		modifyPath(event.target.value);
		i18n.changeLanguage(event.target.value);
	}

	function modifyPath(code) {
		if (!window.location.pathname.startsWith(`/${code}`)) {
			window.location.pathname = `/${code}/`;
		}
	}

	return (
		<div>
			<select onChange={handleSelectChange} defaultValue={defaultLang}>
				{Object.keys(locales).map((locale) => (
					<option key={locale} value={locale}>
						{locales[locale].title}
					</option>
				))}
			</select>
			<h1>{t('header')}</h1>
			<h1>{t('datesHeader')}</h1>
			<Dates datesList={datesList} />
			<h1>{t('numbersHeader')}</h1>
			<Numbers numbersList={numbersList} />
			<h1>{t('unitsHeader')}</h1>
			<Units unitsList={unitsList} />
			<h1>{t('currencyHeader')}</h1>
			<Currency currencyList={currencyList} />
			<p>{t('header22323')}</p>
		</div>
	);
}

export default function WrappedApp() {
	return (
		<Suspense fallback="...loading">
			<App />
		</Suspense>
	);
}
