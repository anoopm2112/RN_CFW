import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constants';

export const getNews = state => state[STATE_REDUCER_KEY];

const newsList = news => news.newsList;
export const getNewsList = flow(getNews, newsList);
