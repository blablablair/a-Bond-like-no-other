import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import { ReactComponent as GoldFinger } from '../assets/svgs/gold-finger.svg';
import { colours } from '../assets/tokens';

const StyledItem = styled('li')`
	align-items: center;
	display: flex;
	list-style-type: none;
	margin-bottom: 8px;

	a {
		color: ${(props) => (props.isCurrentPage ? colours.gold : colours.white)};
		font-family: Lato, sans-serif;
		font-size: 21px;
		${(props) => props.isCurrentPage && `pointer-events: none;`};
		transition: color 0.2s ease-out;
		text-decoration: none;

		${(props) =>
			!props.isCurrentPage
				? `
			:hover,
			:focus {
				outline: 0;
				text-decoration: underline;
				transition: none;
			}
		`
				: `
		:focus {
			outline: 0;
		}
	`}
	}

	svg {
		height: 14px;
		margin-left: 8px;
		width: 34px;
	}
`;

const StyledList = styled('ul')`
	margin: 0;
	padding: 0;
`;

const StyledNav = styled('nav')`
	background-color: ${colours.black};
	position: fixed;
	height: 100%;
	margin: 0;
	padding: 24px;
	width: 140px;
`;

const Sidebar = (props) => {
	const isHome = props.location.pathname === '/';
	const isFavourites = props.location.pathname === '/favourites';
	const isMovies = props.location.pathname === '/movies';
	return (
		<div className="navigation">
			<StyledNav>
				<StyledList>
					<StyledItem isCurrentPage={isHome}>
						<Link tabIndex={isHome ? '-1' : '1'} to={'/'}>
							Home
						</Link>
						{isHome && <GoldFinger />}
					</StyledItem>
					<StyledItem isCurrentPage={isMovies}>
						<Link tabIndex={isMovies ? '-1' : '1'} to="/movies">
							Movies
						</Link>
						{isMovies && <GoldFinger />}
					</StyledItem>
					<StyledItem isCurrentPage={isFavourites}>
						<Link tabIndex={isFavourites ? '-1' : '1'} to="/favourites">
							Favourites
						</Link>
						{isFavourites && <GoldFinger />}
					</StyledItem>
				</StyledList>
			</StyledNav>
		</div>
	);
};

const routerSidebar = withRouter(Sidebar);

export { routerSidebar as Sidebar };
