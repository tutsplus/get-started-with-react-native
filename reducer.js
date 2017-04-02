const initialState = {
  distance: 0,
  speed: 0,
  heading: ''
};

export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case 'INCREMENT_DISTANCE':
      return {
        ...state,
        distance: state.distance + action.distance
      };
    case 'SET_SPEED':
      return {
        ...state,
        speed: action.speed
      };
    case 'SET_BEARING':
      let x = action.heading;
      let bearing = '';
      if ((x > 0 && x <= 23) || (x > 338 && x <= 360))
        bearing = 'N';
      else if (x > 23 && x <= 65)
        bearing = 'NE';
      else if (x > 65 && x <= 110)
        bearing = 'E';
      else if (x > 110 && x <= 155)
        bearing = 'SE';
      else if (x > 155 && x <= 203)
        bearing = 'S';
      else if (x > 203 && x <= 248)
        bearing = 'SW';
      else if (x > 248 && x <= 293)
        bearing = 'W';
      else if (x > 293 && x <= 338)
        bearing = 'NW';

      return {
        ...state,
        bearing
      };

    default:
      return state;
  }
}
