import React, { Component } from 'react';
import './Source.scss';
import Block from './Block';
import { observer } from 'mobx-react';

class Source extends Component {
	render() {
		const { title, changeTitle, data, changeData } = this.props;
		return (
			<Block className="Source">
				<input
					type="text"
					value={title}
					onChange={changeTitle}
					placeholder="Title"
					tabIndex={1}
				/>
				<textarea
					cols="30"
					rows="10"
					value={data}
					onChange={changeData}
					placeholder="Data source"
					tabIndex={1}
				/>
				<div>
					<p>아래의 방법으로 한 줄씩 입력</p>
					<span>이미지주소 | 설명</span>
					<span>이미지주소 | 설명 | 링크주소</span>
					<span>유투브주소</span>
				</div>
			</Block>
		);
	}
}

export default observer(Source);
