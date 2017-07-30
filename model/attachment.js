'use strict';


const config = require('lib/config');
const logger = require('lib/logger');

const co = require('co');
const fs = require('fs-extra');
const moment = require('moment');
const mongoose = require('mongoose');
const path = require('path');


let Attachment;
const AttachmentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	path: {
		type: String,
		required: true,
	},
});


AttachmentSchema.statics.receive = function (attachmentRaw) {
	return co(function*() {
		const id = mongoose.Types.ObjectId();
		const fileName = attachmentRaw.filename;
		const filePath = path.join(moment().format('YYYY_MM_DD'), id.toString());
		
		
		const attachment = new Attachment({
			_id: id,
			name: fileName,
			path: filePath,
		});
		
		yield attachment.save();
		
		
		const fullPath = path.join(process.cwd(), 'attachments', filePath);
		fs.mkdirpSync(path.dirname(fullPath));
		fs.writeFileSync(fullPath, attachmentRaw.content);
		
		
		logger.debug(`Received attachment ${attachmentRaw.filename}`);
		
		
		return attachment;
	});
};


Attachment = mongoose.model('Attachment', AttachmentSchema);

module.exports = Attachment;