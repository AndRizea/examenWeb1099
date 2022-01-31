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
import Shelf from './Shelf';
import shelfStore from './ShelfStore';
import { Dropdown } from 'primereact/dropdown';


//const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
const SERVER = "http://localhost:3001"
toast.configure();
var axios = Axios.create();

function DeleteShelf(){

    const [shelves, setShelves]=useState([]);
    const [shelf, setShelf]=useState(0);
    var names=[];
    //const [shelves, setShelves]=useState([{}]);
    const [shelfId, setShelfId]=useState(0);

    useEffect(()=>{
        shelfStore.getShelves();
        shelfStore.emitter.addListener("Shelves_fetched", ()=>{
            setShelves(shelfStore.data);
            console.log(shelves)
        })
    }, [])

    shelves.forEach((s)=>{
        names.push({label:s.description, value:s.id});
    })

    function renderDropdownShelf(){ 
        if(shelves.length<1){ 
            return <Dropdown optionLabel="name" value={null} options={null} onChange={(e) => setShelfId(e.value)} placeholder="Choose a shelf"/> 
        } 
        else return <Dropdown className='mb-4' value={shelf} optionLabel="label" optionValue="value" options={names} onChange={(e) => setShelf(e.value)} placeholder="Select a shelf"/> 
    }

    const submit = () =>{
        
        var reqBody = { 
            id:shelf 
          }; 

        const options = { 
            method: "DELETE", 
            body: JSON.stringify(reqBody), 
            headers: new Headers({ 
              "Access-Control-Allow-Origin": "*", 
              "Content-Type": "application/json", 
            }), 
          }; 
        fetch(`${SERVER}/shelves`, options).then((res)=>{ 
            console.log(shelf) 
            if(res.status==200) 
            toast.success("The shelf was deleted!") 
            else toast.err("Something went wrong.") 
            return res; 
        }).catch((res)=>{ 
            toast.err("Something went wrong.") 
        })
        
        
    }

    
    return( 
        <div className='mt-4 d-flex align-item-center justify-content-center text-center'>
            <div>
                <h3>Delete a shelf</h3>
                {
                    renderDropdownShelf()
                }
                <br></br>
            <Button className='pl-5 pr-5' onClick={submit}>DELETE</Button>
            </div>
        </div>
    )
}

export default DeleteShelf