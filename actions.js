export function incrementDistance(distance) {
  return {
    type: 'INCREMENT_DISTANCE',
    distance
  };
}

export function setSpeed(speed) {
  return {
    type: 'SET_SPEED',
    speed
  };
}

export function setBearing(heading) {
  return {
    type: 'SET_BEARING',
    heading
  };
}
