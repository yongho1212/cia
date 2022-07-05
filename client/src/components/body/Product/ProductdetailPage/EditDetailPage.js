import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Alert, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../state/index";
import {
  doc,
  deleteDoc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../../../firebase";
import { useNavigate } from "react-router-dom";
import { reload } from "@firebase/auth";
import { async } from "@firebase/util";

const EditDetailpage = () => {
  const [product, setProduct] = useState([]); // 제품 정보
  const [applicant, setApplicant] = useState([]); // 지원자 목록
  const [infinfo, setInfinfo] = useState([]);
  const { id } = useParams();
  const [prdfsid, setPrdfsid] = useState("");
  const [prdname, setPrdname] = useState("");
  const prdidd = id;
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { loginUser, logoutUser, fbuser, nofbuser, adaddchannel } =
    bindActionCreators(actionCreators, dispatch);
  const navigate = useNavigate();

  const uid = state.auth.state.loginData.uid;

  console.log(applicant);

  const onAcceptHandle = async (applicant_id) => {
    try {
      console.log("accept try");
      const res = await axios
        .post("http://localhost:1212/products/acceptApplicant", {
          applicant_id,
          id,
        })
        .then((res) => {
          console.log("Accept Success!");
        });
    } catch (err) {
      console.log("Accept failed");
      console.log(applicant);
      throw new Error("Something bad happened");
    }
  };

  const onDeclineHandle = async (applicant_id) => {
    try {
      console.log("Decline try");
      const res = await axios
        .post("http://localhost:1212/products/declineApplicant", {
          applicant_id,
          id,
        })
        .then((res) => {
          console.log("Decline Success!");
        });
    } catch (err) {
      console.log("Decline failed");
      console.log(applicant);
    }
  };

  const removeItem = (applicant_id) => {
    setApplicant((applicant) =>
      applicant.filter((applicant) => {
        return applicant.applicant_id !== `${applicant_id}`;
      })
    );
  };

  const addNewInf = async (applicant_id) => {
    const docRef = await collection(db, `prdRoom/${prdfsid}/inflist/`);
    const newChannel = await addDoc(docRef, {
      name: { applicant_id },
      Aduid: { uid },
      Infuid: { applicant_id },
      createdAt: serverTimestamp(),
    });

    console.log(newChannel.id);
    const joined_channel = newChannel.id;
    const progress_prd = prdfsid;
    const aduid = uid;
    const infuid = applicant_id;
    const channelid = joined_channel;
    try {
      const resprdinf = await axios
        .post("http://localhost:1212/inf/inf_add_prd", {
          applicant_id,
          progress_prd,
        })
        .then((resprdinf) => {
          console.log("success");
          console.log(resprdinf.data);
        });
      const resad = await axios
        .post("http://localhost:1212/ad/ad_add_channel", {
          uid,
          joined_channel,
        })
        .then((resad) => {
          console.log("success");
          console.log(resad.data);
        });
      const resinf = await axios
        .post("http://localhost:1212/inf/inf_add_channel", {
          applicant_id,
          joined_channel,
        })
        .then((resinf) => {
          console.log("success");
          console.log(resinf.data);
        });
      const chdb = await axios
        .post("http://localhost:1212/chat/addchat", {
          aduid,
          infuid,
          prdname,
          prdfsid,
          channelid,
        })
        .then((chdb) => {
          console.log("success");
          console.log(chdb.data);
        });
      console.log(uid, joined_channel);
    } catch (err) {
      console.log(err);
      console.log("failed updateProfile");
      console.log(uid, joined_channel);
      throw new Error("Something bad happened");
    }
    adaddchannel(joined_channel);
  };

  //거절 버튼

  const rejectInf = async (applicant_id) => {
    const denied_prd = prdfsid;

    try {
      const resprdinf = await axios
        .post("http://localhost:1212/inf/inf_reject_prd", {
          applicant_id,
          denied_prd,
        })
        .then((resprdinf) => {
          console.log("success");
          console.log(resprdinf.data);
        });
    } catch (err) {
      console.log(err);
      console.log("failed reject");
      throw new Error("Something bad happened");
    }
  };

  // 상품 삭제 하기
  const deletePrd = async () => {
    if (window.confirm("정말 삭제하시겠습니다?")) {
      const prdfsidDb = prdfsid;

      await deleteDoc(doc(db, "prdRoom", `${prdfsidDb}`));

      try {
        const delPrd = await axios
          .post("http://localhost:1212/products/deleteProduct", { prdfsidDb })
          .then((dltres) => {
            console.log("delete success");
            console.log(dltres.data);
          });
      } catch (err) {
        console.log(err);
        console.log("failed delte");
        throw new Error("Something bad happened");
      }
      alert("삭제완료!");
      navigate("/Main");
    } else {
      alert("취소");
    }
  };


  const getPostList = async (applicant_id) => {
    try {
      const res = await axios
        .post("http://localhost:1212/products/getprdinfo", { id })
        .then((res) => {
          console.log(res.data);
          const prdinfo = res.data;
          const list = prdinfo.applicant;
          const fsdb = prdinfo.prdfsidDb;
          const namae = prdinfo.name;
          setProduct(prdinfo);
          setApplicant(list);
          setPrdfsid(fsdb);
          setPrdname(namae);
        });
    } catch (err) {
      console.log(err);
    }
  };


  // 물어보기

const posts = applicant.map(applicant_id => {
  return axios
    .get("http://localhost:1212/inf/getInfInfo", { params: { uid: applicant_id }})
    .then((res) => {
        console.log(res.data)
        // setInfinfo(res.data)
        console.log(infinfo)
    })
    .catch(e => console.error(e));
})

const roundarr = async() => {
    Promise.all(posts).then(res => setInfinfo(res.data));
    console.log(infinfo);
}



  
  const item = product;


  useEffect(() => {
    getPostList();
    roundarr();
  }, []);

  useEffect(() => {
    console.log(applicant);
  }, [applicant, setApplicant, removeItem]);

  console.log(applicant.length);


  return (
    <div style={{ width: "60vw", marginInline: "20vw", marginTop: "5vh" }}>
      <div>{uid}</div>
      {item ? (
        <div>
          <div className="prdinfocontainer" style={{ display: "flex" }}>
            <div>
              <img src={item.photo} width="300" height="400" alt="testA" />
            </div>

            <div
              className="prdinfotext"
              style={{ fontSize: 20, marginLeft: "30px" }}
            >
              <div>item id</div>
              <div>{item._id}</div>

              <div>상품명 {item.name}</div>
              <div>브랜드 {item.brand}</div>
              <div>카테고리 {item.category}</div>
              <div>{item.mobile}</div>
              <div>{item.isCheck}</div>
              <div>타겟 플랫폼{item.targetPlatform}</div>
            </div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <dix style={{ width: "100%" }}>신청자 목록</dix>
            {applicant.length !== 0 ? (
              applicant.map((applicant_id) => {
                return (
                  <div key={applicant_id} style={{justifyContent:'center', alignItems:'center', display:'flex'}}>
                    <div>{applicant_id}</div>
                    <Button
                      className="accept"
                      onClick={(e) => {
                        e.preventDefault();
                        onAcceptHandle(applicant_id);
                        addNewInf(applicant_id);
                        removeItem(applicant_id);
                        window.location.reload();
                      }}
                    >
                      ✔️
                    </Button>
                    <Button
                      className="decline"
                      onClick={(e) => {
                        e.preventDefault();
                        onDeclineHandle(applicant_id);
                        rejectInf(applicant_id);
                        removeItem(applicant_id);
                        window.location.reload();
                      }}
                    >
                      ✕
                    </Button>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  width: "100%",
                  backgroundColor: "grey",
                  height: "10vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 15
                }}
              >
                아직 신청자가 없습니다.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>실패입니다</div>
      )}
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          marginTop: "20px",
        }}
      >
        <Button onClick={() => deletePrd()} color="error" variant="outlined">
          상품 삭제하기
        </Button>
      </div>
    </div>
  );
};

export default EditDetailpage;
