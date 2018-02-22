import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//actions
import * as threadActions from '../../actions/thread';

//components
import ThreadItem from '../../components/thread/thread-item';

//library
import { Tag, Row, Col, Icon } from 'antd';

//style
import './thread-list.styl'

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
		let data = this.list ? objectListToArray(this.list) : [],
			comment = this.comment ? objectListToArray(this.comment) : [];

		let countThread = {
			all: data.length,
			opened: data.filter(x => !x.isDone).length,
			closed: data.filter(x => x.isDone).length
		}

		return(
			<section className="thread-list">
				<header className="thread-list__header">
					<h2>
						Thread List
						<a href="#" onClick={() => (this.props.router.push('/add'))}>
							<Icon type="plus-circle"/>
						</a>
						<div>
							<Tag>{ countThread.all }&nbsp;All</Tag>
							<Tag color="green">{ countThread.opened }&nbsp;Opened</Tag>
							<Tag color="red">{ countThread.closed }&nbsp;Closed</Tag>
						</div>
					</h2>
					
				</header>
				<content className="thread-list__content">
					<Row gutter={16} className="content-container">
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
										router={this.props.router}
									/>
								</Col>
								)
						})
					}
					</Row>
				</content>
				<footer className="thread-list__footer"></footer>
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