import React,{useState} from 'react';
import { useMutation } from "@apollo/client";
import {CREATE_JOBS} from "../graphql/mutation";
import { ListGroup,Button} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import GetJobs from './GetJobs';


const Form = () => {
    const[age,setAge] = useState("");
    const[job,setJob] = useState("");
    const[name,setName] = useState("");
    

    const[insertJob] = useMutation(CREATE_JOBS)

    const createJob=()=>{
        insertJob({
            variables:{
                age:age,
                job:job,
                name:name
                
            }
        })
    }
    
    return (
        <div>
                <ListGroup  style={{margin:5}}>
                 <ListGroup.Item style={{marginRight:10}}><input  placeholder="Age" type="text" onChange={(e) => setAge(e.target.value)}/></ListGroup.Item>
                 <ListGroup.Item style={{marginRight:10}}><input  placeholder="Name" type="text" onChange={(e) => setName(e.target.value)}/></ListGroup.Item>
                 <ListGroup.Item style={{marginRight:10}}><input  placeholder="Job" type="text" onChange={(e) => setJob(e.target.value)}/></ListGroup.Item>


                 <ListGroup.Item style={{marginRight:10}}>  <Button onClick={createJob} variant="primary" block>Gönder</Button></ListGroup.Item>
                 
                 
                 </ListGroup> 
                
                 
               
            
              
        </div>
    );
};

export default Form;