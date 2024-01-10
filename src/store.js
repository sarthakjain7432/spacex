import { createStore } from 'redux';

const initialState = {
  launches: [],
  allLaunches: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LAUNCHES':
      return {
        ...state,
        launches: action.payload,
      };
    case 'SET_ALL_LAUNCHES':
      return {
        ...state,
        allLaunches: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);
export default store;
