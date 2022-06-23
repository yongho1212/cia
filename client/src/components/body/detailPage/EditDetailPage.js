import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {useNavigate, useParams} from "react-router-dom";
import { Button } from '@mui/material';
import { NavItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state/index';
import { doc, getDocFromCache, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from '../../../firebase'
import { async } from '@firebase/util';

 const EditDetailpage = () => {
    const [product, setProduct] = useState([]); // 제품 정보
    const [applicant, setApplicant] = useState([]); // 지원자 목록
    const { id } = useParams();
    
    const [prdfsid, setPrdfsid] = useState("")
    const [prdname, setPrdname] = useState("")

    const prdidd = id;
    
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const {loginUser, logoutUser, fbuser, nofbuser, adaddchannel} = bindActionCreators(actionCreators, dispatch);

    const uid = state.auth.state.loginData.uid
    const disrole = state.auth.state.loginData.role
    const disavatar = state.auth.state.loginData.avatar
    const disname = state.auth.state.loginData.displayName
    

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

    const addNewInf = async(applicant_id) => {
        const docRef = await collection(db, `prdRoom/${prdfsid}/inflist/`)
        const newChannel = await addDoc(docRef, {
            name: {applicant_id},
            Aduid: {uid},
            Infuid: {applicant_id},
            createdAt: serverTimestamp(),
        })
       
        console.log(newChannel.id);
        const joined_channel = newChannel.id
        const progress_prd = prdfsid
        const aduid = uid
        const infuid = applicant_id
        
        const channelid = joined_channel


        try {
            const resprdinf = await axios.post('http://localhost:1212/inf/inf_add_prd',
                {applicant_id, progress_prd}
            ).then((resprdinf) => {
                console.log('success')
                console.log(resprdinf.data)
            })
            const resad = await axios.post('http://localhost:1212/ad/ad_add_channel',
                {uid, joined_channel}
            ).then((resad) => {
                console.log('success')
                console.log(resad.data)
            })
            const resinf = await axios.post('http://localhost:1212/inf/inf_add_channel',
                {applicant_id, joined_channel}
            ).then((resinf) => {
                console.log('success')
                console.log(resinf.data)
            })
            const chdb = await axios.post('http://localhost:1212/chat/addchat',
                {aduid, infuid, prdname, prdfsid, channelid}
            ).then((chdb) => {
                console.log('success')
                console.log(chdb.data)
            })
            console.log(uid, joined_channel);
        } catch (err) {
            console.log(err)
            console.log('failed updateProfile');
            console.log(uid, joined_channel);
        }
        adaddchannel(joined_channel)
        
    }

    const addChannel = async (joined_channel) => {
        try {
            const res = await axios.post('http://localhost:1212/user/addchannel',
                {joined_channel}
            ).then((res) => {
                console.log('success')
            })
            console.log(joined_channel);
        } catch (err) {
            console.log('failed updateProfile');
            console.log(joined_channel);
        }
    };

  


    const getPostList = async (applicant_id) => {
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
            setPrdfsid(prddata.prdfsidDb);
            setPrdname(prddata.name);
            console.log(prdfsid)
        })
    }

    useEffect(() => {
        getPostList();
    }, []);

    useEffect(() => {
        getprdInfo();
    }, []);


    
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
                            <Button className='accept' onClick={e => {e.preventDefault(); onAcceptHandle(applicant_id); addNewInf(applicant_id); }}>수락</Button>
                            <Button className='decline' onClick={e => {e.preventDefault(); onDeclineHandle(applicant_id); }}>거절</Button>
                        </div>
                    )
                }) : <></>}
            </div> : <div>찬휘야 에러다</div>}
        </div>
    );

};


 export default EditDetailpage;