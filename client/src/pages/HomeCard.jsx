import React from 'react'
import { Link } from 'react-router-dom'
const HomeCard = ({item}) => {
  return (
  <div className="homeCard">
  <Link to={`/${item._id}`} className='card-img'>
      <img src={item.images[0]} alt="" />
    </Link>
  <div className="card-info">
    <h2 className='nameProduct'>
    <Link to={`/${item._id}`} className="text-title">{item.title}</Link>
    <span className='type'>{item.type}</span>
    </h2>
    <p className="text-body">
      {/* <img src="/pin.png" alt="" /> */}
      <span className='city'>{item.city}</span>
      {/* <span>{item.createdAt}</span> */}
      {/* <p className="price">
        Azn {item.price}
      </p> */}
    </p>
  </div>
  <div className="card-footer">
    <span className="text-title">{item.price} AZN</span>

  </div>
</div>
  )
}

export default HomeCard