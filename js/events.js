// Using Object.freeze makes it behave like a true Enum (immutable)
export const Events = Object.freeze({
  SET_COUNT_CHANGED: 'setCountChanged',
  ADD_SETS: 'addSets',
  ADD_WEIGHT: 'addWeight',
  FINISH_EXERCISE: 'finishExercise',
  START_EXERCISE: 'startExercise',
});
