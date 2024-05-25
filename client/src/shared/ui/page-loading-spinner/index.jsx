import { Spin } from 'antd'

export const PageLoadingSpinner = () => {
	return (
		<div className='d-flex justify-content-center p-5'>
			<Spin />
		</div>
	)
}
