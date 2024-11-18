import React from 'react'
import { Link } from 'react-router-dom'
import SaveIcon from "../assets/images/save.png"
import ChatIcon from "../assets/images/chat.png"
import PinIcon from "../assets/images/pin.png"
const Card = ({ item }) => {
  console.log(item.images);
  const defaultImage = '../assets/images/pin.png';
  return (
    <div className='card'>
    <Link to={`/post/${item?._id}`} className='imageContainer'>
      <img src={item?.images?.[0] || defaultImage} alt="Post" />
    </Link>
    <div className="textContainer">
      <h2 className="title">
        <Link to={`/post/${item?._id}`}>{item.title}</Link>
      </h2>
      <p className='address'>
        <img src={PinIcon} alt="" />
        <span>{item?.city}</span>
      </p>
      <p className='price'>AZN {item?.price}</p>
      <div className="bottom">
        <div className="features">
          {item?.description}
        </div>
        {/* <div className="icons">
          <div className="icon">
            <img src={SaveIcon} alt="" />
          </div>
          <div className="icon">
            <img src={ChatIcon} alt="" />
          </div>
        </div> */}
      </div>
    </div>
  </div>
  )
}

    

export default Card