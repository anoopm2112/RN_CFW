import flow from 'lodash/fp/flow';
import { STATE_REDUCER_KEY } from './constants';

export const getComplaints = state => state[STATE_REDUCER_KEY];

const complaintImage = complaints => complaints.complaintImage;
export const getComplaintImage = flow(getComplaints, complaintImage);

const complaintLocation = complaints => complaints.complaintLocation;
export const getComplaintLocation = flow(getComplaints, complaintLocation);

const complaintListData = complaints => complaints.complaintListData;
export const getComplaintListData = flow(getComplaints, complaintListData);

