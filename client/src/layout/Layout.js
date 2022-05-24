import React from 'react'
import { Outlet } from 'react-router-dom';
import './Layout.css'

const Layout = () => {
  return (
    <div className="layout">
    <header className="header">
      Header
    </header>
    <aside className="aside">
      Sidebar
    </aside>
    <main>
      <Outlet />
    </main>
    <footer className="footer">
        Footer
    </footer>
  </div>
  )
}

export default Layout
