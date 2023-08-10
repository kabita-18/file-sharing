import File from "../models/file.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import fetch from "node-fetch";
import firebaseConfig from './Firebaseconfig.js'


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const uploadImage = async (request, response) => {
  
  console.log(request.file.path);
  const fileName = request.file.originalname;

  try {
    const storage = getStorage();
    
    const uniqueName = uuidv4();
    const storageRef = ref(storage, uniqueName);

    console.log(storageRef);
    const uploadTask = await uploadBytes(storageRef, request.file.buffer);
    const path = await getDownloadURL(uploadTask.ref);
    console.log(path, uploadTask);
    const fileObj = {
      path: path,
      name: fileName,
    };
    const file = await File.create(fileObj);
    response
      .status(200)
      .json({ path: `http://localhost:8000/file/${file._id}` });
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: error.message });
  }
};
export const downloadImage = async (request, response) => {
  try {
    const file = await File.findById(request.params.fileId);

    file.downloadContent++;

    await file.save();
    response.setHeader(
      "Content-Disposition",
      `attachment; filename=${file.name}`
    );
    const firebaseResponse = await fetch(file.path);
    const fileStream = firebaseResponse.body;
    fileStream.pipe(response);
  } catch (error) {
    console.error(error.message);

    return response.status(500).json({ error: error.message });
  }
};
