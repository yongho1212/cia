import React,{useEffect} from 'react';
import { Form } from "react-bootstrap";
import "./uploadProduct.css";
import { useState } from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AWS from "aws-sdk";
import { addDoc, setDoc, serverTimestamp, collection } from "firebase/firestore";
import { db, auth } from '../../../firebase'
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";
import { appendprd } from '../../../state/actioncreators';


const UploadProduct = () => {

    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const { loginUser, logoutUser, fbuser, nofbuser } = bindActionCreators(
      actionCreators,
      dispatch
    );

    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [targetPlatform, setTargetPlatform] = useState("");
    const [category, setCategory] = useState("");
    const [period, setPeriod] = useState("");
    const [postType, setPostType] = useState("");
    const [point, setPoint] = useState("");
    const [applicationConditions, setApplicationConditions] = useState("");
    const [qualification, setQualification] = useState("");
    const [isCheck, setIsCheck] = useState("");
    const [detailPage, setDetailPage] = useState("");
    const [offersAndMissions, setOffersAndMissions] = useState("");
    const [photo, setPhoto] = useState("");
    const [mobile, setMobile] = useState("");
    const [uploadedPhoto, setUploadedPhoto] = useState("");
    const navigate = useNavigate();
   

    const [authorEmail, setAuthorEmail] = useState("");
    const [authorUid, setAuthorUid] = useState("");

      useEffect(() => {
        fetching();
      },[state])

    const fetching = async(e) => {
        try{
        await setAuthorUid(state.auth.state.uid)
        .then(setAuthorEmail(state.auth.state.email))
        }catch{
          console.log(e)
        }
      }  

    const addNewPrdChannel = async() => {
        const prdfsid = await addDoc(collection(db, 'prdRoom'),{
            name: {name},
            writer: {authorUid},
            createdAt: serverTimestamp(),
        })
        console.log(prdfsid.id)
    }
    
    const data = {name, brand, targetPlatform, category, period, postType,
        point, applicationConditions, qualification, isCheck,
        detailPage, offersAndMissions, photo, mobile, authorEmail, authorUid}
      
      


    
    AWS.config.update({
        region: 'ap-northeast-2',
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'ap-northeast-2:118bc61e-49a2-424d-a6d7-a98a1f6d4605',
        })
    })

    const handleFileInput = e => {
        var today = new Date(); 
        
        const file = e.target.files[0];

        const upload = new AWS.S3.ManagedUpload({
            params: {
                Bucket: "swaybucket",
                Key: authorUid + today + ".jpg",
                Body: file,
            },
        })
        const promise = upload.promise()

        promise.then(
            function (data) {
                setPhoto(data.Location.toString());
                console.log('checkthephoto: ', data.Location)
                alert("이미지 업로드에 성공했습니다.");
                console.log("data: ", photo, "data type: ", typeof (photo));
            },
            function (err) {    
                return alert("오류가 발생했습니다.", err.message);
            }
        )
    }

    const handlePost = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/products/upload',
                {name, brand, targetPlatform, category, period, postType,
                point, applicationConditions, qualification, isCheck,
                detailPage, offersAndMissions, photo, mobile, authorEmail, authorUid}
            ).then((res) => {
                console.log(res)
                addNewPrdChannel();
                console.log('success')
            })
            console.log(name, brand, targetPlatform, category, period, postType,
                point, applicationConditions, qualification, isCheck,
                detailPage, offersAndMissions, photo, mobile);
        } catch (err) {
            console.log('failed');
            console.log(name, brand, targetPlatform, category, period, postType,
                point, applicationConditions, qualification, isCheck,
                detailPage, offersAndMissions, photo, mobile);
        }
        appendprd(data);
        navigate("/Main");
        
        console.log(state.myprd)
    };

    return (
        <div>
            <div>{authorUid}가 있나?</div>
            <input type="file" id="upload" className='image-upload' onChange={handleFileInput}/>
            <label htmlFor='upload' className='image-upload-wrapper'>여기입니다.</label>
                <img className='profile-img' src={photo} />
            <Form onSubmit={handlePost}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="name"
                        placeholder="ItemName"
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="brand"
                        placeholder="BrandName"
                        onChange={(e) => setBrand(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="platform"
                        placeholder="TargetPlatform"
                        onChange={(e) => setTargetPlatform(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="category"
                        placeholder="Category"
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="period"
                        placeholder="Period"
                        onChange={(e) => setPeriod(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="postType"
                        placeholder="PostType"
                        onChange={(e) => setPostType(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="point"
                        placeholder="Point"
                        onChange={(e) => setPoint(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="applicationConditions"
                        placeholder="ApplicationConditions"
                        onChange={(e) => setApplicationConditions(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="qulification"
                        placeholder="Qualification"
                        onChange={(e) => setQualification(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="isCheck"
                        placeholder="IsCheck?"
                        onChange={(e) => setIsCheck(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="detailPage"
                        placeholder="DetailPage"
                        onChange={(e) => setDetailPage(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="offersAndMissions"
                        placeholder="OffersAndMissions"
                        onChange={(e) => setOffersAndMissions(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="photo"
                        placeholder="photo"
                        value={photo}
                        defaultValue="사진을 선택하세요"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control
                        type="mobile"
                        placeholder="Mobile"
                        onChange={(e) => setMobile(e.target.value)}
                    />
                </Form.Group>
                <div>
                    <Button variant="primary" type="Submit">
                        Upload Please!
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default UploadProduct;