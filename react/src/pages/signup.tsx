import { useState } from 'react'
import { Message } from '../components'
import users from '../data/users.json'

export default function SignUp() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSignUp = () => {
    if (users.find((u) => u.username === username)) {
      setErrorMessage(`Username ${username} has been taken`)
      return
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match')
      return
    }
    console.log({
      username,
      password,
    })
  }

  return (
    <form
      className={"container"}
      onSubmit={(e) => {
        e.preventDefault()
        handleSignUp()
      }}
    >
      {errorMessage && <Message variant="error" message={errorMessage} />}
      <input
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value)
        }}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
        }}
      />

      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => {
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