import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {useNavigate, useParams} from "react-router-dom";
import { Button } from '@mui/material';
import { NavItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state/index';

const DetailPage = () => {
    const [product, setProduct] = useState([]);
    const { id } = useParams();
    const nid = String(id);
    console.log('nid', nid);
    const [uid, setUid] = useState("");
    const [displayUserData, setDiaplsyUserData] = useState({
        disemail: '',
        disrole: '',
        disavatar: '',
        disname: ''
      })

    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const {loginUser, logoutUser, fbuser, nofbuser} = bindActionCreators(actionCreators, dispatch);

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
    
    const appliyCampaign = async (e) => {
        e.preventDefault();
        try {
            console.log('test for push', uid, id);
            const res = await axios.post('http://localhost:1212/products/appliyCampaign',
            {uid, id}).then((res) => {
                console.log('Applied Success!');
            })
        }
        catch (err) {
            console.log('Applied failed');
            console.log(uid);
        }
    };


    const item = product.find(e => e._id === id);

    useEffect(() => {
        getPostList();
    }, []);

    useEffect(() => {
        fetching();
      },[state])
    
      const fetching = async(e) => {
        try{
        await setUid(state.auth.state.uid);
        await setDiaplsyUserData({
            disemail: state.auth.state.email,
            disrole: state.auth.state.role,
            disavatar: state.auth.state.avatar,
            disname: state.auth.state.displayName
          })
        }catch{
          console.log(e)
        }
      }

    return (
        <div>
            <div>{uid}</div>
            {/* <div>{item._id}</div> */}
            {item ? 
            <div>
                <div>{item._id}</div>
                <h1> 편집</h1>
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
                    {item.photo}
                    
                    <img
                        src={item.photo}
                        width='100'
                        height='100'
                        alt='testA' />

                </div>
                <div>
                    {item.targetPlatform}    
                </div> 
            </div> : <div>찬휘</div>}

            <div>
                <Button onClick={appliyCampaign}>
                    신청하기
                </Button>
            </div>
        </div>
    );

};

export default DetailPage;
