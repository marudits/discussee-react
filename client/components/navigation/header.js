import React, { Component } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

//actions
import * as userActions from '../../actions/user';

//component
import { Avatar, Badge, Dropdown, Icon, Layout, Menu } from 'antd';
const { Header } = Layout;

//style
import './style.styl';

//utils
import { signOut } from '../../utils/api/firebase';

class NavHeader extends Component {
	constructor(props){
		super(props);
	}

	handleSignOut(){
		signOut().then(res => {
			this.props.userActions.clearUserData();
			browserHistory.push('/auth');
		})
	}

	render(){
		return(
			<Header className="header">
				<Link to="/">
					<div className="header-logo" />
					<h3>React - AntDesign</h3>
					{
						(() => {
							if(this.props.user.data){
								return (
									<span className="header-user">
										<Dropdown 
											overlay={
												<Menu>
										    		<Menu.Item>
										      			<a href="#" onClick={() => this.handleSignOut()}>Sign Out</a>
										    		</Menu.Item>
									  			</Menu>
											} 
											placement="bottomRight" 
											trigger={['click']}>
											<span>
												<Badge dot>
													<Avatar shape="square" icon="user" />
												</Badge>
												<span className="header-user__username">{this.props.user.data.username}</span>
												<Icon type="caret-down" className="header-user__caret"/>
											</span>
										</Dropdown>
									</span>
									);
							}
						})()
					}
					
				</Link>
			</Header>
			);
	}
}

function mapStateToProps(state){
	return {
		user: state.user
	}
}

function mapDispatchToProps(dispatch){
	return {
		userActions: bindActionCreators(userActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavHeader)