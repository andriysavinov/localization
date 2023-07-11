import { useTranslation } from 'react-i18next';
const Numbers = (props) => {
	const { t } = useTranslation();
	let entries = Object.entries(props.numbersList);
	const updatedList = entries.map(([key, val]) => {
		return (
			<li key={Object.values(val).toString()}>
				{t(Object.keys(val), { val: Object.values(val) })}
			</li>
		);
	});

	return <ul>{updatedList}</ul>;
};

export default Numbers;
