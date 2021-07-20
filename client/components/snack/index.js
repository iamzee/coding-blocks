import React, { useState } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/core/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Snack = props => {
	const [open, setOpen] = useState(true);

	const handleClose = () => {
		setOpen(false);
		props.onClose();
	};

	return (
		<Snackbar
			open={open}
			autoHideDuration={5000}
			onClose={handleClose}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
		>
			<Alert onClose={handleClose} severity={props.severity}>
				{props.message}
			</Alert>
		</Snackbar>
	);
};

export default Snack;
