'use strict';


const he = require('he');


module.exports = str => {
	// encode special chars
	str = he.encode(str, {
		useNamedReferences: true,
	});
	
	// normalize line endings
	str = str.replace(/\r?\n/g, '\n').trim();
	
	// trim empty line endings
	str = str.replace(/[ \t]+$/mg, '').trim();
	
	// insert <p> to multiple linebreaks
	str = str.replace(/\n\n+/g, '</p><p>').trim();
	
	// insert <br> to single linebreaks
	str = str.replace(/\n/g, '<br/>');
	
	return `<p>${str}</p>`;
};