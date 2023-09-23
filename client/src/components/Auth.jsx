import React, { useState } from 'react'
import { useCookies } from 'react-cookie'

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [isLogIn, setIsLogIn] = useState(true);
  const [error, setError] = useState(null);

  const [email, setEmail] = useState(null);
  const [password, setPassword,] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  // console.log(email, password, confirmPassword);
  // console.log(cookies);

  const viewLogin = (status) => {
    setError(null);
    setIsLogIn(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      setError('確認您的密碼是否相同')
      return
    }

    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
      method:"POST",
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log(data);

    if (data.detail) {
      setError(data.detail)
    } else {
      setCookie('Email', data.email);
      // console.log(data.email);
      setCookie('AuthToken', data.token);

      window.location.reload();
    }
  }

  return (
    <div className='auth-container'>
      <div className="auth-container-box">
        <form>
          <h2>{isLogIn ? '請登入' : '請註冊'}</h2>
          <input 
            type='email' 
            placeholder='請輸入您的email' 
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type='password' 
            placeholder='請輸入您的密碼'
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogIn && <input 
            type='password' 
            placeholder='輸入第二次驗證密碼'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />}
          <input type="submit" className='create' onClick={(e) => handleSubmit(e, isLogIn? 'login' : 'signup')} value={'送出'}/>
          {error && <p>{error}</p>}
        </form>
        <div className="auth-options">
          <button 
            onClick={() => {viewLogin(false)}}
            style={{backgroundColor: !isLogIn? 'white' : 'rgba(58, 58, 58, 0.8)'}}
          >註冊</button>
          <button 
            onClick={() => {viewLogin(true)}}
            style={{backgroundColor: isLogIn? 'white' : 'rgba(58, 58, 58, 0.8)'}}
          >登入</button>
        </div>
      </div>
    </div>
  )
}

export default Auth
