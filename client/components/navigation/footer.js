import React, { Component } from 'react';

//component
import { Layout } from 'antd';

const { Footer } = Layout;

class NavFooter extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
			<Footer
				className="footer"
			>
				<p>Copyright © 2018 by marudits</p>
			</Footer>
			);
	}
}

export default NavFooter;