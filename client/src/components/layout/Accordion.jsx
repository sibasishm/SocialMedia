import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Icon } from 'semantic-ui-react';

const MyAccordion = ({ content }) => {
	const [activeIndex, setActiveIndex] = useState(-1);

	const toggleAccordionPanel = (e, { index }) => {
		setActiveIndex(activeIndex === index ? -1 : index);
	};
	return (
		<Accordion>
			{content.map(({ title, body }, idx) => (
				<div key={idx}>
					<Accordion.Title
						active={activeIndex === idx}
						index={idx}
						onClick={toggleAccordionPanel}
					>
						<Icon name='dropdown' />
						{title}
					</Accordion.Title>
					<Accordion.Content active={activeIndex === idx}>
						{body}
					</Accordion.Content>
				</div>
			))}
		</Accordion>
	);
};

MyAccordion.propTypes = {
	content: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			body: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
				.isRequired
		}).isRequired
	).isRequired
};

export default MyAccordion;
