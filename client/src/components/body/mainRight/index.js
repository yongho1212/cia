import React, {useEffect, useState} from 'react'
import { Button } from '@mui/material';
import axios from 'axios'

const  MainRight = () => {
  

  


  const [product, setProduct] = useState();

  
  const products = 
  [{
    "_id": "6254240b4ab0ad73ee26bfa8",
    "name": "김국환",
    "brand": "대한민국",
    "targetPlatform": "네이버",
    "category": "인간",
    "period": "5년",
    "postType": "대충",
    "point": "1",
    "applicationConditions": "없음",
    "qualification": "없음",
    "isCheck": "안함",
    "detailPage": "아직없음",
    "offersAndMissions": "사진올리기",
    "photo": "웃짤",
    "mobile": "000",
    "createdAt": "2022-04-11T12:50:19.899Z",
    "updatedAt": "2022-04-11T12:50:19.899Z",
    "__v": 0
  }, {
    "_id": "625429024ab0ad73ee26bfaa",
    "name": "11",
    "brand": "1",
    "targetPlatform": "1",
    "category": "1",
    "period": "1",
    "postType": "1",
    "point": "1",
    "applicationConditions": "1",
    "qualification": "1",
    "isCheck": "1",
    "detailPage": "1",
    "offersAndMissions": "11",
    "photo": "1",
    "mobile": "1",
    "createdAt": "2022-04-11T13:11:30.474Z",
    "updatedAt": "2022-04-11T13:11:30.474Z",
    "__v": 0
  }, {
    "_id": "625429b84ab0ad73ee26bfac",
    "name": "2",
    "brand": "2",
    "targetPlatform": "2",
    "category": "2",
    "period": "2",
    "postType": "2",
    "point": "2",
    "applicationConditions": "2",
    "qualification": "2",
    "isCheck": "2",
    "detailPage": "2",
    "offersAndMissions": "2",
    "photo": "2",
    "mobile": "2",
    "createdAt": "2022-04-11T13:14:32.387Z",
    "updatedAt": "2022-04-11T13:14:32.387Z",
    "__v": 0
  }]

  const getPostList = async () => {
    try {
       const res = await axios.post('http://localhost:1212/products/getlist')
       .then((res) => { 
        console.log(res.data);

        setProduct(res.data);
        return 0;
      })

    } 
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getPostList();
  }, []);

  return (
    <div className="main_Right_chan" style={{display: 'flex', flexWrap: 'wrap'}}>
      {product ? product.map(item => {
        return (
          <div style={{ margin: '20px'}}>
            <Button style={{ color: 'black', display: 'flex', flexDirection: 'column', width: '200px', height: '280px', alignItems: 'flex-start' }}>
              <div style={{ width: '200px', height: '200px', backgroundColor: 'red' }}>
                여기에 사진 들어올 예정 
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '20px' }}>
                  <div>
                    {item.brand}
                  </div>
                </div>
                <div style={{ fontSize: '20px' }}>
                  {item.name}
                </div>
              </div>
              <div style={{ fontSize: '14px' }}>
                {item.point}
              </div>
            </Button>
          </div>
        )
      }) : ''}
    </div> 
  );
};



export default MainRight;
