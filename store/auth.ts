import { useEffect } from 'react'
import { getAuth, onAuthStateChanged } from '@firebase/app'
import { atom, useRecoilState } from 'recoil'
import { firebaseApp } from 'src/lib/firebase'

type User = {
  uid: string
  isAnonymous: boolean
}

const userState = atom<User>({
  key: 'userState',
  default: null,
})

export const useAuthenticate = () => {
  const [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    if (user) return

    const auth = getAuth(firebaseApp)
    onAuthStateChanged(auth, (user: any) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser({ uid: user.uid, isAnonymous: user.isAnonymous })
      } else {
        setUser(null)
      }
    })
  }, [])

  return user
}
