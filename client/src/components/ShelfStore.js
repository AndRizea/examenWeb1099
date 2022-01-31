import { EventEmitter }  from 'fbemitter';
//const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
const SERVER = "http://localhost:3001"

class ShelfStore{
    constructor(){
        this.data = [{}];
        this.emitter = new EventEmitter();
    }

    async getShelves(){
        try{
            const response = await fetch(`${SERVER}/shelves`);
            this.data = await response.json();
            this.emitter.emit("Shelves_fetched");
            console.log("fetched shelves")
        }
       catch(err){
           console.warn(err);
           this.emitter.emit("Shelves_fetched_failed");
       }
    }

    async getBooks(id){
        try{
        const response = await fetch(`${SERVER}/shelves/id/${id}`);
        this.data = await response.json();
        console.log(response)
        this.emitter.emit("Shelves_Book_Fetched");
        
    } catch(err){
        console.warn(err);
        this.emitter.emit("Shelves_Book_Failed");
    }

    }
}

const shelfStore = new ShelfStore();
export default shelfStore;