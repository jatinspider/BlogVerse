import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({children,authentication=true}) {
    const navigate = useNavigate()
    const [loader, setloader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
      if(authentication && !authStatus){
        navigate("/login")
      }
      else if (!authentication && authStatus){
        navigate("/")
    }
    setloader(false)
    }, [authentication,navigate,authStatus])
    
  return loader ? <h1>Loading .....</h1> : <>{children}</>
  
}

