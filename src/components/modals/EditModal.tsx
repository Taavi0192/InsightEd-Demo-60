// import useCurrentUser from "@/hooks/useCurrentUser";
// import useEditModal from "@/hooks/useEditModal";
// import useUser from "@/hooks/useUser";
// import axios from "axios";
// import { useCallback, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import Modal from "../Modal";
// import Input from "../Input";
// import ImageUpload from "../ImageUpload";

// const EditModal= () =>{
//     const {data: currentUser}= useCurrentUser();
//     const {mutate: mutateFetchedUser} = useUser(currentUser?.id);
//     const editModal= useEditModal();

//     const [profileImage, setProfileImage]= useState('');
//     const [coverImage, setCoverImage]= useState('');
//     const [name, setName]= useState('');
//     const [username, setUsername]= useState('');
//     const [bio, setBio]= useState('');

//     useEffect(()=>{
//         setProfileImage(currentUser?.profileImage);
//         setCoverImage(currentUser?.coverImage);
//         setName(currentUser?.name);
//         setUsername(currentUser?.username);
//         setBio(currentUser?.bio);
//     },[currentUser, currentUser?.profileImage, currentUser?.coverImage, currentUser?.name, currentUser?.username, currentUser?.bio]);

//     const [isLoading, setIsLoading] = useState(false);

//     const onSubmit = useCallback(async()=>{
//         try{
//             setIsLoading(true);
//             await axios.patch('/api/edit',{
//                 name,
//                 username,
//                 bio,
//                 profileImage,
//                 coverImage
//             });
//             mutateFetchedUser();
//             toast.success('Profile updated successfully');
//             editModal.onClose();
//         }catch(error){
//             console.log('error checking in EditModal.tsx');
//             toast.error('Something went wrong');
//         }finally{
//             setIsLoading(false);
//         }
//     },[profileImage, coverImage, name, username, bio, editModal, mutateFetchedUser]);

//     const bodyContent = (
//         <div className="flex flex-col gap-4">
//             <ImageUpload
//                 value= {profileImage}
//                 disabled= {isLoading}
//                 onChange= {(image)=>setProfileImage(image)}
//                 label="Upload Profile Image"
//             />
//             <ImageUpload
//                 value= {coverImage}
//                 disabled= {isLoading}
//                 onChange= {(image)=> setCoverImage(image)}
//                 label="Upload Cover Image"
//             />
//             <Input
//                 placeholder="Name"
//                 onChange={(e)=> setName(e.target.value)}
//                 value={name}
//                 disabled={isLoading}
//             />
//             <Input
//                 placeholder="User name"
//                 onChange={(e)=> setUsername(e.target.value)}
//                 value={username}
//                 disabled={isLoading}
//             />
//             <Input
//                 placeholder="Bio"
//                 onChange={(e)=> setBio(e.target.value)}
//                 value={bio}
//                 disabled={isLoading}
//             />
//         </div>
//     );

//     return(
//         <Modal
//             disabled={isLoading}
//             isOpen={editModal.isOpen}
//             title="Edit your Profile"
//             actionLabel="Save"
//             onClose={editModal.onClose}
//             onSubmit={onSubmit}
//             body={bodyContent}
//         />
//     );
// }

// export default EditModal;


"use client"; // Add this to ensure the component is treated as a Client Component

import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
    const { data: currentUser } = useCurrentUser();
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
    const editModal = useEditModal();

    const [profileImage, setProfileImage] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        setProfileImage(currentUser?.profileImage || '');
        setCoverImage(currentUser?.coverImage || '');
        setName(currentUser?.name || '');
        setUsername(currentUser?.username || '');
        setBio(currentUser?.bio || '');
    }, [currentUser]);

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);
            await axios.patch('/api/edit', {
                name,
                username,
                bio,
                profileImage,
                coverImage,
            });
            mutateFetchedUser();
            toast.success('Profile updated successfully');
            editModal.onClose();
        } catch (error) {
            console.log('Error checking in EditModal.tsx:', error);
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, [profileImage, coverImage, name, username, bio, editModal, mutateFetchedUser]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <ImageUpload
                value={profileImage}
                disabled={isLoading}
                onChange={(image) => setProfileImage(image)}
                label="Upload Profile Image"
            />
            <ImageUpload
                value={coverImage}
                disabled={isLoading}
                onChange={(image) => setCoverImage(image)}
                label="Upload Cover Image"
            />
            <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            <Input
                placeholder="User name"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />
            <Input
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                disabled={isLoading}
            />
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={editModal.isOpen}
            title="Edit your Profile"
            actionLabel="Save"
            onClose={editModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    );
};

export default EditModal;
