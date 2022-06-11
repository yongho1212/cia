import React, {useEffect, useState} from 'react'
import { Button } from '@mui/material';
import { useNavigate, Route, useParams } from "react-router-dom";
import axios from 'axios'
import { Link } from "react-router-dom";
import DetailPage from '../detailPage/detailPage';

const  MainRight = ({ useParams }) => {
  const [product, setProduct] = useState();
  
  console.log(product);

  const getPostList = async () => {
    try {
       const res = await axios.post('http://localhost:1212/products/getlist')
       .then((res) => { 
       // console.log(res.data);

        setProduct(res.data);
        return 0;
      })

    } 
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getPostList();
  }, []);

  return (
    
    <div className="main_Right_chan" style={{display: 'flex', flexWrap: 'wrap',  }}>
      {product ? product.map(item => {
        return (
          <div key={item._id} style={{ marginInline:'40px', marginTop:'40px'}}>
            <Link to={`/Detail/${item._id}`} style={{ color: 'black', display: 'flex', flexDirection: 'column', width: '200px', height: '280px', alignItems: 'flex-start' }}>
              {/* <Link to={`/Detail/${item.name}`} /> */}
              <div style={{ width: '200px', height: '200px', backgroundColor: 'red' }}>
                <img className='profile-img' src={item.photo} width='200px' height='200px'/>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '20px' }}>
                  <div>
                    {item.brand}
                  </div>
                </div>
                <div style={{ fontSize: '20px' }}>
                  {item.name}
                </div>
              </div>
              <div style={{ fontSize: '14px' }}>
                {item.point}
              </div>
            </Link>
          </div>
        )
      }) : ''}
    </div> 
    
  );
};



export default MainRight;
