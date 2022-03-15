import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constants';

export const getServices = state => state[STATE_REDUCER_KEY];

const allServices = services => services.allServices;
export const getAllServices = flow(getServices, allServices);

const myServices = services => services.myServices;
export const getMyServices = flow(getServices, myServices);
