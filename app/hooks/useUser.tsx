import { useEffect, useState } from 'react'
import { auth } from '../firebase/firebase'

interface IUser {
	uid: string
	email: string
	displayName?: string | null
	photoURL?: string | null
}

const useUser = () => {
	const [user, setUser] = useState<IUser>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			setUser(user)
			setLoading(false)
		})

		return unsubscribe
	}, [])

	return { user, loading }
}

export default useUser
