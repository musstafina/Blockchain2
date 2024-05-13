import { Card, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectUser } from '../../shared/slices/user-slice'
import { ConnectWalletButton } from '../connect-wallet-button'
import { LogoutButton } from '../logout-button'

const personalPhotoPlaceholder =
	'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'

export const UserCard = () => {
	const { firstName, lastName, email, personalPhoto, biography } =
		useSelector(selectUser)
	const username = `${lastName} ${firstName}`

	return (
		<Card className='w-100 py-4'>
			<Row className='w-100'>
				<div className='col-3 p-5'>
					<img
						src={personalPhoto || personalPhotoPlaceholder}
						alt='profile photo'
						className='w-100'
					/>
				</div>
				<div className='col-8'>
					<Card.Title>{username}</Card.Title>
					<Card.Subtitle>{email}</Card.Subtitle>
					<Card.Text>{biography}</Card.Text>
				</div>
				<div className='col-1 d-flex flex-column justify-content-between'>
					<ConnectWalletButton />
					<LogoutButton />
				</div>
			</Row>
		</Card>
	)
}
