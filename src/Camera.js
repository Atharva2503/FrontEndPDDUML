import React, { useRef, useEffect, useState } from "react";
import axios from 'axios';

function Camera() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [facingMode, setFacingMode] = useState("user");
  const[plantname,setPlantname]= useState(" ");
  const [result,setResult] = useState("")
  const [cnnimg, setImgCNN]=useState("");
  const [imgfile,setImgfile]= useState([]);


  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 256, height: 256, facingMode: facingMode }
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getVideo();
  }, [videoRef, facingMode]);

  const takePhoto = () => {
    const canvas = document.getElementById('myCanvas');
    const width = 256;
    const height = 256;

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    let imageData = ctx.getImageData(0, 0, photo.width, canvas.height);
let pixels = imageData.data;

// Loop through the pixel data and log the values
for (let i = 0; i < pixels.length; i += 4) {
  let red = pixels[i];
  let green = pixels[i + 1];
  let blue = pixels[i + 2];
  let alpha = pixels[i + 3];
  console.log('Pixel ' + i / 4 + ':', red, green, blue, alpha);
}

    setHasPhoto(true);
  };

  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");

    ctx.clearRect(0, 0, photo.width, photo.height);

    setHasPhoto(false);
  };

  const switchCamera = () => {
    if (facingMode === "user") {
      setFacingMode("environment");
    } else {
      setFacingMode("user");
    }
  };

  function saveCanvasImage(canvasId, filename) {
    const canvas = document.getElementById(canvasId);
    console.log(canvasId);
    const dataURL = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleSaveButtonClick() {
    saveCanvasImage("myCanvas", "myImage.jpeg");
    console.log(photoRef);
  }
   

  const  onFileUpload = () => {
    const canvas = document.getElementById('myCanvas');
const imgDataUrl = canvas.toDataURL();

axios.post("http://127.0.0.1:8000/gettomoato/", {
  imagefile: imgDataUrl,
  CNNImg: cnnimg
})
.then(data => {
  alert("The " + plantname + " Plant is " + data.data.result);
  setResult("The " + plantname + " Plant is " + data.data.result);
})
.catch(error => {
  console.error(error);
});
  };
  

  


  return (
    <div className="CameraApp">
      <div className="box">
          <h3>{result}</h3>
      </div>
      <div className="Camera">
        <video ref={videoRef}></video>
        <p>
          <button className="btn" onClick={takePhoto}>
            Capture
          </button></p>
          <p><button className="btn" onClick={switchCamera}>
            Switch Camera
          </button></p>
          </div>
      <div className={'result' + (hasPhoto ? 'hasPhoto' : '')}>
        <form >
          <canvas id="myCanvas" ref={photoRef}></canvas>
          <p><button className='btn' onClick={closePhoto}>Re-Capture</button></p>
          <p><button className='btn' onClick={handleSaveButtonClick}>Download</button></p>
          
          <p><input type="file" id="image" name="image"></input></p>
          <p><button className='btn' type="submit" value="Submit" onClick={()=>{onFileUpload()}}>Submit</button></p>
          {/* <canvas id="myCanvas" width="400" height="400"></canvas> */}
        </form>
        
  
  
  

      </div>
    </div>
  );
}
export default Camera;