import React,{useState} from 'react'
import Dashboard from '../../components/dashboard/dashboard'
import Navbar from '../../components/navbar/Navbar'
function dashboard() {
  const [query, setQuery] = useState("");

  const fetchUsers = async (query = "") => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:3000/admin/users?name=${query}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Users:", data);
        return data; 
      } else {
        console.error("Failed to fetch users");
        return [];
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };

  const handleSearch = async (query) => {
    setQuery(query); 
    
  };


  return (
    <div>
        <Navbar onSearch={handleSearch} />
        <Dashboard fetchUsers={fetchUsers} query={query} />
    </div>
  )
}

export default dashboard