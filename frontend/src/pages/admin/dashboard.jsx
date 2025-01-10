import React,{useState} from 'react'
import Dashboard from '../../components/dashboard/dashboard'
import Navbar from '../../components/navbar/Navbar'
function dashboard() {
  const [query, setQuery] = useState("");

  

  const handleSearch = async (query) => {
    setQuery(query); 
    
  };


  return (
    <div>
        <Navbar onSearch={handleSearch} />
        <Dashboard query={query} />
    </div>
  )
}

export default dashboard