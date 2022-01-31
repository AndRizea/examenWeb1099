import {Card} from "primereact/card" 
import {useEffect, useState} from "react"
import shelfStore from "./ShelfStore";
import bookStore from "./BookStore"
 
 
function Shelf(props){ 
    var shelf = props.shelf; 
    const [books, setBooks]=useState([]);

    useEffect(()=>{
        bookStore.getBooks();
        bookStore.emitter.addListener("Books_Fetched", ()=>{
            setBooks(bookStore.data);
            console.log(books)
        })
    }, [])


     
    return ( 
        <Card  footer={"Created at: "+shelf.date} className="p-card text-center mb-5 mt-4" 
         style={{"border":"3px","minWidth":"300px","minHeight":"200px","borderRadius":"10px","display":"flex","justifyContent":"center","alignItems":"center"}}> 
       <h5>{shelf.description}</h5> 
       <hr style={{"display":"block","border":"none","height":"3px","backgroundColor":"purple","margin":"0px"}}></hr> 

       {
        books.map((b)=>{
            console.log(b)
            if(b.ShelfId == shelf.id)
            return <p>{b.title}</p>;
        })
       } 
         
        </Card> 
    ) 
} 
 
export default Shelf;