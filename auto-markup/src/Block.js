import React, { Component } from 'react';
import './Block.scss';
import { observer } from 'mobx-react';

class Block extends Component {
	render() {
		const { className } = this.props;
		return (
			<div className={`Block ${className}`}>{this.props.children}</div>
		);
	}
}

export default observer(Block);
