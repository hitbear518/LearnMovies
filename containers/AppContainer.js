import { connect } from 'react-redux';
import App from '../components/App';
import { fetchMovies } from '../actions/movies';

const mapStateToProps = state => ({
  isFetching: state.movies.isFetching,
  movies: state.movies.items,
});

const mapDispatchToProps = {
  fetchMovies,
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
