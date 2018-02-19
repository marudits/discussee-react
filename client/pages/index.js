import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

//actions
import * as threadActions from '../actions/thread';
import * as commentActions from '../actions/comment';

import Main from './app/main';

function mapStateToProps(state){
	return {
		thread: state.thread,
		comment: state.comment
	}
}

function mapDispatchToProps(dispatch){
	return {
		threadActions: bindActionCreators(threadActions, dispatch),
		commentActions: bindActionCreators(commentActions, dispatch)
	}
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;