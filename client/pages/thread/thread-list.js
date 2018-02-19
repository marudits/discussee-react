import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//actions
import * as threadActions from '../../actions/thread';

//utils
import { objectListToArray } from '../../utils/helpers/stringManipulation';

class ThreadList extends Component {
	constructor(props){
		super(props);

		this.list = null;
	}

	componentWillMount(){
		this.props.threadActions.getThreadList();
		this.list = this.props.thread.list;
	}

	componentWillReceiveProps(nextProps){
		if(this.list !== nextProps.thread.list){
			this.list = nextProps.thread.list;
			console.log(this.list);
		}
	}

	render(){
		const data = this.list ? objectListToArray(this.list) : []
		return(
			<section>
				<header>
					<h3>Pages: Thread List</h3>
				</header>
				<content>
					{
						data.map((item, index) => {
							return(
								<div key={index}>
									<h4>{ item.title }</h4>
									<p>{ item.desc }</p>
								</div>
								)
						})
					}
				</content>
				<footer></footer>
			</section>
			);
	}
}

function mapStateToProps(state) {
	return {
		thread: state.thread
	}
}

function mapDispatchToProps(dispatch){
	return {
		threadActions: bindActionCreators(threadActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreadList)