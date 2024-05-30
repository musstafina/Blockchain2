import { Col, Row } from 'antd'
import { Helmet } from 'react-helmet'

import { useEffect, useState } from 'react'
import { UserList } from '../../components/user-list'

import { useBlog } from '../../app/solana'

const AllUsersPage = () => {
	const { getAllUsers } = useBlog()
	const [users, setUsers] = useState([])

	useEffect(() => {
		getAllUsers().then(users => {
			if (users) {
				console.log(users)
				setUsers(
					users.map(user => ({
						name: user.account.name,
						avatar: user.account.avatar,
						authority: user.account.authority.toString(),
						publicKey: user.publicKey.toString(),
					}))
				)
			}
		})
	}, [])

	return (
		<>
			<Helmet>
				<title>All users</title>
			</Helmet>
			<Row>
				<Col offset={6} span={12}>
					<UserList bordered users={users} />
				</Col>
			</Row>
		</>
	)
}

export default AllUsersPage
