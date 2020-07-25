import React from 'react'
import {Navbar,Nav} from 'react-bootstrap'
import LOGO from '../../../assets/images/PlanetLogo'
import Leaderboard from '../../../assets/images/navigation/Leaderboard'
import Donate from '../../../assets/images/navigation/Donate'
import Me from '../../../assets/images/navigation/Me'

import { useRouter } from 'next/router'

import Link from 'next/link'
import styles from './Navbar.module.scss'
export default function NavbarComponent(props:any) {
    const router = useRouter()
    let menuItems = [
        {id:1,name:'About us',path:'/',icon:<LOGO color={router.pathname === '/' ?'#89b35a' :'#2f3336'} />},
        {id:2,name:'Donate',path:'/donate',icon:<Donate color={router.pathname === '/donate' ?'#89b35a' :'#2f3336'} />},
        {id:3,name:'Leaderboard',path:'/leaderboard',icon:<Leaderboard color={router.pathname === '/leaderboard' ?'#89b35a' :'#2f3336'} />},
        {id:4,name:'Me',path:'/me',icon:<Me color={router.pathname === '/me' ?'#89b35a' :'#2f3336'} />}
    ]
    return (
        <>
        <Navbar fixed="top" className={styles.top_nav} bg={props.theme === 'theme-light' ? 'light' : 'dark' } variant={props.theme === 'theme-light' ? 'light' : 'dark' }>

                <Nav className={"d-none d-md-flex flex-row "+styles.nav_container}>
                    {menuItems.map(item=>{
                        return(
                        <Nav.Link key={item.id}>
                            <Link href={item.path} >
                                <div className={styles.link_container}>
                                    <div className={styles.link_icon}>
                                        {item.icon}
                                    </div>
                                    <p>{item.name}</p>
                                </div>
                            </Link>
                        </Nav.Link>
                        )
                    })}
                    
                </Nav>
                
        </Navbar>

        <Navbar fixed="bottom" className="d-md-none" bg="light" expand="lg">
                <Nav className={"d-flex flex-row "+styles.mobile_nav}>
                    {menuItems.map(item=>{
                        return(
                        <Nav.Link key={item.id}>
                            <Link href={item.path} >
                                <div className={styles.link_container}>
                                    <div className={styles.link_icon}>
                                        {item.icon}
                                    </div>
                                    <p>{item.name}</p>
                                </div>
                            </Link>
                        </Nav.Link>
                        )
                    })}
                </Nav>
        </Navbar>
        </>
    )
}
