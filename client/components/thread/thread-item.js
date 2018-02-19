import React, { Component } from 'react';

//library
import { Button, Card, Icon, Switch } from 'antd';

//style
import './thread-item.styl'

//utils
import { getComments } from '../../utils/api/firebase';
import { calculateDiffTime } from '../../utils/helpers/stringManipulation';

class ThreadItem extends Component {
	constructor(props){
		super(props);

		this.thread = this.props.thread;
		this.comment = {
			list: [],
			count: 0
		};
		this.state = {
			comments: 0
		};
	}

	componentWillMount(){
	}

	componentWillReceiveProps(nextProps){
		if(this.thread !== nextProps.thread){
			this.thread = nextProps.thread
		}

		if(nextProps.comment.length > 0 && this.comment.list !== nextProps.comment){
			this.comment = {
				list: nextProps.comment,
				count: Object.keys(nextProps.comment[0]).length - 1
			};
		}
	}

	toggleStatus(){
		this.props.threadActions.setThreadStatus(this.thread.key, !this.thread.isDone);
	}

	getThreadActions(){
		return [
			<span onClick={() => this.handleThreadActions('COMMENT')}>
				<Icon type="message" />
				&nbsp;{this.comment.count}
			</span>,
			<Icon type="edit" onClick={() => this.handleThreadActions('EDIT')} />,
			<Icon type="delete" onClick={() => this.handleThreadActions('DELETE')} />
		]
	}

	handleThreadActions(type){
		switch(type){
			case 'COMMENT':
				this.props.router.push('/detail/' + this.thread.key)
				break;
			case 'EDIT':
				this.props.router.push('/update/' + this.thread.key)
				break;
			case 'DELETE':
				break;
		}
	}

	render(){
		let { title, desc, isDone, createdBy, createdAt, key } = this.thread;

		return(
			<Card 
				title={
					<div className="thread-item__header">
						<a href={`/detail/${key}`}>{title}</a>
						<span className="header-status">
							<Switch 
								checked={!isDone} 
								checkedChildren={<Icon type="unlock"/>}
								unCheckedChildren={<Icon type="lock"/>}
								onChange={() => this.toggleStatus()}/> 
								<span className={`header-status__text text-${isDone ? 'red' : 'green'}`}>{isDone ? 'Closed' : 'Opened'}</span>
						</span>
					</div>
				}
				className="thread-item"
				actions={this.getThreadActions()}
				>
				<content>
					<p className="thread-item__desc">
						{
							desc
						}
					</p>
					<p className="thread-item__meta">
						Created by <span className="meta-user">{ createdBy }</span> at <span className="meta-date">{ calculateDiffTime(createdAt) }</span>
					</p>
				</content>
			</Card>
			);
	}
}

export default ThreadItem;