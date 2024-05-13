import { useField } from 'formik'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'

export const TextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props)
	return (
		<Form.Group>
			<Form.Label hidden={true}>{label}</Form.Label>
			<Form.Control
				className={'mt-3 text-center'}
				type='text'
				placeholder={label}
				{...props}
				{...field}
			/>
			{meta.touched && meta.error ? (
				<div className={'text-danger form-text text-center'}>{meta.error}</div>
			) : null}
		</Form.Group>
	)
}
TextInput.propTypes = {
	label: PropTypes.string,
}
