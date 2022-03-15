import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constants';

export const getContent = state => state[STATE_REDUCER_KEY];

const contentList = content => content.contentList;
export const getContentList = flow(getContent, contentList);
