import { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context'
import users from '../data/users.json'
import { Message } from '../components'

export default function Login() {
  const { login } = useContext(UserContext)
  const usernameInput = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isCredentialInvalid, setIsCredentialInvalid] = useState(false)

  const handleLogin = () => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    )
    if (!user) {
      setIsCredentialInvalid(true)
    } else {
      login(username)
      navigate('/')
    }
  }

  useEffect(() => {
    if (usernameInput.current) {
      usernameInput.current.focus()
    }
  }, [])

  return (
    <form
      className="container"
      onSubmit={(e) => {
        e.preventDefault()
        handleLogin()
      }}
    >
      {isCredentialInvalid && (
        <Message variant="error" message="Invalid username or password" />
      )}
      <input
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value)
          setIsCredentialInvalid(false)
        }}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
          setIsCredentialInvalid(false)
        }}
      />
      <button type="submit" disabled={!username || !password}>
        Login
      </button>
    </form>
  )
    return (<> </>);
}