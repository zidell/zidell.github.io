class Test extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			width : 300,
			height: 300
		};

	}
	expand() {
		this.setState({
			height : this.state.height - 10
		});
	}
	expandWidth() {
		this.setState({
			width : this.state.width + 10
		});
	}
	render() {
		return (
			<div>
				<h1>Hello World</h1>
				<button onClick={this.expand.bind(this)} type="button" class="btn btn-default">height</button>
				<button onClick={this.expandWidth.bind(this)} type="button" class="btn btn-default">width</button>
				<div className="block-box" style={{
					marginLeft: 10,
					width: this.state.width,
					height: this.state.height
				}}>
					<SetBorderTopBottom width={this.state.width} height={this.state.height} />
				</div>
			</div>
		);
	}
}
class SetBorderTopBottom extends React.Component {
	render() {
		const padding = 5;
		return (
			<svg width={this.props.width} height={this.props.height} style={{
				overflow: 'visible'
			}}>
				<line
					x1="0"
					y1="0"
					x2="100%"
					y2="0"
					stroke="black"
					strokeWidth={padding}
				/>
				<line
					x1="0"
					y1="0"
					x2="0"
					y2="100%"
					stroke="black"
					strokeWidth={padding}
				/>
				<line
					x1="100%"
					y1="0"
					x2="100%"
					y2="100%"
					stroke="black"
					strokeWidth={padding}
				/>
				<rect
					x="2%"
					y="-10%"
					width="5%"
					height="5%"
				>
				</rect>
				<line
					x1="0"
					y1="100%"
					x2="100%"
					y2="100%"
					stroke="black"
					strokeWidth={padding}
				/>
			</svg>
		);
	}
}
ReactDOM.render(<Test />, document.getElementById('root'));