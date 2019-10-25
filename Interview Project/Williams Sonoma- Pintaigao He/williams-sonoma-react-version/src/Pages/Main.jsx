import React from 'react'
import jsonData from "../utils/index.json"
import Item from '../Components/Item';
import "./Main.css"

import { Link } from 'react-router-dom'

const MainPage = (props) => {
  let items = jsonData.groups;
  return (
    <div className="main-container">
      {items.map(item =>
        <Link to={{ pathname: `/item/${item.id}`, state: item }} key={item.id} className="link">
          <Item item={item} />
        </Link>
      )}
    </div>
  )
}

export default MainPage