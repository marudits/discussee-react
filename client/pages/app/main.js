import React, { Component } from 'react';
import { Link } from 'react-router';

//component
import { Layout } from 'antd';
import NavHeader from '../../components/navigation/header';
import NavFooter from '../../components/navigation/footer';

const { Content } = Layout;

class Main extends Component {
	render(){
		return(
			<Layout className="layout">
				<NavHeader />
				<Content style={{ padding: '0 50px' }}>
					<h1>Hello World</h1>
				</Content>
				<NavFooter />
			</Layout>
			);
	}
}

export default Main;