import React, { useRef, useEffect, useState } from "react";
function Camera() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto,setHasPhoto]=useState(false);
  
  const getVideo=() =>{
    navigator.mediaDevices.getUserMedia({
        video : { width:256,height:256}
    }).then(stream=>{
        let video =videoRef.current;
        video.srcObject = stream;
        video.play();
    }).catch(err=>{
        console.error(err);
    })
  }

  useEffect(()=>{
    getVideo();
  },[videoRef]);

  const takePhoto=()=>{
    const width= 256;
    const height = 256;

    let video= videoRef.current;
    let photo= photoRef.current;

    photo.width=width;
    photo.height=height;

    let ctx = photo.getContext('2d');
    ctx.drawImage(video,0,0,width,height);

    setHasPhoto(true);
  }

  const closePhoto=()=>{
    let photo= photoRef.current;
    let ctx=photo.getContext('2d');

        ctx.clearRect(0,0,photo.width,photo.height);

    setHasPhoto(false);
    
  }
  function saveCanvasImage(canvasId, filename) {
    const canvas = document.getElementById(canvasId);
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function handleSaveButtonClick(){
    saveCanvasImage('myCanvas', 'myImage.png');
  }

  return (
    <div className="CameraApp">
      <div className="Camera">
        <video ref={videoRef}></video>
        <p><button className='btn' onClick={takePhoto}>Capture</button></p>
      </div>
      <div className={'result' + (hasPhoto ? 'hasPhoto' : '')}>
      <canvas id="myCanvas" ref={photoRef}></canvas>
      <p><button className='btn' onClick={closePhoto}>Re-Capture</button></p>
      <p><button className='btn' onClick={handleSaveButtonClick}>Download</button></p>
      </div>
    </div>
  );
}
export default Camera;
