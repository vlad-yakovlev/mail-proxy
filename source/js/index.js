'use strict';


$('#login-form').submit(event => {
	event.preventDefault();
	
	let login = $('#login').val();
	let pass = $('#pass').val();
	
	console.log(login, pass);
	
	Request.post('/auth/login', {login, pass})
		.then(() => window.location = '/') // redirect in index method
		.catch(err => alert(`Ошибка авторизации: "${err.message}"`));
});