import React, {useEffect, useState} from 'react'
import axios from 'axios'

const  MainRight = () => {


  const [product, setProduct] = useState("");
  
  

  const getPostList = async () => {
    try {
       const res = await axios.post('http://localhost:1212/products/getlist')
       .then((res) => {
        console.log(res.data);
      })
      setProduct(res.data.json());
    } 
    catch (err) {
      console.log('fail')
    }
  }

  useEffect(() => {
    getPostList(); 
  });
  console.log('!!!');
  console.log(product);


  return (
    <div className="container">{product}</div>
  )
}



export default MainRight;
