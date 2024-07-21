

import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import {v4 } from 'uuid'
export default async function imageUpload(uri) {
    const response = await fetch(uri)
    const blob = await response.blob()
    
    const storageRef = ref(storage,`images/${v4()}` )
    const snapshot = await uploadBytes(storageRef, blob)
    const url =  await getDownloadURL(snapshot.ref)
    return url
}