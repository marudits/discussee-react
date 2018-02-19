import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Main from './app/main';

function mapStateToProps(state){
	return {
	}
}

function mapDispatchToProps(dispatch){
	return {
	}
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;