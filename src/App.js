import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomePage, MoviesPage, FavouritesPage } from './pages';
import { Sidebar } from './components';
import { updateSelectedMovie } from './data/SessionStorageWriter';
import { checkSelectedMovie } from './data/SessionStorageReader';
import { updateFavouriteMovies } from './data/LocalStorageWriter';
import { checkFavouriteMovies } from './data/LocalStorageReader';
import movies from './data/movies.json';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			createModalIsOpen: false,
			detailsModalIsOpen: Object.keys(checkSelectedMovie()).length !== 0,
			favouriteMovieTitles: checkFavouriteMovies(),
			moviesList: movies['Bond Films'],
			selectedMovieDetails: checkSelectedMovie(),
		};
	}

	createMovieOnClickHandler = (newMovie) => {
		const newMoviesList = this.state.moviesList.concat(newMovie);
		console.log(newMoviesList);
		this.setState(() => ({ moviesList: newMoviesList }));
	};

	closeCreateOnClickHandler = () => {
		this.setState(() => ({ createModalIsOpen: false }));
	};

	closePreviewOnClickHandler = () => {
		this.setState(() => ({ detailsModalIsOpen: false, selectedMovieDetails: {} }));
		updateSelectedMovie({});
	};

	openCreateOnClickHandler = () => {
		this.setState(() => ({ createModalIsOpen: true }));
	};

	openPreviewOnClickHandler = (movie) => {
		this.setState(() => ({ detailsModalIsOpen: true, selectedMovieDetails: movie }));
		updateSelectedMovie(movie);
	};

	toggleFavouriteMovie = (movie) => () => {
		const isFavourite = this.state.favouriteMovieTitles.includes(movie);
		const currentFaves = [...this.state.favouriteMovieTitles];

		let newFaves;
		if (isFavourite) {
			newFaves = currentFaves.filter((favouriteMovie) => favouriteMovie !== movie);
		} else {
			currentFaves.push(movie);
			newFaves = [...currentFaves];
		}
		this.setState({ favouriteMovieTitles: newFaves });
		updateFavouriteMovies(newFaves);
	};

	render() {
		const { createModalIsOpen, detailsModalIsOpen, favouriteMovieTitles, moviesList, selectedMovieDetails } = this.state;
		return (
			<Router>
				<Sidebar />
				<Switch>
					<Route path="/" exact component={() => <HomePage />} />
					<Route
						path="/movies"
						exact
						component={() => (
							<MoviesPage
								closeCreateOnClickHandler={this.closeCreateOnClickHandler}
								closePreviewOnClickHandler={this.closePreviewOnClickHandler}
								createMovieOnClickHandler={this.createMovieOnClickHandler}
								createModalIsOpen={createModalIsOpen}
								detailsModalIsOpen={detailsModalIsOpen}
								favouriteMovieTitles={favouriteMovieTitles}
								moviesList={moviesList}
								openCreateOnClickHandler={this.openCreateOnClickHandler}
								openPreviewOnClickHandler={this.openPreviewOnClickHandler}
								selectedMovieDetails={selectedMovieDetails}
								toggleFavouriteMovieOnClick={this.toggleFavouriteMovie}
							/>
						)}
					/>
					<Route
						path="/favourites"
						exact
						component={() => (
							<FavouritesPage
								closePreviewOnClickHandler={this.closePreviewOnClickHandler}
								favouriteMovieTitles={favouriteMovieTitles}
								detailsModalIsOpen={detailsModalIsOpen}
								moviesList={moviesList}
								openPreviewOnClickHandler={this.openPreviewOnClickHandler}
								selectedMovieDetails={selectedMovieDetails}
								toggleFavouriteMovieOnClick={this.toggleFavouriteMovie}
							/>
						)}
					/>
				</Switch>
			</Router>
		);
	}
}

export { App };
