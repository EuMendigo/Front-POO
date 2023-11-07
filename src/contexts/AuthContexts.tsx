import axios from "axios"
import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react"

export interface CredentialsProps {
  usuario: string
  password: string
}

type LoginAccountResponseData = {
  token: string
}

type AuthContextsProps = {
  token: string
  loading: boolean
  signIn: (credentials: CredentialsProps) => Promise<void>
  signOut: () => void
}

type Props = {
  children: ReactNode
}

const AuthContext = createContext<AuthContextsProps>({} as AuthContextsProps)

export default function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    function handleLoadData() {
      setLoading(true)
      try {
        const token = localStorage.getItem("@cardapio:token");

        if (token) {
          setToken(token)
        }

      } finally {
        setLoading(false)
      }
    }

    handleLoadData()
  }, [])

  const signIn = useCallback(async (data: CredentialsProps) => {
    setLoading(true)
    try {
      const response = await axios.post<LoginAccountResponseData>('https://restaurante-poo-api.up.railway.app/auth/login', { ...data });
      console.log(response.data)


      if (response.status === 200) {
        setToken(response.data.token)
        localStorage.setItem("@cardapio:token", response.data.token)
      }

    } catch (error) {
      console.log('login mal sucedido')
    } finally {
      setTimeout(() => setLoading(false), 3000)
    }
  }, [])

  const signOut = () => {
    setLoading(true)

    setToken("")
    localStorage.removeItem("@cardapio:token")
    setLoading(false)
  }

  return (
    <AuthContext.Provider value={{ token: token as string, loading, signIn, signOut }} >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("Provider is not defined")
  }

  return context
}