import { useGlobalContext } from '../Context/AuthContext';
import React, { useState } from 'react'
import { MdAttachFile } from "react-icons/md"
import { BsImageFill } from "react-icons/bs"
import { useSelector } from 'react-redux';
import { updateDoc, doc, arrayUnion, Timestamp, serverTimestamp } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { db } from '../Pages/firebase';
import { storage } from '../Pages/firebase';

const Input = () => {

  const [img, setImg] = useState(null);
  const [text, setText] = useState("");
  const [imgPreview, setImgPreview] = useState(null);

  const currentUser = useGlobalContext();
  const { user, chatId } = useSelector((state) => state.chat);

 const handleImgChange = (e) => {
    setImg(e.target.files[0]);
    setImgPreview(URL.createObjectURL(e.target.files[0]));
  }

const handleSend = async () => {
  if (img) {
    console.log("image is present in payload");
    console.log(uuid);
    console.log(img);
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`chatImages/${uuid()}`);
    // Set the content type of the uploaded file to image/jpeg
    const metadata = {
      contentType: 'image/jpeg'
    };
    const uploadTask = fileRef.put(img, metadata);
    console.log("image storage refs done");
   

    uploadTask.on(
      'state_changed',
      null,
      (error) => {
        console.log(error);
         console.log(error.code);
         console.log(error.message);
         console.log(error.serverResponse);
      },
      async () => {
        // Get the avatar download URL
        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
        console.log("got downld url done");

        await updateDoc(doc(db, 'chats', chatId), {
          messages: arrayUnion({
            id: uuid(),//unique id
            text,
            senderId: currentUser?.user.uid,
            date: Timestamp.now(),
            img: downloadURL
          })
        })
        .catch(err => 
          console.log(err.message));
      }
    );
  } else {
    try {
      
      await updateDoc(doc(db, 'chats', chatId), {
        messages: arrayUnion({
          id: uuid(),//unique id
        text,
        senderId: currentUser?.user.uid,
        date: Timestamp.now()
      })
    })
    await updateDoc(doc(db,'userChats',currentUser.user.uid),{
      [chatId+".lastMessage"]:{
        text,
      },
      [chatId+'.date']:serverTimestamp(),//we can use serverTimeStamp here but not in above  
    })
    await updateDoc(doc(db,'userChats',user.uid),{
      [chatId+".lastMessage"]:{
        text,
      },
      [chatId+'.date']:serverTimestamp(),//we can use serverTimeStamp here but not in above  
    })
    
   
  } catch (error) {
    console.log(error);
    
  }
  }
  setText("");
  setImg(null);
  setImgPreview(null);
}
const handleClearInput = () => {
  setImg(null);
  setImgPreview(null);
  setText("");
};



  return (
    <div className='InputContainer'>
      <input type="text" value={text} placeholder='Type Something...' onChange={(e) => setText(e.target.value)} />
      <div className="send">
        <MdAttachFile className='attach' size={25} color="lightgray" />
        <input type="file" style={{ display: "none" }} id="file" onChange={handleImgChange} />
        <label htmlFor='file'>
          <BsImageFill className='select' size={25} color="lightgray" />
        </label>
        {imgPreview && (
          <img src={imgPreview} alt="Selected file preview" />
        )}
        <button className='ClearButton' onClick={handleClearInput}>Clear</button>
        <button className='SendButton' onClick={handleSend}>Send</button>

      </div>
    </div>
  )
}

export default Input