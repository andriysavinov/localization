import { useTranslation } from 'react-i18next';
const Currency = (props) => {
	const { t } = useTranslation();
	let entries = Object.entries(props.currencyList);
	const updatedList = entries.map(([key, val]) => {
		return <li key={key}>{t(key, val)}</li>;
	});

	return <ul>{updatedList}</ul>;
};

export default Currency;
