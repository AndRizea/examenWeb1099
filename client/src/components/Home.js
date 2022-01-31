import {useEffect, useState} from "react"
import shelfStore from "./ShelfStore"
import Shelf from "./Shelf"
import Axios from 'axios'
import { Button } from 'primereact/button';

function Home(){

    const axios = Axios.create();
    const [shelves, setShelves]=useState([]);

    useEffect(()=>{
        shelfStore.getShelves();
        shelfStore.emitter.addListener("Shelves_fetched", ()=>{
            setShelves(shelfStore.data);
        })
    }, [])


    return (
        <div className="d-flex justify-content-center">
            <div>
                <h2 className="text-center">Shelves</h2>
            {
                shelves.map((s)=>{
                    return (
                        <Shelf key={s.id} shelf={s}></Shelf>
                    )
                })
            }
            </div>

            
        </div>
    )
}

export default Home;