import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CameraIcon  } from '@heroicons/react/outline';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import { db, storage } from '../firebase';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { ref, getDownloadURL, uploadString } from '@firebase/storage';
  
export default function Example() {
  const [open, setOpen] = useRecoilState(modalState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const {data : session} = useSession();

  const filePickerRef  = useRef(null);
  const captionRef = useRef(null);
  const cancelButtonRef = useRef(null);

  const uploadPost = async() => {
    if(loading) return;

    setLoading(true);

    //Create a post and add to firestore 'posts' collection
    //get the post id for the newly created post
    //upload the image to the firebase storage with the post id
    //get a download URL from fb storage and update the original post with image
    
    const docRef = await addDoc(collection(db, 'posts'), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp()
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    
    await uploadString(imageRef, selectedFile, "data_url").then(async snapshot => {
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, 'posts', docRef.id), {
        image: downloadURL
      })
    });

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);

  }

  const addImageToPost = (e) => {
    setSelectedFile(null);
    const reader = new FileReader();
    if(e.target.files[0]){
      reader.readAsDataURL(e.target.files[0]);
    };
  
    reader.onloadend = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg top-5 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mx-auto">
                      <h1 className="text-2xl font-bold text-center mb-4 uppercase shadow-inner border-b-2 border-black">Post</h1>
                      {setSelectedFile && (
                        <img src={selectedFile} className="w-full object-cover" alt="" />
                      )}
                      <div onClick={(e)=>filePickerRef.current.click()} className=" cursor-pointer hover:text-white px-4 py-3 rounded-full mx-auto my-2 flex justify-center items-center shadow-sm hover:shadow-inner bg-blue-50 w-fit">
                          <CameraIcon className="text-blue-500 hover:fill-blue-500 h-8 w-8 bg-transparent mx-auto" />
                          <p className="text-blue-500 font-semibold mx-2 "> Upload Post</p>
                      </div>
                  </div>
                  <div className="border rounded-lg shadow-inner my-2">
                    <input type="file" accept="image/*" ref={filePickerRef} hidden onChange={addImageToPost} />
                    <input type="text" ref={captionRef}  placeholder="Upload your caption here..." className="font-semibold focus:outline-none mx-auto my-2 px-4 py-2 text-sm w-full" />
                  </div>
                </div>
                <div className="bg-white px-4 py-3 shadow-inner flex space-x-4 ">
                  <button
                    type="button"
                    disabled={!selectedFile}
                    className="px-4 py-2 rounded-md mx-auto font-bold sm:text-sm flex justify-center items-center shadow-sm border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white bg-blue-50 w-full"
                    onClick={uploadPost}
                  >
                    { loading ? "Uploading..." : "Upload Post"}
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-md mx-auto font-bold sm:text-sm flex justify-center items-center shadow-sm border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-red-50 w-full"
                    onClick={() => selectedFile ? setSelectedFile(null) : setOpen(false)}
                  >
                    {selectedFile ? "Remove" : "Cancel"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>  
        </div>
      </Dialog>
    </Transition.Root>
  )
}
