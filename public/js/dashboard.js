'use strict';


$('.js-open').click(function () {
	let mailId = $(this).data('id');
	
	window.location = `/dashboard/mail/${mailId}`;
});

$('.js-accept').click(function () {
	event.stopPropagation();

	if ( ! confirm('Отправить письмо?')) {
		return;
	}
	
	$('#loading').show();
	
	let mailId = $(this).data('id');
	
	Request.post(`/dashboard/mail/${mailId}/accept`)
		.then(() => window.location = '/')
		.catch(() => {
			$('#loading').hide();
			alert('При отправке произошла ошибка');
		});
});

$('.js-reject').click(function () {
	event.stopPropagation();
	
	$('#loading').show();
	
	let mailId = $(this).data('id');
	
	Request.post(`/dashboard/mail/${mailId}/reject`)
		.then(() => window.location = '/');
});