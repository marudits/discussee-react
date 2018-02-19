import React, { Component } from 'react';
import { Link } from 'react-router'

//component
import { Layout, Menu } from 'antd';
const { Header } = Layout;

//style
import './style.styl';

class NavHeader extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<Header className="header">
				<Link to="/" >
					<div className="logo" />
					<h3>React - AntDesign</h3>
				</Link>
			</Header>
			);
	}
}

export default NavHeader;