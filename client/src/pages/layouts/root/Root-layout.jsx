import { Layout } from 'antd'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

import { Navbar } from '../../../components/navbar'
import { PageLoadingSpinner } from '../../../shared/ui'

export const RootLayout = () => {
	// const profileData = useSelector(selectUserProfileData)
	// const posts = useSelector(selectPosts)

	// const dispatch = useDispatch()
	// const { getMyProfile, getAllPosts } = useBlog()

	// useEffect(() => {
	// 	getMyProfile().then(user => {
	// 		if (user) {
	// 			dispatch(
	// 				setUser({
	// 					name: user.name,
	// 					avatar: user.avatar,
	// 					lastPostId: user.lastPostId,
	// 				})
	// 			)
	// 		}
	// 	})
	// }, [])

	// useEffect(() => {
	// 	getAllPosts().then(posts => {
	// 		if (posts) {
	// 			dispatch(
	// 				setPosts(
	// 					posts.map(({ account }) => ({
	// 						id: account.id,
	// 						title: account.title,
	// 						content: account.content,
	// 					}))
	// 				)
	// 			)
	// 		}
	// 	})
	// }, [])

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Navbar />

			<Layout.Content style={{ paddingTop: 20, height: '100%' }}>
				<Suspense fallback={<PageLoadingSpinner />}>
					<Outlet />
				</Suspense>
			</Layout.Content>
		</Layout>
	)
}
