import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios' 

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (email, firstName, lastName, password) => {
    setIsLoading(true)
    setError(null)

    try{
      const response = await axios.post('/api/user/signup', {
        email,
        firstName,
        lastName,
        password
      })

      const json = response.data // contains json web token and email

      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    } catch(error) {
      setIsLoading(false)
      setError(error.response.data.error)
    }
  }

  return { signup, isLoading, error }
}