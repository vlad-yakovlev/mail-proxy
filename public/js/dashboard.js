'use strict';


$('.js-open').click(function () {
	let mailId = $(this).data('id');
	
	window.location = `/dashboard/mail/${mailId}`;
});

$('.js-accept').click(function () {
	event.stopPropagation();
	
	let mailId = $(this).data('id');
	
	Request.post(`/dashboard/mail/${mailId}/accept`)
		.then(() => window.location = '/')
		.catch(err => alert(err.message));
});

$('.js-reject').click(function () {
	event.stopPropagation();
	
	let mailId = $(this).data('id');
	
	Request.post(`/dashboard/mail/${mailId}/reject`)
		.then(() => window.location = '/');
});