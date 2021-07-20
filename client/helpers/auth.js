export const isAuthenticated = () => {
	if (typeof window == 'undefined') {
		return false;
	}

	if (sessionStorage.getItem('cb-jwt')) {
		return JSON.parse(sessionStorage.getItem('cb-jwt'));
	} else {
		return false;
	}
};

export const authenticate = jwt => {
	if (typeof window != 'undefined') {
		sessionStorage.setItem('cb-jwt', JSON.stringify(jwt));
	}
};

export const clearJwt = () => {
	if (typeof window != 'undefined') {
		sessionStorage.removeItem('cb-jwt');
	}

	// cb();
};
