'use strict';


$('#logout').click(event => {
	event.preventDefault();
	
	Request.post('/auth/logout')
		.then(() => window.location = '/');
});