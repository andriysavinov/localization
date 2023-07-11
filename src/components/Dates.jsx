import { useTranslation } from 'react-i18next';
import addDays from 'date-fns/addDays';
const Dates = (props) => {
	const { t } = useTranslation();
	const list = props.datesList;
	const updatedList = list.map((listItem) => {
		const date = new Date();
		return (
			<li key={listItem}>
				{listItem === 'timeDif' ? (
					<>
						{t(listItem, {
							stime: date,
							etime: addDays(date, 1),
						})}
					</>
				) : (
					<>{t(listItem, { date })}</>
				)}
			</li>
		);
	});

	return <ul>{updatedList}</ul>;
};

export default Dates;
