import React, { Component } from 'react';
import './Html.scss';
import Block from './Block';
import $ from 'jquery';
import autoBind from 'auto-bind';
import { observer } from 'mobx-react';

class Html extends Component {
	constructor(props) {
		super(props);
		autoBind(this);
	}

	selectAll() {
		$(this.textarea).select();
	}

	render() {
		const { selectAll } = this;
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
			</Block>
		);
	}
}

export default observer(Html);
