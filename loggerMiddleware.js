const logger = middlewareAPI => next => action => {
  console.group(action.type);
  console.info('dispatching', action);
  const result = next(action);
  console.log('next state', middlewareAPI.getState());
  console.groupEnd(action.type);
  return result;
};

export default logger;
