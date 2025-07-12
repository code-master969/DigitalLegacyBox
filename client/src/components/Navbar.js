import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);
  
  // 切换移动端菜单的显示状态
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // 关闭移动端菜单
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  // 检查当前路径是否匹配导航项
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  // 处理登出
  const handleLogout = async () => {
    await logout();
    closeMenu();
    navigate('/');
  };
  
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <span className="logo-icon">⏳</span>
            <span className="logo-text">时间胶囊</span>
          </Link>
          
          {/* 移动端菜单按钮 */}
          <div className="menu-toggle" onClick={toggleMenu}>
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          
          {/* 导航菜单 */}
          <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link 
                  to="/" 
                  className={`nav-link ${isActive('/') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  首页
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/create" 
                  className={`nav-link ${isActive('/create') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  创建胶囊
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/about" 
                  className={`nav-link ${isActive('/about') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  关于我们
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/faq" 
                  className={`nav-link ${isActive('/faq') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  常见问题
                </Link>
              </li>
              <li className="nav-item">
                <Link 
                  to="/contact" 
                  className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  联系我们
                </Link>
              </li>
            </ul>
            
            {/* 导航操作区 */}
            <div className="navbar-actions">
              {currentUser ? (
                <>
                  <span className="user-email">{currentUser.email}</span>
                  <button className="btn btn-logout" onClick={handleLogout}>
                    退出登录
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-login" onClick={closeMenu}>
                    登录
                  </Link>
                  <Link to="/create" className="btn" onClick={closeMenu}>
                    创建胶囊
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;