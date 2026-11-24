import DashboardStats from '@/components/dashboard/dashboardAdmin/DashboardStats'
import React from 'react'

function AdminDashboard() {
  return (
    <div className='my-4 mx-4'>
      <h2 className='text-xl'>Overview</h2>
      <DashboardStats/>
    </div>
  )
}

export default AdminDashboard
