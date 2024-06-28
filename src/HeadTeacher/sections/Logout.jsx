import React, {useContext} from 'react'
import { AuthContext } from '@/Context/AuthContext'

function HeadLogout() {
    const {setUser, setAuthTokens} =  useContext(AuthContext)
    localStorage.removeItem("authtokens")
    setUser(null)
    setAuthTokens(null)
    window.location.href = '/login'
  showSuccessAlert("You have logged out")
}

export default HeadLogout
