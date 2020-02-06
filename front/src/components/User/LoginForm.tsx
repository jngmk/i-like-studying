import React, { FunctionComponent, useState, ChangeEvent, MouseEvent } from 'react'

// import axios from 'axios'
import path from 'path'
import dotenv from 'dotenv'

import { UserInput, TokenInfo } from './interfaces/UserInfo.interface'
import useUser from '../../hooks/useUser'

import { history } from '../../configureStore'
import { login } from './authentication'

import './styles/Auth.scss'
import { Link } from 'react-router-dom'

dotenv.config({ path: path.join(__dirname, '.env') })

const Login: FunctionComponent = () => {

    const SERVER_IP = process.env.REACT_APP_TEST_SERVER  

    const [ userEmail, setUserEmail ] = useState<string>('')  
    const [ userPass, setUserPass ] = useState<string>('')
    const userInput: UserInput = {
        'email': userEmail,
        'password': userPass,
    }
    const { onGetUserInfo, onSetUserInfo } = useUser()

    const handleEmailInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserEmail(e.target.value)
    }

    const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserPass(e.target.value)
    }

    const loginSubmitHandler = async (e: MouseEvent<HTMLElement>) => {
        e.preventDefault()
        // alert('로그인 버튼 눌렸다' + JSON.stringify(user))

        fetch(`${SERVER_IP}/user/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(userInput)
        }).then(res => {
            console.log(res)

            res.json().then(response => {
                console.log(response)
                console.log(response.data.jwt)

                // localStorage에 token 저장 후 디코딩
                const tokenDecoded = login(response.data.token)    
                console.log('LoginForm에서 tokenDecoded : ', tokenDecoded)
                
                // redux store에 user 정보 저장
                const user = tokenDecoded.user
                console.log('LoginForm에서 tokenDecoded.user : ', tokenDecoded.user)
                onSetUserInfo(user)
            })
            
            // TODO: res 기반으로 validation check

            history.push('/')
            
            // history.push('/user/login')

            /* if (res.status === 200 || res.status === 202){
                console.log("signup success")
            } else {
                console.log("signup fail")
            } */
        })
    }
    console.log('user: ', onGetUserInfo)

    return (
        <div className='authTemplateBlock'>
            <div className='whiteBox'>
                <div className='logo-area'>
                    <Link to='/'>STATU</Link>
                </div>
                <h4 className='formTitle'>로그인</h4>
                <form>
                    <div>
                        <input className='inputAuth' type='text' placeholder='이메일' value={userEmail} onChange={handleEmailInputChange}/>
                    </div>
                    <div>
                        <input className='inputAuth' type='password' placeholder='비밀번호' value={userPass} onChange={handlePasswordInputChange}/>
                    </div>
                    <div>
                        <button className='btnSubmit' type='submit' onClick={loginSubmitHandler}>로그인</button>
                    </div>
                </form>
                <div className='authFooter'>
                    <Link to='/signup'>회원가입</Link>
                </div>
            </div>
        </div>
    )
}

export default Login