import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className='nav-top'>
            <Link to='/'>Ligue 1</Link>
            <Link to='/premierleague'>Premier League</Link>
            <Link to='/laliga'>La Liga</Link>
            <Link to='/bundesliga'>Bundesliga</Link>
            <Link to='/seriea'>Serie A</Link>
            <Link to='/nba'>NBA</Link>
        </nav>
    )
}
