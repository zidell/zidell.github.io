import React, { Component } from 'react';
import './App.scss';
import Source from './Source';
import Preview from './Preview';
import Html from './Html';
import { store, actions } from './store';
import { observer } from 'mobx-react';

class App extends Component {
	componentDidMount() {
		actions.convertAll();
	}

	render() {
		const { title, data, html } = store;
		const { changeTitle, changeData } = actions;
		return (
			<div className="App">
				<Source
					title={title}
					data={data}
					changeTitle={changeTitle}
					changeData={changeData}
				/>
				<Html html={html} />
				<Preview html={html} />
			</div>
		);
	}
}

export default observer(App);
