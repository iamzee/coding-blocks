import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Stack from '@material-ui/core/Stack';

import UserInput from './UserInput';
import AddFieldButton from './AddFieldButton';

import Snack from '../../components/snack';

const UserForm = props => {
	const [alert, setAlert] = useState('');

	const defaultFields = [
		{
			label: 'First Name',
			key: 'firstName',
			type: 'text',
			autoSave: false,
		},
		{
			label: 'Last Name',
			key: 'lastName',
			type: 'text',
			autoSave: false,
		},
		{
			label: 'Email',
			key: 'email',
			type: 'email',
			autoSave: false,
		},
		{
			label: 'Password',
			key: 'password',
			type: 'password',
			autoSave: false,
		},
		{
			label: 'Age',
			key: 'age',
			type: 'number',
			autoSave: false,
		},
		{
			label: 'Gender',
			key: 'gender',
			type: 'select',
			autoSave: false,
			options: [
				{
					label: 'Male',
					key: 'M',
				},
				{
					label: 'Female',
					key: 'F',
				},
				{
					label: 'Other',
					key: 'O',
				},
			],
		},
		{
			label: 'Status',
			key: 'status',
			type: 'radio',
			autoSave: false,
			options: [
				{
					label: 'Active',
					key: 'Active',
				},
				{
					label: 'Inactive',
					key: 'Inactive',
				},
			],
		},
		{
			label: 'Avatar',
			key: 'avatar',
			type: 'file',
			autoSave: false,
		},
	];

	const [inputs, setInputs] = useState('');
	const [fields, setFields] = useState(
		!props.user
			? [...defaultFields]
			: defaultFields.filter(field => field.key !== 'password')
	);

	const addField = field => {
		setFields([...fields, field]);
	};

	useEffect(() => {
		const newInputs = {};

		fields.forEach(field => {
			if (!inputs[field.key]) {
				newInputs[field.key] = props.user ? props.user[field.key] : '';
			}
		});

		setInputs({ ...inputs, ...newInputs });
	}, [fields]);

	const onChange = name => async e => {
		const field = fields.find(f => f.key === name);

		let newInputs = { ...inputs };

		if (name === 'avatar') {
			newInputs[name] = e.target.files[0];
		} else {
			newInputs[name] = e.target.value;
		}

		// const newInputs = { ...inputs, [name]: e.target.value };
		console.log(newInputs);
		setInputs({ ...newInputs });

		if (field.autoSave) {
			await props.handleSubmit({ ...newInputs });
		}
	};

	const handleReset = () => {
		if (props.user) {
			setFields(defaultFields.filter(field => field.key !== 'password'));
		} else {
			setFields([...defaultFields]);
		}
	};

	const handleSubmit = async () => {
		const payload = {
			...inputs,
		};

		// if (!props.user) {
		// 	if (
		// 		!inputs['firstName'] ||
		// 		!inputs['age'] ||
		// 		!inputs['gender'] ||
		// 		!inputs['status'] ||
		// 		!inputs['email'] ||
		// 		!inputs['password']
		// 	) {
		// 		setAlert({
		// 			message:
		// 				'First Name, Age, Gender, Status, Email and Password are required',
		// 			severity: 'error',
		// 		});
		// 	} else {
		// 		await props.handleSubmit(payload);
		// 	}
		// } else {
		// 	await props.handleSubmit(payload);
		// }

		await props.handleSubmit(payload);
	};

	const handleDeleteField = name => () => {
		setFields(fields.filter(field => field.key !== name));
	};

	return (
		<div>
			{inputs &&
				fields.map(field => (
					<UserInput
						key={field.key}
						field={field}
						value={inputs[field.key]}
						onChange={onChange}
						handleDeleteField={handleDeleteField}
					/>
				))}
			<Stack direction="row" spacing={2}>
				<AddFieldButton addField={addField} />
				<Button onClick={handleReset} variant="outlined">
					Reset
				</Button>
				<Button onClick={handleSubmit} variant="contained">
					Save
				</Button>
			</Stack>
			{alert && (
				<Snack
					message={alert.message}
					severity={alert.severity}
					onClose={() => setAlert('')}
				/>
			)}
		</div>
	);
};

export default UserForm;
