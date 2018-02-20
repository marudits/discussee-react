import React, { Component } from 'react';

//library
import { Icon, List, Avatar } from 'antd';

//style
import './thread-detail.styl'

//utils
import { calculateDiffTime, objectListToArray } from '../../utils/helpers/stringManipulation';
import { getComments, getThread } from '../../utils/api/firebase';

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
			comment: []
		}
	}

	componentWillMount(){
		// this.item = this.props.thread.list[this.props.params.id];
		// this.comment = this.props.comment.list[this.props.params.id];
		// console.log('comment: ', this.props.comment.list, '| item: ', this.comment);
		
		//get thread
		getThread(this.props.params.id)
			.then(res => {
				this.item = res;
				this.setState({thread: res})
			})

		//get comment
		getComments(this.props.params.id)
			.then(res => {
				this.comment = res;
				this.setState({comment: res})
			})
	}

	componentWillReceiveProps(nextProps){
		// if(this.item !== nextProps.thread.list[this.props.params.id]){
		// 	this.item = nextProps.thread.list[this.props.params.id]
		// }

		// if(this.comment !== nextProps.comment.list[this.props.params.id]){
		// 	this.comment = nextProps.comment.list[this.props.params.id]
		// }
	}

	render(){
		let { title, desc, createdAt, createdBy, updatedAt } = this.state.thread;

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
							<div className="detail-comment__list">
								<List
									itemLayout="horizontal"
									dataSource={objectListToArray(this.state.comment)}
									renderItem={ item => (
										<List.Item className={`comment-item`}>
											<List.Item.Meta
												avatar={<Icon type="user" className="comment-item__icon"/>}
												title={<a href="#" className="comment-item__title">{item.name}</a>}
												description={
													<div className="comment-item__desc">
														<p className="desc-text">{item.text}</p>
														<p className="desc-createdat">{calculateDiffTime(item.timestamp)}</p>
													</div>
												}
									        />
									    </List.Item>
									)}
								/>
							</div>
							<div className="detail-comment__form">
								
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