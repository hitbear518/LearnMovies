import {
  REQUEST_MOVIES,
  RECEIVE_MOVIES_SUCCESS,
  RECEIVE_MOVIES_FAILURE,
} from '../actions/movies';

export default function movies(state = {
  isFetching: false,
  items: [],
}, action) {
  switch (action.type) {
    case REQUEST_MOVIES:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_MOVIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.items,
      };
    case RECEIVE_MOVIES_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}
