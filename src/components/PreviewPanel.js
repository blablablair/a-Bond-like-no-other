import React from 'react';
import styled from '@emotion/styled';
import { Title } from '../typography';
import PropTypes from 'prop-types';
import { DescriptionList } from './DescriptionList';

const StyledButton = styled('button')`
	display: contents;
	cursor: pointer;

	:hover {
		img {
			transform: scale(1.01);
		}
	}
`;

const StyledPoster = styled('img')`
	border-radius: 2px;
	margin-bottom: 16px;
	transition: transform 0.1s ease-out;
	width: 440px;
`;

const StyledWrapper = styled('div')`
	display: flex;
	flex-direction: column;
	flex: 1 0 15%;
	margin-bottom: 16px;
	margin-right: 16px;
`;

const PreviewPanel = ({ actorName, imageUrl, movieName, onClick, ukReleaseDate }) => (
	<StyledWrapper>
		<Title text={movieName} />
		<StyledButton onClick={onClick}>
			<StyledPoster src={imageUrl} alt={`${movieName}-poster`} />
		</StyledButton>
		<DescriptionList
			items={[
				{ tag: 'Actor', description: actorName },
				{ tag: 'Release Date (UK)', description: ukReleaseDate },
			]}
		/>
	</StyledWrapper>
);

PreviewPanel.propTypes = {
	actorName: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	movieName: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	ukReleaseDate: PropTypes.string.isRequired,
};

export { PreviewPanel };
