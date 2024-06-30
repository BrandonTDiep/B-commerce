import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3 className="mb-3">Sign Up</h3>

      <label htmlFor="firstName" className="mb-1">First Name:</label>
      <input 
        id="firstName"
        className="mb-3"
        autoComplete="given-name"
        type="email" 
        onChange={(e) => setFirstName(e.target.value)} 
        value={email} 
      />

      <label htmlFor="lastName" className="mb-1">Last Name:</label>
      <input 
        id="lastName"
        className="mb-3"
        autoComplete="family-name"
        type="password" 
        onChange={(e) => setLastName(e.target.value)} 
        value={password} 
      />
      
      <label htmlFor="email" className="mb-1">Email address:</label>
      <input 
        id="email"
        className="mb-3"
        autoComplete="email"
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      
      <label htmlFor="password" className="mb-1">Password:</label>
      <input 
        id="password"
        className="mb-4"
        autoComplete="new-password"
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup