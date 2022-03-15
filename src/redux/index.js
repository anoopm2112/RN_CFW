import { createStore, applyMiddleware, compose } from 'redux';
import { not, contains } from 'ramda';
import { createLogger } from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga';
import rootSaga from './rootSaga';
import rootReducer from './rootReducer';
import Reactotron from '../../ReactotronConfig';

const USE_LOGGING = false;

const SAGA_LOGGING_BLACKLIST = ['EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED'];

const logger = createLogger({
    predicate: (getState, { type }) => USE_LOGGING && not(contains(type, SAGA_LOGGING_BLACKLIST))
});

export default () => {
    const sagaMiddleware = createSagaMiddleware({
        sagaMonitor: Reactotron.createSagaMonitor()
    });
    const middleware = applyMiddleware(logger, sagaMiddleware);
    const store = createStore(rootReducer, compose(middleware, Reactotron.createEnhancer()));
    store.close = () => store.dispatch(END);
    sagaMiddleware.run(rootSaga);
    return store;
};
