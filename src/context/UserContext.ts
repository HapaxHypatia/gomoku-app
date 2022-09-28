import { createContext } from 'react'
import { User } from '../types'

type UserContextType = {
  user?: User
  login: (username: string, password: string) => Promise<true | string>
  logout: () => void
  register: (username: string, password: string) => Promise<true | string>
}

const UserContext = createContext<UserContextType>({} as UserContextType)
export default UserContext