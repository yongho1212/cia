import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {useNavigate, useParams} from "react-router-dom";
import { Button } from '@mui/material';
import { NavItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../../state/index';

const DetailPage = () => {
    const [product, setProduct] = useState([]); // 제품 정보
    const [applicant, setApplicant] = useState([]); // 지원자 목록
    const { id } = useParams();
    const nid = String(id);
    console.log('nid', nid);
    
    

    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const {loginUser, logoutUser, fbuser, nofbuser} = bindActionCreators(actionCreators, dispatch);

    const uid = state.auth.state.loginData.uid;
    const disemail = state.auth.state.loginData.emial
    const disrole = state.auth.state.loginData.uiroled
    const disavatar = state.auth.state.loginData.avatart
    const disname =  state.auth.state.loginData.displayName

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


    return (
        <div>
            <div>{uid}</div>
            {/* <div>{item._id}</div> */}
            {item ? 
            <div>
                <div>{item._id}</div>
                <h1>상품 상세 페이지</h1>
                <div>
                    상품명 {item.name}    
                </div>
                <div>
                    브랜드 {item.brand}    
                </div>
                <div>
                    카테고리 {item.category}    
                </div>
                <div>
                    전화번호 {item.mobile}    
                </div>
                <div>
                    확인 여부 {item.isCheck}    
                </div>
                <div>
                    상품 사진 {item.photo}
                    
                    <img
                        src={item.photo}
                        width='100'
                        height='100'
                        alt='testA' />

                </div>
                <div>
                    타겟 플랫폼 {item.targetPlatform}    
                </div> 
                {item ? item.applicant.map(e => {
                    return (
                        <div key={e}>
                            {e}
                        </div>
                    )
                }) : <></>}
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
