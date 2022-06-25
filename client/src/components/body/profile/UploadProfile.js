import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import axios from "axios";
import { Button } from "react-bootstrap";
import AWS from "aws-sdk";
import Avatar from "@mui/material/Avatar";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../state/index";

const UploadProfile = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { loginUser, logoutUser, fbuser, nofbuser, editInfo } =
    bindActionCreators(actionCreators, dispatch);

  const [uid, setUid] = useState("");
  const [uidforSearch, setUidforSearch] = useState("");
  const [name, setName] = useState(
    state.influencer.state.infloginData.displayName
  );
  const [tags, setTags] = useState(state.influencer.state.infloginData.tags);
  const [age, setAge] = useState(state.influencer.state.infloginData.age);
  const [sex, setSex] = useState(state.influencer.state.infloginData.sex);
  const [date, setDate] = useState(state.influencer.state.infloginData.date);
  const [insta, setInsta] = useState(state.influencer.state.infloginData.insta);
  const [avatar, setAvatar] = useState(
    state.influencer.state.infloginData.avatar
  );
  const [mobile, setMobile] = useState(
    state.influencer.state.infloginData.mobile
  );

  AWS.config.update({
    region: "ap-northeast-2",
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "ap-northeast-2:118bc61e-49a2-424d-a6d7-a98a1f6d4605",
    }),
  });

  const handleFileInput = (e) => {
    const file = e.target.files[0];

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: "swaybucket",
        Key: "USERPRF" + uid + ".jpg",
        Body: file,
      },
    });
    const promise = upload.promise();

    promise.then(
      function (data) {
        setAvatar(data.Location.toString());
        console.log("checkthephoto: ", data.Location);
        alert("이미지 업로드에 성공했습니다.");
        console.log("data: ", avatar, "data type: ", typeof avatar);
      },
      function (err) {
        return alert("오류가 발생했습니다.", err.message);
      }
    );
  };

  const navigate = useNavigate();

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const res = await axios
        .post("http://localhost:1212/user/update", {
          uid,
          name,
          tags,
          age,
          sex,
          date,
          insta,
          mobile,
          avatar,
        })
        .then((res) => {
          console.log("success");
        });
      console.log(uid, name, tags, age, sex, date, insta, mobile, avatar);
    } catch (err) {
      console.log("failed updateProfile");
      console.log(uid, name, tags, age, sex, date, insta, mobile, avatar);
    }
    const userinfo = { uid, name, tags, age, sex, date, insta, mobile, avatar };
    loginUser(userinfo);
    navigate("/Main");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <div>{uid}</div>
        <input
          type="file"
          id="upload"
          className="image-upload"
          onChange={handleFileInput}
        />
        <label htmlFor="upload" className="image-upload-wrapper">
          여기입니다.
        </label>
        <img className="profile-img" src={avatar} />

        <div> 안녕하세요 {state.influencer.state.infloginData.nickname} 님</div>
        <Form onSubmit={handlePost}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="name"
              placeholder={name}
              onChange={(e) => setName(e.target.value)}
              defaultValue={state.influencer.state.infloginData.nickname}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="tags"
              placeholder="choose Tag!"
              onChange={(e) => setTags(e.target.value)}
              defaultValue={state.influencer.state.infloginData.tags}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="age"
              placeholder="how old?"
              onChange={(e) => setAge(e.target.value)}
              defaultValue={state.influencer.state.infloginData.age}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="sex"
              placeholder="male or female"
              onChange={(e) => setSex(e.target.value)}
              defaultValue={state.influencer.state.infloginData.sex}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="today"
              placeholder="date today"
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="InstaId"
              placeholder={state.auth.state.loginData.insta}
              onChange={(e) => setInsta(e.target.value)}
              defaultValue={state.influencer.state.infloginData.insta}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="mobile"
              placeholder="your Mobile Number"
              onChange={(e) => setMobile(e.target.value)}
              defaultValue={state.influencer.state.infloginData.mobile}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control
              type="photo"
              placeholder={state.influencer.state.infloginData.avatar}
              value={avatar}
            />
          </Form.Group>
          <Avatar
            alt="Remy Sharp"
            src={state.influencer.state.infloginData.avatar}
            sx={{ width: 100, height: 100 }}
          />
          <div>
            <Button variant="primary" type="Submit">
              Upload Please!
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UploadProfile;
