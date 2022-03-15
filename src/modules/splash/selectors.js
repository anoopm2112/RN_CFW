import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constants';

export const getSplash = state => state[STATE_REDUCER_KEY];
