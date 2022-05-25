import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {useNavigate, useParams} from "react-router-dom";
import { Button } from '@mui/material';
import { NavItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state/index';

const InfluencerProfile = () => {
    const [influencer, setInfluencer] = useState([]); // 제품 정보
    const [applicant, setApplicant] = useState([]); // 지원자 목록
    const { id } = useParams();
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

    const getInfluencerList = async () => {
        try {
           const res = await axios.post('http://localhost:1212/user/getlist')
           .then((res) => {
            console.log(res.data)
            setInfluencer(res.data); 
            return 0;
          })
    
        } 
        catch (err) {
          console.log(err)
        }
      }
    
    // const appliyCampaign = async (e) => {
    //     e.preventDefault();
    //     try {
    //         console.log('test for push', uid, id);
    //         const res = await axios.post('http://localhost:1212/products/appliyCampaign',
    //         {uid, id}).then((res) => {
    //             console.log('Applied Success!');
    //         })
    //     }
    //     catch (err) {
    //         console.log('Applied failed');
    //         console.log(uid);
    //     }
    // };


    const item = influencer.find(e => e._id === id);

    useEffect(() => {
        getInfluencerList();
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
            <div>접속한 유저 {uid}</div>
            {/* <div>{item._id}</div> */}
            {item ? 
            <div>
                <div>인플루언서{item._id}</div>
                <h1>여기는 {item.displayName}의 프로필입니다.</h1>
                <div>
                    제 이름은 {item.displayName}    
                </div>
                <div>
                    제 나이는 {item.age}    
                </div>
                <div>
                    제 성별은 {item.sex}    
                </div>
                <div>
                    제 핸드폰번호는 {item.mobile}    
                </div>
                <div>
                    제 인스타 계정은 {item.insta}    
                </div>
                <div>
                    제 이메일은 {item.email}    
                </div>
                <div>
                    내 사진 {item.photo}
                    
                    <img
                        src={item.photo}
                        width='100'
                        height='100'
                        alt='testA' />

                </div>
                {/* {item ? item.applicant.map(e => {
                    return (
                        <div key={e}>
                            {e}
                        </div>
                    )
                }) : <></>} */}
            </div> : <div>찬휘</div>}

            <div>
                <Button>
                    신청하기 (아직 기능 X)
                </Button>
            </div>
            {/* <div>
                <Button onClick={appliyCampaign}>
                    신청하기
                </Button>
            </div> */}
        </div>
    );

};

export default InfluencerProfile;
