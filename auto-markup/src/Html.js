import React, { Component } from 'react';
import './Html.scss';
import Block from './Block';
import $ from 'jquery';
import autoBind from 'auto-bind';
import { observer } from 'mobx-react';
import { saveAs } from 'file-saver';

class Html extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
	}

	download() {
		var blob = new Blob([this.props.html], {
			type: 'text/plain;charset=utf-8',
		});
		saveAs(blob, 'index.html');
	}

	selectAll() {
		$(this.textarea).select();
	}

	render() {
		const { selectAll, download } = this;
		const { html } = this.props;
		return (
			<Block className="Html">
				<textarea
					ref={r => {
						this.textarea = r;
					}}
					value={html}
					readOnly={true}
					tabIndex={1}
					cols="30"
					rows="10"
					onFocus={selectAll}
					onClick={selectAll}
				/>
				<button onClick={download}>Download</button>
			</Block>
		);
	}
}

export default observer(Html);
