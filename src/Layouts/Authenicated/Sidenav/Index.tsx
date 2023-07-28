import React from 'react'

type Props = {}

const Index = (props: Props) => {
  return (
    <ul class="sidebar-nav">
      <li class="active">
        <a href="#"><i class="fa fa-home"></i>Home</a>
      </li>
      <li>
        <a href="#"><i class="fa fa-plug"></i>Plugins</a>
      </li>
      <li>
        <a href="#"><i class="fa fa-user"></i>Users</a>
      </li>
    </ul>
  )
}

export default Index