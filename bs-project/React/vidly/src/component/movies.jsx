import React, { Component } from 'react';
import _ from 'lodash';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate';
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';

class Movies extends Component {

    state = {
        movies: [],
        genres: [],
        currentPage: 1,
        pageSize: 4,
        sortColumn: { path: 'title', order: 'asc'}
    }

    componentDidMount() {
        const genres = [{ _id: "", name: "All Genres"}, ...getGenres()];
        this.setState({ movies: getMovies(), genres });
    }

    handleGenreSelect = genre => {
        this.setState({ selectedGenre : genre, currentPage: 1});
    }

    handleDelete = movie => {
        const movies = this.state.movies.filter( m => m._id !== movie._id);
        this.setState({movies});
    }

    handleLike = movie => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    }

    handlePageChange = page => {
        this.setState({ currentPage : page });
    }

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    }

    getPageDate = () => {
        const { pageSize, currentPage, selectedGenre, movies: allMovies, sortColumn  } = this.state;
        const filtered = selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id) 
        : allMovies;
        const sorted = _.orderBy(filtered, [sortColumn.path],[sortColumn.order]);
        const movies = paginate(sorted,currentPage, pageSize);
        return { totalCount: filtered.length, data: movies};
    }

    render() { 
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, sortColumn  } = this.state;
        if(count === 0) return <p>There are no movies.</p>
        const { totalCount, data: movies } = this.getPageDate();
        return ( 
            <React.Fragment>
                <div className="row">
                    <div className="col-3">
                        <ListGroup 
                            items={this.state.genres}
                            selectedItem={this.state.selectedGenre}
                            onItemSelect={this.handleGenreSelect}
                        />
                    </div>
                    <div className="col">
                        <p>Showing {totalCount} movies in database.</p>
                        <MoviesTable
                            movies={movies} 
                            sortColumn ={sortColumn}
                            onLike={this.handleLike} 
                            onDelete={this.handleDelete}
                            onSort={this.handleSort}
                        />
                        <Pagination 
                            itemsCount={totalCount} 
                            pageSize={pageSize} 
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                        />
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Movies;