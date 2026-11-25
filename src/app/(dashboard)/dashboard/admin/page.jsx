import DashboardStats from '@/components/dashboard/dashboardAdmin/DashboardStats'
import EarningStatistics from '@/components/dashboard/dashboardAdmin/EarningStatistics'
import RecentOrders from '@/components/dashboard/dashboardAdmin/RecentOrders'
import React from 'react'

function AdminDashboard() {
  return (
    <div className='my-4 mx-auto w-[calc(100%_-_2rem)] space-y-4'>
      <h2 className='text-2xl'>Overview</h2>
      <DashboardStats/>
      <EarningStatistics/>
      <RecentOrders/>
    </div>
  )
}

export default AdminDashboard
