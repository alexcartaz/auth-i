const express = require('express');
const ValidationError = require('../validationError'); 

module.exports = {
	name: ({name}) => {
    	if (name === '' || typeof name != "string" || name.length > 128) {
      		throw new ValidationError('Invalid project name.');
     	}
      return true;
	},
	password: ({password}) => {
    	//if (password === '' || typeof password != "string") {
    	//	throw new ValidationError('Project must include description text.');
    	//}
    	return true;
	},
	email: ({email}) => {
    	//if (typeof email != "boolean") {
      //	throw new ValidationError('Project completed invlaid.');
    	//}
      return true;
	}
};