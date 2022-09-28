import { SetStateAction, useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { Message} from '../components'
import {UserContext} from '../context'


export default function SignUp() {
  const {register} = useContext(UserContext)
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSignUp = async () => {
    setErrorMessage('')
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match')
      return
    }
    const result = await register(username, password)
    if (result === true) {
      navigate('/')
    } else {
      setErrorMessage(result)
    }
  }

  return (
      <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSignUp()
          }}
      >
        {errorMessage && <Message variant="error" message={errorMessage}/>}
        <input
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e: { target: { value: SetStateAction<string> } }) => {
          setErrorMessage('')
          setUsername(e.target.value)
        }}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setErrorMessage('')
          setPassword(e.target.value)
        }}
      />

      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => {
          setErrorMessage('')
          setConfirmPassword(e.target.value)
        }}
      />
      <button
        type="submit"
        disabled={!username || !password || !confirmPassword}
      >
        Sign Up
      </button>
    </form>
  )
}
