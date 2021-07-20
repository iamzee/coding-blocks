import React from 'react';

import Box from '@material-ui/core/Box';

const Container = ({ children }) => {
	return <Box sx={{ maxWidth: 800, margin: '100px auto' }}>{children}</Box>;
};

export default Container;
