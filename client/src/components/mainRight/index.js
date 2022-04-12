import React, {useEffect, useState} from 'react'
import axios from 'axios'

const  MainRight = () => {

  const getPostList = async () => {
    try {
       const res = await axios.post('http://localhost:1212/products/getlist')
       .then((res) => {
         console.log(res.data)
      })
    } catch (err) {
      console.log('fail')
    }
  }

  

  useEffect(() => {
    getPostList();
  });



  return (
    <div className="container">MainRight</div>
  )
}



export default MainRight;
