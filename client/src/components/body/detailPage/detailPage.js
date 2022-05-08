import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {useNavigate, useParams} from "react-router-dom";
import { Button } from '@mui/material';
import { NavItem } from 'react-bootstrap';

const DetailPage = () => {
    const [product, setProduct] = useState([]);
    const { id } = useParams();

    const getPostList = async () => {
        try {
           const res = await axios.post('http://localhost:1212/products/getlist')
           .then((res) => {
            console.log(res.data)
            setProduct(res.data); 
            return 0;
          })
    
        } 
        catch (err) {
          console.log(err)
        }
      }
    


    const item = product.find(e => e._id === id);
    console.log(item)

    useEffect(() => {
    getPostList();
    }, []);

    return (
        <div>
            {item ? 
            <div>
                <div>
                    {item.name}    
                </div>
                <div>
                    {item.brand}    
                </div>
                <div>
                    {item.category}    
                </div>
                <div>
                    {item.mobile}    
                </div>
                <div>
                    {item.isCheck}    
                </div>
                <div>
                    이건{item.photo}    
                </div>
                <div>
                    {item.targetPlatform}    
                </div> 
            </div> : <div>찬휘</div>}
        </div>
    );

};

export default DetailPage;
