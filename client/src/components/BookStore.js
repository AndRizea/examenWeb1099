import { EventEmitter }  from 'fbemitter';
//const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
const SERVER = "http://localhost:3001"

class BookStore{
    constructor(){
        this.data = [{}];
        this.emitter = new EventEmitter();
    }

    async getBooks(){
        try{
            const response = await fetch(`${SERVER}/books`);
            this.data = await response.json();
            this.emitter.emit("Books_Fetched");
        }
       catch(err){
           console.warn(err);
           this.emitter.emit("Books_fetched_failed");
       }
    }
}

const bookStore = new BookStore();
export default bookStore;