import { supabase } from '@/lib/supabase'
import { Tables } from '@/types'
import { Session } from '@supabase/supabase-js'
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

type AuthData = {
  session: Session | null
  profile: Tables<'profiles'> | null
  loading: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
})

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<AuthData['profile']>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async (userId: string) => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      return data
    }

    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      setSession(session)

      if (session) {
        const profile = await fetchProfile(session.user.id)

        setProfile(profile)
      }

      setLoading(false)
    }

    fetchSession()
    supabase.auth.onAuthStateChange(async (_event, session) => {
      let profile = null
      if (session) {
        const data = await fetchProfile(session.user.id)
        profile = data
      }
      setProfile(profile)
      setSession(session)
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        profile,
        isAdmin: profile?.group === 'ADMIN',
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
