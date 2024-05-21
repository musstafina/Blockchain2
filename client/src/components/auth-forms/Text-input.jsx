import { Input } from 'antd'
import { useField } from 'formik'
import PropTypes from 'prop-types'

export const TextInput = ({ label, ...props }) => {
	const [field, meta] = useField(props)
	return (
		<div style={{ marginTop: 10, textAlign: 'center' }}>
			<label hidden={true}>{label}</label>
			<Input
				status={meta.touched && meta.error ? 'error' : meta.error}
				type='text'
				placeholder={meta.touched && meta.error ? meta.error : label}
				{...props}
				{...field}
				style={{ textAlign: 'center' }}
			/>
		</div>
	)
}
TextInput.propTypes = {
	label: PropTypes.string,
}
