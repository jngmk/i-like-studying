import React, { FunctionComponent } from 'react'
import useUser from '../../hooks/useUser'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import pengsu from '../../img/pengsu.png'
import { UserInfo } from '../User/interfaces/UserInfo.interface';
import { history } from '../../configureStore';
import '../Nav/style/Nav.scss'

interface Props {
  onLogout: () => void
  user: UserInfo
}

const SmallNavBarLogin: FunctionComponent<Props> = (props: Props) => {

  const { onLogout, user } = props

  const imgUrl = 'http://13.124.208.26:80/images/' + user.img

  const handleMyPlan = () => {
    history.push(`/plan/${user.name}`)
  }

  return (
    <Navbar className="navBar" bg="light" variant="light" expand="lg">
      <div className="search">
        <Navbar.Brand href="/">STATU</Navbar.Brand>
        <input className="search" type="text" placeholder="시간표 찾기" />
        <button>🔍</button>
      </div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <div className="toggle">
          <br />
          <div className="menu"><a onClick={handleMyPlan} >내 공부</a></div>
          <br />
          <div className="menu"><Link to='/importedplan'>가져온 공부</Link></div>
          <br />
          {/* <div className="menu"><Link to='/community'>커뮤니티</Link></div>
          <br/> */}
          <div className="menu"><Link to='/userinfo'>내정보수정</Link></div>
          <br />
          <div className="menu"><a onClick={onLogout} >로그아웃</a></div>
          <br />

          <div><img className='userImg' src={imgUrl} /></div>
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default SmallNavBarLogin