import { observable, action } from 'mobx';
const defaultExample = `http://via.placeholder.com/800x1200 | 이미지에 대한 설명1

https://www.youtube.com/watch?v=SZIwfrlMdn8&t=4s

http://via.placeholder.com/800x200 | 링크 이미지에 대한 설명2 | https://google.com
`;

const store = observable({
	title: localStorage.getItem('title') || '',
	data: localStorage.getItem('data') || defaultExample,
	html: '',
});

const actions = {
	changeTitle: action(e => {
		store.title = e.target.value;
		localStorage.setItem('title', store.title);
		actions.convertAll();
	}),
	changeData: action(e => {
		store.data = e.target.value;
		localStorage.setItem('data', store.data);
		actions.convertAll();
	}),
	convertAll: action(() => {
		const joinChar = '';
		let html = '';

		// prepare meta
		const metaArr = [
			'<meta charset="utf-8" />',
			'<meta http-equiv="X-UA-Compatible" content="IE=edge" />',
			'<meta name="viewport" content="width=device-width, initial-scale=1" />',
		];

		// prepare body
		const bodyArr = [];

		// convert each row to markup
		const rows = store.data.trim().split('\n');
		rows.forEach(row => {
			bodyArr.push(actions.getTagByType(row.trim()));
		});

		// prepare to merge
		html += [
			'<!--',
			'\n',
			'\n',
			'- title :',
			'\n',
			store.title,
			'\n',
			'\n',
			'- data :',
			'\n',
			store.data,
			'\n',
			'\n',
			'-->',
			'\n',
		].join(joinChar);

		// merge basic skeleton
		html += [
			'<!DOCTYPE html>',
			'<html lang="ko">',
			'<head>',
			'<title>',
			store.title,
			'</title>',
		].join(joinChar);

		// merge meta
		html += metaArr.join(joinChar);

		// merge style
		html += actions.getStyle();

		// close head and star body
		html += ['</head><body>'].join(joinChar);

		// merge body
		html += bodyArr.join(joinChar);

		// close body and complete
		html += ['</body></html>'].join(joinChar);

		store.html = html;
	}),

	youtube_parser: url => {
		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
		var match = url.match(regExp);
		return match && match[7].length === 11 ? match[7] : false;
	},

	tagImage: (imageUrl, alt) => {
		return '<img src="' + imageUrl + '" alt="' + alt + '"/>';
	},
	tagAnchor: (imageUrl, url, alt) => {
		return (
			'<a title="' +
			alt +
			'" href="' +
			url +
			'" target="_blank">' +
			actions.tagImage(imageUrl, alt) +
			'</a>'
		);
	},

	tagYoutube: row => {
		return [
			'<div class="videoWrapper">',
			'<iframe',
			' width="560"',
			' height="315"',
			' src="https://www.youtube.com/embed/' +
				actions.youtube_parser(row) +
				'"',
			' frameborder="0"',
			' allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"',
			' allowfullscreen',
			'></iframe>',
			'</div>',
		].join('');
	},
	getTagByType: row => {
		if (row === '') {
			return '';
		}
		var tmp = row.split('|');
		if (typeof tmp[1] === 'undefined') {
			tmp[1] = '';
		}
		if (typeof tmp[2] === 'undefined') {
			tmp[2] = '';
		}
		for (var i in tmp) {
			tmp[i] = tmp[i].trim();
		}
		var lowerRow = row.toLowerCase();
		if (lowerRow.indexOf('youtube.com/') > -1) {
			return actions.tagYoutube(tmp[0]);
		} else if (
			tmp[1].indexOf('http') === 0 ||
			tmp[2].indexOf('http') === 0
		) {
			var url = tmp[1].indexOf('http') === 0 ? tmp[1] : tmp[2];
			var alt = tmp[1].indexOf('http') === 0 ? tmp[2] : tmp[1];
			return actions.tagAnchor(
				tmp[0],
				url,
				alt.replace(/["']/g, '&quot;')
			);
		}
		return actions.tagImage(tmp[0], tmp[1]);
	},
	getStyle: () => {
		return [
			'<style>',
			'html {',
			'margin: 0;',
			'padding: 0;',
			'}',
			'body {',
			'padding: 0;',
			'margin: 0 auto;',
			'max-width: 600px;',
			'}',
			'img,',
			'a {',
			'display: block;',
			'margin: 0 auto;',
			'width: 100%;',
			'}',
			'.videoWrapper {',
			'margin: 0 auto;',
			'position: relative;',
			'padding-bottom: 56.25%; /* 16:9 */',
			'height: 0;',
			'}',
			'.videoWrapper iframe {',
			'position: absolute;',
			'top: 0;',
			'left: 0;',
			'width: 100%;',
			'height: 100%;',
			'}',
			'</style>',
		].join('');
	},
};

export { store, actions };
