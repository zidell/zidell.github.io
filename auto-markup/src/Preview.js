import React, { Component } from 'react';
import './Preview.scss';
import Block from './Block';
import { observer } from 'mobx-react';
import autoBind from 'auto-bind';

class Preview extends Component {
	state = {
		isLoading: false,
		html: '',
	};

	constructor(props) {
		super(props);
		autoBind(this);

		this.timeout = null;
	}

	delayPreview(html) {
		this.setState({
			isLoading: true,
		});
		if (this.timeout !== null) {
			clearTimeout(this.timeout);
		}
		this.timeout = setTimeout(() => {
			this.setState({
				isLoading: false,
				html,
			});
			this.timeout = null;
		}, 1400);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.html !== this.state.html) {
			this.delayPreview(nextProps.html);
		}
	}

	render() {
		const { isLoading, html } = this.state;
		return (
			<Block className="Preview">
				<div>
					<div className={isLoading ? 'now-loading' : ''} />
					<iframe
						ref={r => {
							this.iframe = r;
						}}
						title="preview"
						src={`data:text/html;charset=utf-8,${encodeURI(html)}`}
					/>
				</div>
			</Block>
		);
	}
}

export default observer(Preview);
