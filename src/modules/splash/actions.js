import { actions } from '../../common';

const { action } = actions;

export const types = {
    INITIALIZE: 'Splash/INITIALIZE',
};

export function initialize() {
    return action(types.INITIALIZE);
}
