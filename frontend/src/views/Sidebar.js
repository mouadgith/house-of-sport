import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faUsers, 
  faCommentDots, 
  faChartBar, 
  faDumbbell, 
  faLifeRing, 
  faCog,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [showNewFeatures, setShowNewFeatures] = useState(true);

  const menuItems = [
    { name: 'Home', icon: faHome, path: '/' },
    { name: 'Members', icon: faUsers, path: '/members' },
    { name: 'Feedback', icon: faCommentDots, path: '/feedback' },
    { name: 'Reporting', icon: faChartBar, path: '/reporting' },
    { name: 'Equipment', icon: faDumbbell, path: '/equipment' },
    { name: 'Support', icon: faLifeRing, path: '/support' },
    { name: 'Settings', icon: faCog, path: '/settings' }
  ];

  return (
    <div className="sidebar">
      <div className="d-flex justify-content-around p-2 sidebar-header">    
        <FontAwesomeIcon icon={faDumbbell} className="fa-2x gym-icon" />
        <h4 className="align-self-center h5 m-0">House of Sport</h4>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <Link to={item.path} className="nav-link">
              <li 
                key={item.name}
                className={location.pathname === item.path ? 'active' : ''}
              >
                  <FontAwesomeIcon icon={item.icon} className="icon" />
                  <span className="name">{item.name}</span>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <div className="align-items-center d-flex justify-content-between mt-auto">
        <div className="user-profile">
          <div className="avatar">MP</div>
          <div className="user-info">
            <div className="name">Marta Pintaric</div>
          </div>
        </div>
       <div className="logout">
        <button className='btn-none'>
        <FontAwesomeIcon icon={faRightFromBracket} className="rotate-180"/>
        </button>
       </div>
      </div>
    </div>
  );
};

export default Sidebar;