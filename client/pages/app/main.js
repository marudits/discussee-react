import React, { Component } from 'react';
import { Link } from 'react-router';

//component
import { Layout } from 'antd';
import NavHeader from '../../components/navigation/header';
import NavFooter from '../../components/navigation/footer';

//utils
import { getCurrentUsername, getCurrentUser } from '../../utils/api/firebase'

const { Content } = Layout;

class Main extends Component {
	constructor(props){
		super(props);
	}

	componentWillReceiveProps(){
		const CURRENT_USER = getCurrentUsername();
		if(!this.props.user.data){
				getCurrentUser()
				.then(res => {
					if(res){
						this.props.userActions.setUserData(res)
					}
					
				})
		}

		if(this.props.location.pathname !== '/auth' && !CURRENT_USER){
			this.props.router.push('/auth')
		}
	}
	render(){
		return(
			<Layout className="layout">
				<NavHeader />
				<Content style={{ padding: '0px 50px 3em 50px', margin: '5em 0 2em 0' }}>
					{
						React.cloneElement(this.props.children, this.props)
					}
				</Content>
				<NavFooter />
			</Layout>
			);
	}
}

export default Main;