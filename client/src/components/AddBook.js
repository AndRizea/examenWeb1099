import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from "react";
import "primereact/resources/primereact.min.css" 
import "primeicons/primeicons.css"
import { Button } from 'primereact/button';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "primereact/resources/themes/bootstrap4-light-purple/theme.css"
import Axios from "axios"
import { Dropdown } from 'primereact/dropdown';
import shelfStore from './ShelfStore';


//const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
const SERVER = "http://localhost:3001"
toast.configure();
var axios = Axios.create();

function AddBook(){

    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [url, setUrl] = useState("");
    const [shelves, setShelves]=useState([{}]);
    const [shelfId, setShelfId]=useState(0);
    var names = [];
    const genres = [
        {label: 'Science Fiction', value: 'SF'},
        {label: 'Romance', value: 'ROMANCE'},
        {label: 'Comedy', value: 'COMEDY'},
        {label: 'Tragedy', value: 'TRAGEDY'},
        {label: 'History', value: 'HISTORY'}
    ];
    const [shelfName, setShelfName]=useState("");

    
    function renderDropdownGenre(){ 
        return <Dropdown className='mb-4' value={genre} optionLabel="label" optionValue="value" options={genres} onChange={(e) => setGenre(e.value)} placeholder="Select a genre"/> 
    }

    useEffect(()=>{
        shelfStore.getShelves();
        shelfStore.emitter.addListener("Shelves_fetched", ()=>{
            setShelves(shelfStore.data);
        })
    }, [])

    shelves.forEach((s)=>{
        names.push({label:s.description, value:s.id});
    })

    function renderDropdownShelf(){ 
        if(shelves.length<1){ 
            return <Dropdown optionLabel="name" value={null} options={null} onChange={(e) => setShelfId(e.value)} placeholder="Choose a shelf"/> 
        } 
        else return <Dropdown className='mb-4' value={shelfId} optionLabel="label" optionValue="value" options={names} onChange={(e) => setShelfId(e.value)} placeholder="Select a shelf"/> 
    }


    const submit = () =>{
        if(title.length <= 5 || genre == undefined || url == undefined)
        toast.error("Check inputs!");
        else{
            
            axios.post(`${SERVER}/books`,{
                headers: new Headers({
                    "Access-Control-Allow-Origin":"*",
                    "Content-Type":"application/json",
                }),
                title: title,
                genre: genre,
                url: url,
                ShelfId:shelfId
            }).then((res)=>{
                if(res.status == 200){
                    toast.success("Book added!")
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
                <h3>Add a book</h3>
            <span className="p-float-label mb-5 mt-5"> 
            <InputText id="in" value={title} onChange={(e) => 
                setTitle(e.target.value)} /> 
            <label htmlFor="in">Title</label> 
            </span>

            <span className="p-float-label mb-5 mt-5"> 
            <InputText id="in" value={url} onChange={(e) => setUrl(e.target.value)} /> 
            <label htmlFor="in">URL</label> 
            </span>

            {
                renderDropdownGenre()
            }

            <br></br>
            {
                renderDropdownShelf()
            }

            <br></br>
            <Button className='pl-5 pr-5' onClick={submit}>ADD</Button>
            </div>
        </div>
    )
}

export default AddBook