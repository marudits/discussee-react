import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//actions
import * as threadActions from '../../actions/thread';

//components
import ThreadItem from '../../components/thread/thread-item';

//library
import { Row, Col } from 'antd';

//utils
import { objectListToArray } from '../../utils/helpers/stringManipulation';

class ThreadList extends Component {
	constructor(props){
		super(props);

		this.list = null;
		this.comment = null
	}

	componentWillMount(){
		//get thread list
		this.props.threadActions.getThreadList();
		this.list = this.props.thread.list;

		//get comment
		this.props.commentActions.getCommentList();
	}

	componentWillReceiveProps(nextProps){
		if(this.list !== nextProps.thread.list){
			this.list = nextProps.thread.list;
		}

		if(this.comment !== nextProps.comment.list){
			this.comment = nextProps.comment.list;
		}
	}

	render(){
		const data = this.list ? objectListToArray(this.list) : [],
			comment = this.comment ? objectListToArray(this.comment) : [];

		return(
			<section>
				<header>
					<h2>Pages: Thread List</h2>
				</header>
				<content>
					<Row gutter={16}>
					{
						data.map((item, index) => {
							return(
								<Col 
									lg={{span: 8}} md={{span: 12}} s={{span: 24}} xs={{span: 24}}
									key={index}>
									<ThreadItem 
										thread={item}
										threadActions={this.props.threadActions}
										comment={comment.filter(x => x.key === item.key)}
									/>
								</Col>
								)
						})
					}
					</Row>
				</content>
				<footer></footer>
			</section>
			);
	}
}

function mapStateToProps(state) {
	return {
		thread: state.thread,
		comment: state.comment
	}
}

function mapDispatchToProps(dispatch){
	return {
		threadActions: bindActionCreators(threadActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ThreadList)