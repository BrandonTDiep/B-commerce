import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  })
  
  const handleBlur = (e) => { 
    const { id, value } = e.target
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: value.trim() === ''
    }))
  }; 

  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, firstName, lastName, password)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3 className="mb-3">Sign Up</h3>

      <label htmlFor="firstName" className="mb-1">First Name:</label>
      <input 
        id="firstName"
        className={`mb-3 ${errors.firstName && 'error-border'}`}
        autoComplete="given-name"
        type="text" 
        onChange={(e) => setFirstName(e.target.value)}
        onBlur={handleBlur}  
        value={firstName} 
      />
      {errors.firstName && <p className="error-message">Please enter your first name.</p>}

      <label htmlFor="lastName" className="mb-1">Last Name:</label>
      <input 
        id="lastName"
        className={`mb-3 ${errors.lastName && 'error-border'}`}
        autoComplete="family-name"
        type="text" 
        onChange={(e) => setLastName(e.target.value)}
        onBlur={handleBlur} 
        value={lastName} 
      />
      {errors.lastName && <p className="error-message">Please enter your last name.</p>}

      <label htmlFor="email" className="mb-1">Email address:</label>
      <input 
        id="email"
        className={`mb-3 ${errors.email && 'error-border'}`}
        autoComplete="email"
        type="email" 
        onChange={(e) => setEmail(e.target.value)}
        onBlur={handleBlur} 
        value={email} 
      />
      {errors.email && <p className="error-message">Please enter your email.</p>}
      
      <label htmlFor="password" className="mb-1">Password:</label>
      <input 
        id="password"
        className={`mb-3 ${errors.password && 'error-border'}`}
        autoComplete="new-password"
        type="password" 
        onChange={(e) => setPassword(e.target.value)}
        onBlur={handleBlur} 
        value={password} 
      />
      {errors.password && <p className="error-message">Please enter your password.</p>}

      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup