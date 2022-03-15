import { connect } from 'react-redux';

import { AboutUsView } from '../components';
import * as Actions from '../actions';

const mapDispatchToProps = dispatch => ({
    navigateTo: (route, screen) => dispatch(Actions.navigateTo(route, screen))
});

export default connect(null, mapDispatchToProps)(AboutUsView);