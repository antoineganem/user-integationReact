import { useEffect, useState } from 'react';
import Card from './components/Card';
// import CardDemo from './components/CardDemo';
import NavigationBar from '../../shared/NavigationBar';

const Dashboard = () => {

  const [users, setUsers] = useState([]);
  const [filter,setFilter] = useState('');

  const handleFilterChange = (value) => {
    setFilter(value);
  }

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(filter.toLowerCase())
  )
  const fetchUsers = async () => {
    const response = await fetch('http://localhost:3000/users');
    const data = await response.json();
    setUsers(data);
    console.log(data);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  
  return (
    <NavigationBar onFilterChange={handleFilterChange}>
      <div style={{display:"flex", flexWrap:'wrap' , justifyContent:'center', border: '1px solid #399C7E', borderRadius: '5px',
      gap: '1rem'
      }}>
        {filteredUsers.map((user) => (
          <div key={user.id} style={{ padding: '1%' ,flex: '1 1 calc(33.333% - 1rem)',boxSizing: 'border-box'
          }}>
            <Card user={user} />
          </div>
        ))}
      </div>
    </NavigationBar>
  );
};

export default Dashboard;
