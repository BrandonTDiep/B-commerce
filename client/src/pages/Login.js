import React from 'react'

const Login = () => {
  return (
    
        <div class="row justify-content-center">
            <section class="col-6 mt-5">

                <form action="/signup" method="POST">
                    <div class="mb-3">
                        <label for="userName" class="form-label">Username</label>
                        <input type="text" class="form-control" id="userName" name="userName" autocomplete="off"/>
                      </div>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">Email address</label>
                      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" autocomplete="off"/>
                      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                      <label for="password" class="form-label">Password</label>
                      <input type="password" class="form-control" id="password" name="password"/>
                      <p class="password">Minimum of 8 characters</p>
                    </div>
                    <div class="mb-3">
                        <label for="confirmPassword" class="form-label">Confirm Password</label>
                        <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" autocomplete="off"/>
                      </div>
                    <button type="submit" class="btn btn-primary">Sign Up</button>
                </form>
            </section>
        </div>
  )
}

export default Login