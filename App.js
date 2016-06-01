import React, {
  Component,
  PropTypes,
} from 'react';
import {
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchMovies } from './actions/movies';

class App extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    movies: PropTypes.array.isRequired,
    fetchMovies: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
  }

  componentDidMount() {
    this.props.fetchMovies();
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: movie.posters.thumbnail }}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }

  render() {
    const { isFetching, movies } = this.props;
    if (isFetching) {
      return this.renderLoadingView();
    }

    this.dataSource = this.dataSource.cloneWithRows(movies);
    return (
      <ListView
        dataSource={this.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
        enableEmptySections
      />
    );
  }
}

const mapStateToProps = state => ({
  isFetching: state.movies.isFetching,
  movies: state.movies.items,
});

const mapDispatchToProps = {
  fetchMovies,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});
