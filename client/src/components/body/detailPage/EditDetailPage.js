import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {useNavigate, useParams} from "react-router-dom";
import { Button } from '@mui/material';
import { NavItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state/index';
import { doc, getDocFromCache } from "firebase/firestore";
import { db, auth } from '../../../firebase'
import { async } from '@firebase/util';

 const EditDetailpage = () => {
    const [product, setProduct] = useState([]); // 제품 정보
    const [applicant, setApplicant] = useState([]); // 지원자 목록
    const { id } = useParams();
    const [uid, setUid] = useState("");
    const [displayUserData, setDiaplsyUserData] = useState({
        disemail: '',
        disrole: '',
        disavatar: '',
        disname: ''
      })
    const prdidd = id;
    console.log(id);
    console.log(prdidd);
    
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const {loginUser, logoutUser, fbuser, nofbuser} = bindActionCreators(actionCreators, dispatch);

    const onAcceptHandle = async (applicant_id) => {
        // console.log(e);
        try {
            console.log('accept try');
            const res = await axios.post('http://localhost:1212/products/acceptApplicant',
            {applicant_id, id}).then((res) => {
                console.log('Accept Success!');
            })
        }
        catch (err) {
            console.log('Accept failed');
            console.log(applicant);
        }
    };

    const onDeclineHandle = async (k) => {
        try {
            console.log('Decline try');
            const res = await axios.post('http://localhost:1212/products/declineApplicant',
            {k, id}).then((res) => {
                console.log('Decline Success!');
            })
        }
        catch (err) {
            console.log('Decline failed');
            console.log(applicant);
        }
    }

    

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

    const getprdInfo = async() => {
        const id = prdidd
        console.log(id)
        const res = await axios.post("http://localhost:1212/products/getprdinfo", { id })
        .then((res) => {
            const prddata = res.data
            console.log(prddata)
            console.log(prddata.prdfsidDb)
        })
    }

    useEffect(() => {
        getPostList();
        
    }, []);

    useEffect(() => {
        getprdInfo();
        
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
            <div>uid</div>
            <div>{uid}</div>
            {/* <div>{item._id}</div> */}
            {item ? 
            <div>
                <div>item id</div>
                <div>{item._id}</div>
                <h1> 편집중입니다</h1>
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
                {item ? item.applicant.map(applicant_id => {
                    return (
                        <div>
                            <div>
                                {applicant_id}
                            </div>
                            <Button className='accept' onClick={e => {e.preventDefault(); onAcceptHandle(applicant_id);  }}>수락</Button>
                            <Button className='decline' onClick={e => {e.preventDefault(); onDeclineHandle(applicant_id); }}>거절</Button>
                        </div>
                    )
                }) : <></>}
            </div> : <div>찬휘야 에러다</div>}
        </div>
    );

};


 export default EditDetailpage;