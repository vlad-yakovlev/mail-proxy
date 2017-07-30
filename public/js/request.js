'use strict';


class Request {
	constructor(method, url, data) {
		return $.ajax({
			method,
			url,
			data,
			dataType: 'json',
		})
			.then(res => {
				if (res[0]) {
					throw new Error(res[0]);
				}
				
				return res[1] || null;
			});
	}
	
	static get(url, data) {
		return new Request('get', url, data);
	}
	
	static post(url, data) {
		return new Request('post', url, data);
	}
}