/**
 * display content using a basic HTML replacement
 * https://stackoverflow.com/questions/46119987/upload-and-read-a-file-in-react
 */
function displayContents(txt) {
    var el = document.getElementById('main'); 
    el.innerHTML = txt; //display output in DOM
}

const store = observable({
	text: ''
});
function readText(e){
	const filePath = e.target;
	var output = ""; //placeholder for text output
	if(filePath.files && filePath.files[0]) {           
    	var reader = new FileReader();
	    reader.onload = function (e) {
	    	$(window).scrollTop(0);
	        store.text = reader.result;
	    };//end onload()
	    reader.readAsText(filePath.files[0]);
	}//end if html5 filelist support
	return true;
}

function move(direction) {
	var top = $(window).scrollTop();
	var height = $(window).height();
	var amount = height * 0.95;
	var pl = direction === 'up' ? -1 : 1;
	$(window).scrollTop(top + amount * pl);
}

function convertText(str) {
	return '<p>'+ str
		.toString()
		.replace(/[\r]{2,}/g, '</p><br /><p>')
		.replace(/(\.|"|\)|\])[\r]/g, function(match, contents){
			return match + '</p><p>';
		})
		'</p>';
}

const TxtReader = observer(
	class TxtReader extends React.Component {
		constructor(props){
			super(props);
		}

		render() {
			console.log("RENDER");
			const {
				text
			} = store;
			return (
				<div>
					<input type="file" onChange={readText} />
					<br/>
					<br/>
					<div dangerouslySetInnerHTML={{__html: convertText(text + text)}} />
					<br/>
					<br/>
					<input type="file" onChange={readText} />
					<div id="btn-up" onClick={move.bind(null, 'up')} />
					<div id="btn-down" onClick={move.bind(null, 'down')} />
				</div>
			);
		}
	}
);
ReactDOM.render(<TxtReader />, document.getElementById('root'));
