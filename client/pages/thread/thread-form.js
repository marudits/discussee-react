import React, { Component } from 'react';

//assets
import { CONFIG } from '../../assets/config';
import { LABEL } from '../../assets/label';

//library
import { Button, Form, Input } from 'antd';
const { TextArea } = Input

//style
import './thread-form.styl';

//utils
import { addThread, getThread, updateThread } from '../../utils/api/firebase';
import { toCamelCase } from '../../utils/helpers/stringManipulation';

class ThreadForm extends Component {
	constructor(props){
		super(props);

		this.state = {
			form: {
				title: null,
				desc: null
			},
			mode: 'ADD',
			validation: {
				title: {
					error: null,
					message: null
				},
				desc: {
					error: null,
					message: null
				}
			}
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
		if(this.validateForm()){
			let { title, desc } = this.state.form;
			switch(this.state.mode){
				case 'ADD':
					addThread(title, desc).then(() => {
						this.resetForm();
						this.props.router.push('/')		
					});
					break;
				case 'UPDATE':
					let threadId = this.props.params.id;
					updateThread(this.props.params.id, {title: title, desc: desc})
						.then(() => {
							this.resetForm();
							this.props.router.push('/detail/' + threadId);
							window.alert('Success update thread');
						})
				default:
					break;
			}
		}
	}

	resetForm(){
		let newForm = this.state.form;
		for(let key in newForm){
			newForm[key] = null;
		}
		this.setState({form: newForm});
	}

	resetValidation(){
		let newValidation = this.state.validation;
		for(let key in newValidation){
			newValidation[key].error = null;
			newValidation[key].message = null;
		}
		this.setState({validation: newValidation});
	}

	validateForm(){
		this.resetValidation();

		let { title, desc } = this.state.form;

		//validate title
		if(!title || title.trim().length <= 0){
			let newValidation = this.state.validation
			newValidation.title.error = true;
			newValidation.title.message = LABEL.VALIDATION.COMMON.MESSAGE.REQUIRED;
			this.setState({validation: newValidation})
			return false;
		} else {
			let newValidation = this.state.validation
			newValidation.title.error = null;
			newValidation.title.message = null;
			this.setState({validation: newValidation})
		}

		//validate desc
		if(!desc || desc.trim().length <= 0){
			let newValidation = this.state.validation
			newValidation.desc.error = true;
			newValidation.desc.message = LABEL.VALIDATION.COMMON.MESSAGE.NOT_EMPTY;
			this.setState({validation: newValidation})
			return false;
		} else if(desc.trim().length < CONFIG.VALIDATION.THREAD.DESC.MIN_LENGTH){
			let newValidation = this.state.validation
			let diff = CONFIG.VALIDATION.THREAD.DESC.MIN_LENGTH - desc.trim().length;
			newValidation.desc.error = true;
			newValidation.desc.message = `${LABEL.VALIDATION.THREAD.DESC.MIN_LENGTH}. ${diff} characters remain.`;
			this.setState({validation: newValidation})
			return false;
		} else {
			let newValidation = this.state.validation
			newValidation.desc.error = null;
			newValidation.desc.message = null;
			this.setState({validation: newValidation})
		}

		return true;
	}

	render(){
		let { validation, form, mode } = this.state;
		return(
			<section className="thread-form">
				<header>
					<h2>{toCamelCase(mode)} Thread</h2>
				</header>
				<content>
					<Form onSubmit={(e) => this.handleSubmit(e)} layout="horizontal" className="form">
						<Form.Item label="Title" className="form-item">
							<Input type="text" onChange={(e) => this.handleChange(e, 'title')} value={form.title}/>
							{
								validation.title.error ?
									<div className="message-error">{ validation.title.message }</div>
									:
									null
							}
						</Form.Item>
						<Form.Item label="Description" className="form-item">
							<TextArea rows={6} onChange={(e) => this.handleChange(e, 'desc')} value={form.desc}/>
							{
								validation.desc.error ?
									<div className="message-error">{ validation.desc.message }</div>
									:
									null
							}
						</Form.Item>
						<Button type="primary" htmltype="submit" onClick={(e) => this.handleSubmit(e)} className={`btn-${mode.toLowerCase()}`}>
							{mode === 'ADD' ? 'Create' : 'Update'}
						</Button>
					</Form>
				</content>
				<footer></footer>
			</section>
			);
	}
}

export default ThreadForm;