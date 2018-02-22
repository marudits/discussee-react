import React, { Component } from 'react';

//library
import { Form, Icon, Input, Button } from 'antd';

//style
import './auth.styl'

//utils
import { signIn } from '../../utils/api/firebase';

class Auth extends Component {
	constructor(props){
		super(props);

		this.state = {
			mode: 'SIGN_IN',
			form: {
				email: null,
				password: null
			},
			validation: {
				submit: {
					error: null,
					message: null
				}
			}
		}
	}

	handleSubmit(e){
		this.resetValidation();
		e.preventDefault();
		let { email, password } = this.state.form;
		signIn(email, password)
			.then(res => {
				this.props.userActions.setUserData(res.data);
				this.props.router.push('/');
			})
			.catch(err => {
				let newValidation = this.state.validation;
				newValidation.submit.error = true;
				newValidation.submit.message = err.message || err.data.message;
				this.setState({validation: newValidation})
			})
	}

	handleChange(e, field){
		let newForm = this.state.form;
		newForm[field] = e.target.value;
		this.setState({form: newForm})
	}

	resetValidation(){
		let newValidation = this.state.validation;
		for(let key in newValidation){
			newValidation[key].error = null
			newValidation[key].message = null
		}
		this.setState({validation: newValidation});
	}

	toggleMode(){
		this.setState({mode: this.state.mode === 'SIGN_IN' ? 'SIGN_UP' : 'SIGN_IN'})
	}

	render(){
		let { email, password } = this.state.form;
		return(
			<section className="auth">
				<header className="auth-header">
					<h2>Welcome</h2>
					<p>
						{
							this.state.mode === 'SIGN_IN' ?
								'Create account and enjoy the app'
								:
								'Please sign in to continue'
						}
					</p>
				</header>
				<content className="auth-content">
					<Form onSubmit={(e) => this.handleSubmit(e)} className="auth-content__form">
						<Form.Item>
							<Input 
								prefix={<Icon type="mail"/>}
								placeholder="Email"
								type="email"
								value={email}
								onChange={(e) => this.handleChange(e, 'email')}
								required
								/>
						</Form.Item>
						<Form.Item>
							<Input 
								prefix={<Icon type="lock"/>}
								placeholder="Password"
								type="password"
								value={password}
								onChange={(e) => this.handleChange(e, 'password')}
								required
								/>
						</Form.Item>
						<Button type="primary" htmlType="submit">Sign In</Button>
						{
							this.state.validation.submit.error ?
								<div className="message-error">{this.state.validation.submit.message}</div>
								:
								null
						}
					</Form>
				</content>
				<footer className="auth-footer">
					{
						this.state.mode === 'SIGN_IN' ? 
							<p>Don't have account? <span className="auth-footer__mode" onClick={() => this.toggleMode()}>Sign Up</span> now</p>
							:
							<p>Already have account? <span className="auth-footer__mode" onClick={() => this.toggleMode()}>Sign In now</span></p>
					}
				</footer>
			</section>
			);
	}
}

export default Auth;