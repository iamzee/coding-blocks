import React from 'react';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

const UserInput = ({ field, value, onChange, handleDeleteField }) => {
	return (
		<div>
			{(field.type === 'text' ||
				field.type === 'number' ||
				field.type === 'email' ||
				field.type === 'password') && (
				<>
					<TextField
						fullWidth
						variant="outlined"
						label={field.label}
						type={field.type}
						value={value}
						onChange={onChange(field.key)}
						margin="normal"
					/>
				</>
			)}
			{field.type === 'radio' && (
				<>
					<FormControl component="fieldset" margin="normal">
						<FormLabel coponent="legend">{field.label}</FormLabel>
						<RadioGroup
							value={value}
							onChange={onChange(field.key)}
						>
							{field.options.map(option => (
								<FormControlLabel
									key={option.key}
									value={option.key}
									control={<Radio />}
									label={option.label}
								/>
							))}
						</RadioGroup>
					</FormControl>
					<br />
				</>
			)}
			{field.type === 'select' && (
				<FormControl fullWidth margin="normal">
					<InputLabel>{field.label}</InputLabel>
					<Select
						value={value}
						label={field.label}
						onChange={onChange(field.key)}
					>
						{field.options.map(option => (
							<MenuItem value={option.key} key={option.key}>
								{option.label}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			)}
			{field.type === 'file' && (
				<input type="file" onChange={onChange(field.key)}></input>
			)}
			<Button onClick={handleDeleteField(field.key)}>Delete</Button>
		</div>
	);
};

export default UserInput;
