import React, { Component } from 'react';

//library
import { Form, Button, Icon, Input, List, Avatar } from 'antd';

//style
import './thread-detail.styl'

//utils
import { calculateDiffTime, objectListToArray } from '../../utils/helpers/stringManipulation';
import { addComment, getComments, getCurrentUsername, getThread, isFinishedTypingComment, isTypingComment } from '../../utils/api/firebase';

class ThreadDetail extends Component {
	constructor(props){
		super(props);

		this.item = {
			title: null,
			desc: null,
			createdAt: null,
			createdBy: null,
			updatedAt: null
		};
		this.comment = [];

		this.state = {
			thread: {
				title: null,
				desc: null,
				createdAt: null,
				createdBy: null,
				updatedAt: null
			},
			comment: [],
			form: {
				text: null,
				account: null
			},
			isTypingTimer: null
		}
	}

	componentWillMount(){
		//get thread
		getThread(this.props.params.id)
			.then(res => {
				this.item = res;
				this.setState({thread: res})
			})

		//get comments
		this.props.commentActions.getCommentList(this.props.params.id);

		//get isTyping
		this.props.commentActions.getIsTyping(this.props.params.id);

	}

	componentWillReceiveProps(nextProps){
		if(nextProps.comment.list && this.state.comment !== objectListToArray(nextProps.comment.list)){
			this.setState({comment: objectListToArray(nextProps.comment.list)});
			this.scrollComments()
		}
	}

	addComment(){
		addComment(this.props.params.id, this.state.form.text);
		this.resetForm();
		this.scrollComments();
	}

	formatIsTypingInfo(){
		const THREAD_ID = this.props.params.id;
		if(this.props.comment.isTyping && this.props.comment.isTyping[THREAD_ID].length > 0){
			let commentList = this.props.comment.isTyping[THREAD_ID];
			let isCurrentUserTyping = commentList.filter(x => (x.key === getCurrentUsername())).length === 1,
				otherUserTyping = commentList.filter(x => (x.key !== getCurrentUsername())),
				totalIsTyping = commentList.length;

			if(commentList.length === 1){
				return `${isCurrentUserTyping ? 'You are' : commentList[0].key + ' is'} typing...`
			} else {
				if(isCurrentUserTyping){
					return `You and ${otherUserTyping.length > 1 ? otherUserTyping.length + ' people' : otherUserTyping[0].key} are typing...`
				} else {
					return `${otherUserTyping[0].key} and ${otherUserTyping.length > 2 ? otherUserTyping.length + ' people' : otherUserTyping[1].key} are typing...`
				}
			}
		} else {
			return null
		}
		
	}

	handleChange(e, field){
		let newForm = this.state.form;
		newForm[field] = e.target.value;
		this.setState({form: newForm})

		if(e.target.value){
			this.resetIsTypingTimer(this.props.params.id);

			isTypingComment(this.props.params.id, e.target.value)
		}
	}

	resetForm(){
		let newForm = this.state.form;
		for(let key in newForm){
			newForm[key] = null
		}
		this.setState({form: newForm});
	}

	resetIsTypingTimer(id){
		if(this.state.isTypingTimer){
			clearTimeout(this.state.isTypingTimer);
			this.setState({isTypingTimer: null})
		}

		let that = this;
		this.setState({isTypingTimer: setTimeout(function(){
			that.stoppedTyping(id)
		}, 5000)})
	}

	scrollComments(){
		let commentList = document.getElementById('comments-list')
		commentList.scrollTop = commentList.scrollHeight;
	}

	stoppedTyping(id){
		console.log('stoppedTyping');
		if(this.state.isTypingTimer){
			this.setState({isTypingTimer: null})
			isFinishedTypingComment(id);
		}
	}

	render(){
		let { title, desc, createdAt, createdBy, updatedAt } = this.state.thread;
		const { TextArea }  = Input;

		return(
			<section className="thread-detail">
				<header className="thread-detail__header">
					<h2>Pages: Thread Detail</h2>
				</header>
				<content className="thread-detail__content">
					<header>
						<div>
							<p className="meta-info">
								Created by <span className="meta-info__user">{ createdBy }</span> at <span className="meta-date">{ calculateDiffTime(createdAt) }</span>
							</p>
							<p className="meta-info">
								Updated at <span className="meta-info__date">{ calculateDiffTime(createdAt) }</span>
							</p>
						</div>
						<h3>{title}</h3>
					</header>
					<content>
						<p>
							{desc}
						</p>
					</content>
					<footer className="thread-detail__comment">
						<div className="detail-comment">
							<h3>{objectListToArray(this.state.comment).length} Comments</h3>
							<div className="detail-comment__list" id="comments-list">
								<List
									itemLayout="horizontal"
									dataSource={objectListToArray(this.state.comment)}
									renderItem={ item => (
										<List.Item className={`comment-item`} id={`comment-item-${item.key}`}>
											<List.Item.Meta
												avatar={<Icon type="user" className="comment-item__icon"/>}
												title={
													<div>
														<a href="#" className="comment-item__title">{item.name}</a>
														<span className="comment-item__date">{calculateDiffTime(item.timestamp)}</span>
													</div>
												}
												description={
													<div className="comment-item__desc">
														<p className="desc-text">{item.text}</p>
													</div>
												}
									        />
									    </List.Item>
									)}
								/>

								<div>
									{
										this.formatIsTypingInfo()

									}
								</div>
							</div>
							<div className="detail-comment__form">
								<Form onSubmit={() => this.addComment()}>
									<Form.Item>
										<TextArea rows={4} onChange={(e) => this.handleChange(e, 'text')} value={this.state.form.text} onBlur={() => this.stoppedTyping(this.props.params.id)}/>
									</Form.Item>
									<Button type="primary" htmltype="submit" icon="message" onClick={() => this.addComment()}>Comment</Button>
								</Form>
							</div>
						</div>
					</footer>
				</content>
				<footer></footer>
			</section>
			);
	}
}

export default ThreadDetail;