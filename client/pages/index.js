import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//actions
import * as commentActions from '../actions/comment';
import * as threadActions from '../actions/thread';
import * as userActions from '../actions/user';

import Main from './app/main';

function mapStateToProps(state){
	return {
		thread: state.thread,
		comment: state.comment,
		user: state.user
	}
}

function mapDispatchToProps(dispatch){
	return {
		commentActions: bindActionCreators(commentActions, dispatch),
		threadActions: bindActionCreators(threadActions, dispatch),
		userActions: bindActionCreators(userActions, dispatch)
	}
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;