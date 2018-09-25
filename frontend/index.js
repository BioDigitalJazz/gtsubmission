let emptyForm = function() {
	return {
	name: "",
	email: "",
	password: "",
	passwordConf: "",
	referers: {
		allen: false,
		betty: false,
		charles: false,
		other: false
	},
	accountType: null,
	terms: false
	}
}

let verifyPassword = function(pass) {
	let hasUpper = false;
	let hasLower = false;
	let hasNumber = false;
	let nonAlphNums = 0;

  	let code, i;
  	for (i = 0; i < pass.length; i++) {
    	code = pass.charCodeAt(i);
    	if (code > 47 && code < 58) {		// numeric (0-9)
    		hasNumber = true;
    	}
    	else if (code > 64 && code < 91) {		// upper alpha (A-Z)
    		hasUpper = true;
    	}
    	else if (code > 96 && code < 123) { 	// lower alpha (a-z)
        	hasLower = true;
    	}
    	else {
    		nonAlphNums++;
    	}
  	}
  	return hasNumber && hasUpper && hasLower && nonAlphNums > 1;
}

let verifyPasswordConf = function(pass, passConf) {
	return pass === passConf;
}

function verifyEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

let app = angular.module('app', []);
app.controller('appCtrl', function($scope) {
	$scope.form = emptyForm();
	$scope.otherReferer = {name: ""};
	$scope.accountTypes = {};
	$scope.accountTypes.options = ["Bronze", "Silver", "Gold", "Platinum"];
	$scope.notVerified = {};

	this.submit = function() {
		// console.log("submitting");
		let form = $scope.form;
		let nv = $scope.notVerified;

		nv.name = (form.name === "" || form.name == null);

		nv.email = !verifyEmail(form.email);

		nv.password = !verifyPassword(form.password);

		nv.passwordConf = !verifyPasswordConf(form.password, form.passwordConf);

		nv.referers = !(form.referers.allen || form.referers.betty || form.referers.charles || 
			(form.referers.other && form.otherReferer.name !== ""));

		nv.accountType = (form.accountType == null);

		nv.terms = !form.terms;

		if (!(nv.name || nv.email || nv.password || nv.passwordConf || nv.referers || nv.accountType || nv.terms)) {
			$scope.form.success = true;
			console.log("success");
		}

	}

	this.resetForm = function() {
		$scope.form = emptyForm();
		$scope.notVerified = {};
	}
})
