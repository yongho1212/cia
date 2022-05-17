
const initialState = {
    myPrd : [
       {
        name:"sham",
        brand:"JM",
        targetPlatform:"blog",
        category:"living",
        period:".",
        postType:".",
        point:".",
        applicationConditions:".",
        qualification:".",
        isCheck:".",
        detailPage:".",
        offersAndMissions:".",
        photo:"https://swaybucket.s3.ap-northeast-2.amazonaws.com/Q0FoyrWtL1aFPu1T9W2...",
        mobile:"0001112222",
        authorUid:"Q0FoyrWtL1aFPu1T9W29zrXs8rC2",
        joinInf:[],
        createdAt:"2022-05-16T07:14:22.744+00:00",
        updatedAt:"2022-05-16T07:14:22.744+00:00",
        }
    ]
    
}

const reducer = ( state = initialState, action) => {
    switch(action.type) {
        case "PREPEND_PRD":
            return { ...state,
                myPrd : action.payload
            }
        case "APPEND_PRD":
            return { ...state,
                myPrd : [...state.myPrd, action.payload]
            }
        default:
            return state;
    }
};

export default reducer;