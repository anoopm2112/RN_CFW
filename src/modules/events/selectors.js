import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constants';

export const getEvents = state => state[STATE_REDUCER_KEY];

const upcomingEvents = events => events.upcomingEvents;
export const getAllUpcomingEvents = flow(getEvents, upcomingEvents);

const myEvents = events => events.myEvents;
export const getMyEvents = flow(getEvents, myEvents);
