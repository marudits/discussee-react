import React, { Component } from 'react';

//library
import { Button, Form, Input } from 'antd';
const { TextArea } = Input

//style
import './thread-form.styl';

//utils
import { addThread, getThread, updateThread } from '../../utils/api/firebase';

class ThreadForm extends Component {
	constructor(props){
		super(props);

		this.state = {
			form: {
				title: null,
				desc: null
			},
			mode: 'ADD'
		}
	}

	componentWillMount(){
		if(this.props.location.pathname.match(/^\/update\/-.*/)){
			this.setState({mode: 'UPDATE'});
			getThread(this.props.params.id)
				.then(res => {
					this.setState({form: res})
				});
		} else {
			this.setState({mode: 'ADD'})
		}
	}

	handleChange(e, field){
		let newForm = this.state.form;
		newForm[field] = e.target.value;
		this.setState({form: newForm})
	}

	handleSubmit(e){
		e.preventDefault();
		let { title, desc } = this.state.form;
		switch(this.state.mode){
			case 'ADD':
				addThread(title, desc).then(() => {
					this.props.router.push('/')		
				});
				break;
			case 'UPDATE':
				let threadId = this.props.params.id;
				updateThread(this.props.params.id, {title: title, desc: desc})
					.then(() => {
						this.props.router.push('/detail/' + threadId);
						window.alert('Success update thread');
					})
			default:
				break;
		}
	}

	render(){
		return(
			<section className="thread-form">
				<header>
					<h2>Pages: Thread Form {this.state.mode}</h2>
				</header>
				<content>
					<Form onSubmit={(e) => this.handleSubmit(e)} layout="horizontal" className="form">
						<Form.Item label="Title" className="form-item">
							<Input type="text" onChange={(e) => this.handleChange(e, 'title')} value={this.state.form.title}/>
						</Form.Item>
						<Form.Item label="Description" className="form-item">
							<TextArea rows={6} onChange={(e) => this.handleChange(e, 'desc')} value={this.state.form.desc}/>
						</Form.Item>
						{
							this.state.mode === 'ADD' ?
								<Button type="primary" htmltype="submit" onClick={(e) => this.handleSubmit(e)}>
									Create
								</Button>
								:
								<Button type="primary" htmltype="submit" onClick={(e) => this.handleSubmit(e)}>
									Update
								</Button>
						}
						
					</Form>
				</content>
				<footer></footer>
			</section>
			);
	}
}

export default ThreadForm;