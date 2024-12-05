import React from 'react'

import PartnerList from '../components/PartnerList'
// import AreaManagement from '../components/AreaManagement';
// import ShiftScheduling from '../components/ShiftScheduling';
import { useNavigate } from 'react-router-dom'
const Partners = () => {
  const navigate = useNavigate();
  const handleCreate = () => {
    navigate('/partner-registration')
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Partners</h1>
      <div className='container md:container'>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 xl:w-1/3">
          <div className='p-8 '>
            <span className='text-nowrap'>Create Partner</span>
            <button className="p-3 rounded-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-" onClick={()=>handleCreate()}>Create Partner</button>
          </div>
          </div>
        </div>
      </div>
      
      <PartnerList/>
      {/* <AreaManagement/>
      <ShiftScheduling/> */}
    </div>
  )
}

export default Partners