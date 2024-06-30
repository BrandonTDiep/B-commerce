import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3 className="mb-3">Log In</h3>
      
      <label for="email" className="mb-1">Email address:</label>
      <input 
        id="email"
        className="mb-3"
        autoComplete="email"
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label for="password" className="mb-1">Password:</label>
      <input 
        id="password"
        className="mb-3"
        autoComplete="current-password"
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />


      <button disabled={isLoading} className="mb-3">Log in</button>
      <Link to="/signup" className="nav-link">Don't have an account?  Sign Up</Link>

      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login