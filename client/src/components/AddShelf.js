import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from "react";
import "primereact/resources/primereact.min.css" 
import "primeicons/primeicons.css"
import { Button } from 'primereact/button';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "primereact/resources/themes/bootstrap4-light-purple/theme.css"
import Axios from "axios";
import { Calendar } from 'primereact/calendar';


//const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
const SERVER = "http://localhost:3001"
toast.configure();
var axios = Axios.create();

function AddShelf(){

    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");


    const submit = () =>{
        if(description.length <= 3)
        toast.error("Check inputs!");
        else{
            
            axios.post(`${SERVER}/shelves`,{
                headers: new Headers({
                    "Access-Control-Allow-Origin":"*",
                    "Content-Type":"application/json",
                }),
                description: description,
                date: date
            }).then((res)=>{
                if(res.status == 200){
                    toast.success("Shelf added!")
                }
                else{
                    toast.error("Something went wrong");
                }
            }).catch((res)=>{
                toast.error("Something went wrong");
            })
        }
        
    }

    
    return( 
        <div className='mt-4 d-flex align-item-center justify-content-center text-center'>
            <div>
                <h3>Add a shelf</h3>
            <span className="p-float-label mb-5 mt-5"> 
            <InputText id="in" value={description} onChange={(e) => 
                setDescription(e.target.value)} /> 
            <label htmlFor="in">Description</label> 
            </span>

            <span className="p-float-label mb-5 mt-5"> 
            <Calendar id="in" value={date} onChange={(e) => setDate(e.target.value)} /> 
            <label htmlFor="in">Date</label> 
            </span>

            
            <br></br>
            <Button className='pl-5 pr-5' onClick={submit}>ADD</Button>
            </div>
        </div>
    )
}

export default AddShelf