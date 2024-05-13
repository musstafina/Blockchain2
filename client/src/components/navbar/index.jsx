import { Navbar as BootstrapNavbar, Container, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
	return (
		<BootstrapNavbar sticky='top'>
			<Container>
				<Nav className='w-100 d-flex justify-content-around'>
					<NavLink to='/' className={'nav-link'}>
						home
					</NavLink>
					<NavLink to='/me' className={'nav-link'}>
						profile
					</NavLink>
				</Nav>
			</Container>
		</BootstrapNavbar>
	)
}
