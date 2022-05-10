import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from 'axios';

const SearchResult = () => {
    const [influencer, setInfluencer] = useState([]);
    const { text } = useParams();


    const getSearchList = async () => {
        try {
           const res = await axios.post('http://localhost:1212/user/getlist')
           .then((res) => {
            console.log('now serving');
            console.log(res.data)
            setInfluencer(res.data); 
            return 0;
          })
    
        } 
        catch (err) {
          console.log(err)
        }
      }

    const item = influencer.filter(e => !e.displayName.indexOf(text));
    console.log(item)

    useEffect(() => {
        getSearchList();
        }, []);

    return (
        <div>
            {item ?
            <div>
                <div>
                    {text}
                </div>
                <div>{item.length}</div>
                {item.map((source) => {
                    return [
                        <div key={source.uid}>
                            <div>
                                {source.displayName}
                            </div>
                            <div>
                                {source.role}
                            </div>
                        </div>
                    ];
                    
                })}
                
            </div> : <div>실패</div>}
            
        </div>
    )
}

export default SearchResult;
