import { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context'
import { Message } from '../components'

export default function Login() {
  const { login } = useContext(UserContext)
  const usernameInput = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async () => {
    setErrorMessage('')
    const result = await login(username, password)
    if (result === true) {
      navigate('/')
    } else {
      setErrorMessage(result)
    }
  }

  useEffect(() => {
    if (usernameInput.current) {
      usernameInput.current.focus()
    }
  }, [])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleLogin()
      }}
    >
      {errorMessage && <Message variant="error" message={errorMessage} />}
      <input
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value)
          setErrorMessage('')
        }}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
          setErrorMessage('')
        }}
      />
      <button type="submit" disabled={!username || !password}>
        Login
      </button>
    </form>
  )
}