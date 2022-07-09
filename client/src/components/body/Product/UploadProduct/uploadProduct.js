import React from "react";
import { Form } from "react-bootstrap";
import "./uploadProduct.css";
import { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AWS from "aws-sdk";
import {
  addDoc,
  setDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";
import { db, auth } from "../../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../state/index";
import { appendprd } from "../../../../state/actioncreators";
import { async } from "@firebase/util";

const UploadProduct = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { loginUser, logoutUser, fbuser, nofbuser, appendprd } =
    bindActionCreators(actionCreators, dispatch);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState(
    state.advertiser.state.adloginData.brand_name
  );
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
  const [subimage, setSubimage] = useState([]);
  const [mobile, setMobile] = useState("");

  const navigate = useNavigate();
  const authorUid = state.advertiser.state.adloginData.uid;
  const authorEmail = state.advertiser.state.adloginData.email;

  const addNewPrdChannel = async () => {
    const prdfsid = await addDoc(collection(db, "prdRoom"), {
      name: { name },
      writer: { authorUid },
      createdAt: serverTimestamp(),
    });
    const fff = prdfsid.id;
    return fff;
  };

  AWS.config.update({
    region: "ap-northeast-2",
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:118bc61e-49a2-424d-a6d7-a98a1f6d4605",
    }),
  });

  const handleFileInput = (e) => {
    var today = new Date();
    const file = e.target.files[0];
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "swaybucket",
        Key: authorUid + today + ".jpg",
        Body: file,
      },
    });

    const promise = upload.promise();
    promise.then(
      function (data) {
        setPhoto(data.Location.toString());
        console.log("checkthephoto: ", data.Location);
        alert("이미지 업로드에 성공했습니다.");
        console.log("data: ", photo, "data type: ", typeof photo);
      },
      function (err) {
        return alert("오류가 발생했습니다.", err.message);
      }
    );
  };

  const handleSubFileInput = async (e) => {
    var today = new Date();
    const selected = e.target.files;
    console.log(selected)
    const urlList = [...subimage];
    

    for (let i = 0; i < selected.length; i++) {
        var file = selected[i];
        var fileName = file.name;

        const upload = new AWS.S3.ManagedUpload({
            params: {
                Bucket: "swaybucket",
                Key: fileName + today + ".jpg",
                Body: selected[i],
            },
        });

        const data = await upload.promise();

        urlList.push(data.Location);
        console.log(urlList);
      



    //   promise.then(
    //     function (data) {
    //       console.log(data.Location);
    //       urlList.push(data.Location);
    //       console.log(urlList);
    //       console.log("checkthephoto: ", data.Location);
    //       // uploaded.push(data.Location)
    //       alert("이미지 업로드에 성공했습니다.");
    //       console.log("data: ", urlList[i], "data type: ", typeof urlList[i]);
    //     },
    //     function (err) {
    //       return alert("오류가 발생했습니다.", err.message);
    //     }
    //   );
    }
    
    //이게 무조건 루프문 끝나고 돌아야하는데 왜 쳐 먼저 도
    setSubimage(urlList);
    console.log(subimage);
    console.log(subimage[0]);
  };

  const handleDeleteImage = (id) => {
    setSubimage(subimage.filter((_, index) => index !== id));
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const qqq = await addNewPrdChannel();
    const prdfsidDb = qqq;
    const uid = authorUid;
    const progress_prd = qqq;
    try {
      console.log(qqq);
      const res = await axios
        .post("products/upload", {
          name,
          brand,
          targetPlatform,
          category,
          period,
          postType,
          point,
          applicationConditions,
          qualification,
          isCheck,
          detailPage,
          offersAndMissions,
          photo,
          mobile,
          authorEmail,
          authorUid,
          prdfsidDb,
        })
        .then((res) => {
          console.log(res.data);
          console.log("success");
        });
      const resprdad = await axios
        .post("http://localhost:1212/ad/ad_add_prd", { uid, progress_prd })
        .then((resprdad) => {
          console.log("success");
          console.log(resprdad.data);
        });
      console.log(
        name,
        brand,
        targetPlatform,
        category,
        period,
        postType,
        point,
        applicationConditions,
        qualification,
        isCheck,
        detailPage,
        offersAndMissions,
        photo,
        mobile,
        authorEmail,
        authorUid,
        prdfsidDb
      );
    } catch (err) {
      console.log(err);
      console.log("failed");
      console.log(
        name,
        brand,
        targetPlatform,
        category,
        period,
        postType,
        point,
        applicationConditions,
        qualification,
        isCheck,
        detailPage,
        offersAndMissions,
        photo,
        mobile,
        authorUid,
        authorEmail,
        prdfsidDb
      );
      throw new Error("Something bad happened");
    }
    const data = {
      name,
      brand,
      targetPlatform,
      category,
      period,
      postType,
      point,
      applicationConditions,
      qualification,
      isCheck,
      detailPage,
      offersAndMissions,
      photo,
      mobile,
      authorEmail,
      authorUid,
      prdfsidDb,
    };
    appendprd(data);
    console.log(state.myprd);
    navigate("/Dashmain");
    console.log(state.myprd);
    alert("상품 업로드 완료");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginInline: "10vw",
        height: "100vh",
        width: "80vw",
        marginTop: "39px",
      }}
    >
      <div
        className="imageContainer"
        style={{
          backgroundColor: "skyblue",
          width: "40vw",
        }}
      >
        <div
          className="mainInamge"
          style={{
            width: "25vw",
            height: "25vw",
            backgroundColor: "green",
          }}
        >
          <label
            htmlFor="upload"
            className="image-upload-wrapper"
            onChange={handleFileInput}
          >
            <img
              className="profile-img"
              src={photo}
              style={{ width: "25vw", height: "25vw" }}
            />
            <input
              type="file"
              id="upload"
              className="image-upload"
              // onChange={handleFileInput}
              style={{
                opacity: 0,
              }}
            />
          </label>
        </div>
        <div
          className="subImageContainer"
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <div style={{}}>
            <label htmlFor="input-file" onChange={handleSubFileInput}>
              <input
                type="file"
                id="input-file"
                multiple
                style={{
                  opacity: 0,
                }}
              />
              
              <span>사진추가</span>
            </label>
            <img 
                src={subimage[0]} 
                
                style={{width:'10vw'}}
                />
                <img 
                src={subimage[1]} 
                
                style={{width:'10vw'}}
                />
            {subimage.map((image, id) => (
              <div  key={id}>
                <img 
                src={image} 
                alt={`${image}-${id}`} 
                style={{width:'10vw'}}
                />
                <Button onClick={() => handleDeleteImage(id)} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Form onSubmit={handlePost} id="prdform">
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
            placeholder={brand}
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
        {/* <div>
                    <Button variant="primary" type="Submit">
                        Upload Please!
                    </Button>
                </div> */}
      </Form>
    </div>
  );
};

export default UploadProduct;
