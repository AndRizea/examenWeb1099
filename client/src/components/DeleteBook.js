import bookStore from "./BookStore";
import { useEffect, useState } from "react";
import "primereact/resources/primereact.min.css" 
import "primeicons/primeicons.css"
import { Button } from 'primereact/button';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "primereact/resources/themes/bootstrap4-light-purple/theme.css"
import Axios from "axios"
import { Dropdown } from 'primereact/dropdown';


//const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
const SERVER = "http://localhost:3001"
toast.configure();
var axios = Axios.create();

function DeleteBook(){
    const [books, setBooks]=useState([]);
    const [book, setBook]=useState(0);
    var names=[];
    const [shelves, setShelves]=useState([{}]);
    const [shelfId, setShelfId]=useState(0);

    useEffect(()=>{
        bookStore.getBooks();
        bookStore.emitter.addListener("Books_Fetched", ()=>{
            setBooks(bookStore.data);
            console.log(books)
        })
    }, [])

    books.forEach((s)=>{
        names.push({label:s.title, value:s.id});
    })

    function renderDropdownShelf(){ 
        if(shelves.length<1){ 
            return <Dropdown optionLabel="name" value={null} options={null} onChange={(e) => setShelfId(e.value)} placeholder="Choose a book"/> 
        } 
        else return <Dropdown className='mb-4' value={book} optionLabel="label" optionValue="value" options={names} onChange={(e) => setBook(e.value)} placeholder="Select a book"/> 
    }

    const submit = () =>{
        
           
        var reqBody = { 
            id:book 
          }; 

        const options = { 
            method: "DELETE", 
            body: JSON.stringify(reqBody), 
            headers: new Headers({ 
              "Access-Control-Allow-Origin": "*", 
              "Content-Type": "application/json", 
            }), 
          }; 
        fetch(`${SERVER}/books`, options).then((res)=>{ 
            console.log(book) 
            if(res.status==200) 
            toast.success("The book was deleted!") 
            else toast.err("Something went wrong.") 
            return res; 
        }).catch((res)=>{ 
            toast.err("Something went wrong.") 
        })
        
        }

        return( 
            <div className='mt-4 d-flex align-item-center justify-content-center text-center'>
                <div>
                    <h3>Delete a book</h3>

                {
                    renderDropdownShelf()
                }
    
                <br></br>
                <Button className='pl-5 pr-5' onClick={submit}>DELETE</Button>
                </div>
            </div>
        )
        
    }



export default DeleteBook;