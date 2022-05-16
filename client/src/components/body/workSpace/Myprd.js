import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state/index';

import {
  getAuth
} from "firebase/auth";

const Myprd = () => {

  const auth = getAuth();
  

  const [product, setProduct] = useState();

  const dispatch = useDispatch();
  const state = useSelector((state) => state)
  const {loginUser, logoutUser, fbuser, nofbuser} = bindActionCreators(actionCreators, dispatch);

  const getListById = async () => {
    const uid = auth.currentUser.uid
    console.log(uid)
    try {
       const res = await axios.get('http://localhost:1212/products/getlistbyid', 
       { params: { authorUid: uid } })
       .then((res) => { 
        console.log(res.data);
        setProduct(res.data);
        return 0;
      })
    } 
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getListById();
  }, []);
  

  return (
    <div className="main_Right_chan" style={{display: 'flex', flexWrap: 'wrap'}}>
      {product ? product.map(item => {
        return (
          <div key={item._id} style={{ margin: '20px'}}>
            <Link to={`/Detail/${item._id}`} style={{ color: 'black', display: 'flex', flexDirection: 'column', width: '200px', height: '280px', alignItems: 'flex-start' }}>
              {/* <Link to={`/Detail/${item.name}`} /> */}
              <div style={{ width: '200px', height: '200px', backgroundColor: 'red' }}>
                
                <img className='profile-img' src={item.photo} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column',  backgroundColor:'#fff' }}>
                <div style={{ fontSize: '20px', }}>

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
  )
}



export default Myprd
