import {useRef , useState, useEffect} from 'react'
import './App.css';
import { uploadFile } from './services/api';

function App() {

  const [file, setfile]= useState('');
  const [result, setResult] = useState('');

  const fileInputRef = useRef();

  const logo = "https://i.pinimg.com/originals/16/46/24/1646243661201a0892cc4b1a64fcbacf.jpg";

  useEffect (()=> {
    const getImage = async() =>{
      if(file){
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        try {
          let response = await uploadFile(data);
          setResult(response.path);
        } catch (error) {
          console.error("Error while uploading:", error.message);
          // setResult("Upload failed"); // Update the result state if there's an error
        }
      }
    }
    getImage();
  }, [file])

  function onUpload(){
    fileInputRef.current.click();
  }
  return (
    <div className='container'>
      <img src={logo} alt ="banner"/>
      <div className='wrapper'>
        <h1> File Sharing Application</h1>
        <p>Upload and share the download link</p>

        <button onClick={() => onUpload()}>Upload file</button>
        <input type ="file"
        ref={fileInputRef}
        style={{display: 'none'}}
        onChange={(e)=> setfile(e.target.files[0])}
        />

        <a href={result} target = "_blank">{result}</a>
      </div>
    </div>
    
  );
}

export default App;
