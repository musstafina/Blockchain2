import { Col, Input, Row } from 'antd'
import { Helmet } from 'react-helmet'

import { useDispatch, useSelector } from 'react-redux'
import { UserList } from '../../components/user-list'
import { useUsersByNameQuery } from '../../shared/api/user-api-slice'
import {
	selectFindUserPageUsername,
	setUsername,
} from '../../shared/slices/find-user-page-slice'

const FindUserPage = () => {
	const username = useSelector(selectFindUserPageUsername)
	const dispatch = useDispatch()
	const { data, isLoading } = useUsersByNameQuery(username, {
		skip: !username,
	})

	const onSearch = username => {
		dispatch(setUsername(username))
	}

	return (
		<>
			<Helmet>
				<title>Find users</title>
			</Helmet>
			<Row>
				<Col offset={6} span={12}>
					<Input.Search
						placeholder='Enter username'
						allowClear
						variant='filled'
						enterButton='search'
						onSearch={onSearch}
						defaultValue={username}
					/>
				</Col>
			</Row>
			<Row>
				<Col offset={6} span={12}>
					<UserList altLabel loading={isLoading} users={data} />
				</Col>
			</Row>
		</>
	)
}

export default FindUserPage
