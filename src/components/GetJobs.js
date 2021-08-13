import React,{useEffect,useState} from 'react';
import { useQuery,gql, useSubscription } from '@apollo/client';
import {LOAD_COMMENT} from '../graphql/queries'
import { ListGroup} from 'react-bootstrap';
const GetJobs = () => {

    const {data}= useQuery(LOAD_COMMENT);

    const [Jobs,setJobs] = useState([]);


    useEffect(() =>{
        if(data){
        setJobs(data.Jobs)
        
    }
    },[data])

    return (
        <div>
           {Jobs.map((item) =>{
              return(
                  <div key={item.id}>
                 <ListGroup horizontal style={{margin:5}}>
                 <ListGroup.Item style={{width:100,marginRight:10}}>{item.job}</ListGroup.Item>
                 <ListGroup.Item  style={{width:200,marginRight:10}}>{item.name} </ListGroup.Item>
                 <ListGroup.Item  style={{width:200,marginRight:10}}>{item.age}</ListGroup.Item>
                 <ListGroup.Item  style={{width:200,marginRight:10}}>{item.id}</ListGroup.Item>
                
                 
                 </ListGroup>
                
                
                  
                 
                  </div>
                  )
           })}
  
        </div>
    );
};

export default GetJobs;