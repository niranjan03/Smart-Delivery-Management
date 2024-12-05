import React from 'react'

import OrderForm from '../components/OrderFrom'
import OrdersDashboard from '../components/OrderDashborad'
import OrderList from '../components/OrderList'
import AssignOrder from '../components/AssignOrder'

const Orders = () => {
  return (
    <div>
      <h1>Orders</h1>
      <AssignOrder/>
      <OrderForm />
      <OrderList />
      <OrdersDashboard />
    </div>
  )
}

export default Orders