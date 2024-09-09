import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import { storage } from '../../../firebase';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 } from 'uuid';


// import { use } from '../../../../../Api/routes/biodata';

const MySwal = withReactContent(Swal);

export default function Biodata() {
    const [biodataList, setBiodataList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [imageUpload, setImageUpload] = useState(null);
    const setImageList = useState([]);
    const [imgSrc, setImgSrc] = useState(''); // Add state for imgSrc

    useEffect(() => {
        fetchBiodataList();
        listAll(imageListRef).then((res) => {
            res.items.forEach((itemRef) => {
                getDownloadURL(itemRef).then((url) => {
                    setImageList((prevState) => [...prevState, url]);
                });
            });
        });
    }, []);

    const imageListRef = ref(storage, 'images/');

    const fetchBiodataList = async () => {
        try {
            const response = await fetch('http://localhost:3000/biodata/showdata');
            const data = await response.json();
            const biodataWithImages = await Promise.all(data.map(async (biodata) => {
                if (biodata.imgSrc) {
                    const imgRef = ref(storage, biodata.imgSrc);
                    const imgUrl = await getDownloadURL(imgRef);
                    return { ...biodata, imgSrc: imgUrl };
                }
                return biodata;
            }));

            setBiodataList(biodataWithImages);
        } catch (error) {
            console.error('Failed to fetch biodata:', error);
        }
    };

    const handleEdit = async (id) => {
        const biodataToEdit = biodataList.find(biodata => biodata.id === id);
        if (!biodataToEdit) {
            return;
        }
    
        const formattedBirthdate = new Date(biodataToEdit.birthdate).toISOString().split('T')[0];

        const { value: formValues } = await MySwal.fire({
            title: 'Edit Biodata',
            html: `
            <style>
            /* Ensure the dialog expands to full viewport width */
            .swal2-popup {
            width: 80vw !important;
                max-width: 80vw !important;
                padding: 0 !important;
            }

            .swal2-content {
                width: 100%;
                max-width: 100%;
            }

            .swal2-html-container {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 65vh;
                overflow-y: auto;
            }

            .w-screen {
                width: 80vw;
            }

            .max-w-screen-sm {
                max-width: 80vw; /* Adjust the max-width as needed */
            }

            .custom-modal .modal-dialog {
                width: 80vw !important;
                max-width: 80vw !important;
                margin: auto;
            }

            .custom-modal .modal-content {
                height: 65vh !important;
                overflow-y: auto !important;
            }

            .custom-modal .modal {
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
            }

            /* Custom button alignment */
             .swal2-actions {
            display: flex;
            justify-content: space-between; /* Adjust alignment */
            }
            </style>

            <div class="w-screen max-w-screen-lg mx-auto p-4 overflow-hidden">
            <form class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <!-- User ID -->
                <div class="flex flex-col">
                <input id="swal-input1" class="p-2 border border-gray-300 rounded mb-4 w-full" placeholder="User ID" value="${biodataToEdit.userId}">
                </div>

                <!-- Name with Initials -->
                <div class="flex flex-col">
                <input id="swal-input2" class="p-2 border border-gray-300 rounded mb-4 w-full" placeholder="Name with Initials" value="${biodataToEdit.nameWini}">
                </div>

                <!-- Full Name -->
                <div class="flex flex-col">
                <input id="swal-input3" class="p-2 border border-gray-300 rounded mb-4 w-full" placeholder="Full Name" value="${biodataToEdit.nameWFull}">
                </div>

                <!-- Birthdate -->
                <div class="flex flex-col">
                <input id="swal-input4" class="p-2 border border-gray-300 rounded mb-4 w-full" placeholder="Birthdate" type="date" value="${formattedBirthdate}">
                </div>

                <!-- Role Selection -->
                <div class="flex flex-col">
                <select id="swal-input5" class="p-2 border border-gray-300 rounded mb-4 w-full">
                    <option value="" ${!biodataToEdit.roleName && 'selected'}>Select Role</option>
                    <option value="Admin" ${biodataToEdit.roleName === 'Admin' ? 'selected' : ''}>Admin</option>
                    <option value="Finance Manager" ${biodataToEdit.roleName === 'Finance Manager' ? 'selected' : ''}>Finance Manager</option>
                    <option value="Sales Manager" ${biodataToEdit.roleName === 'Sales Manager' ? 'selected' : ''}>Sales Manager</option>
                    <option value="HR Manager" ${biodataToEdit.roleName === 'HR Manager' ? 'selected' : ''}>HR Manager</option>
                    <option value="Inventory Manager" ${biodataToEdit.roleName === 'Inventory Manager' ? 'selected' : ''}>Inventory Manager</option>
                    <option value="Employee" ${biodataToEdit.roleName === 'Employee' ? 'selected' : ''}>Employee</option>
                </select>
                </div>

                <!-- Gender Selection -->
                <div class="flex flex-col">
                <div class="flex items-center space-x-4">
                    <label class="flex items-center">
                    <input type="radio" name="gender" value="Male" ${biodataToEdit.gender === 'Male' && 'checked'} class="mr-2"> Male
                    </label>
                    <label class="flex items-center">
                    <input type="radio" name="gender" value="Female" ${biodataToEdit.gender === 'Female' && 'checked'} class="mr-2"> Female
                    </label>
                </div>
                </div>

                <!-- Address -->
                <div class="flex flex-col col-span-3">
                <input id="swal-input7" class="p-2 border border-gray-300 rounded mb-4 w-full" placeholder="Address" value="${biodataToEdit.address}">
                </div>

                <!-- Email -->
                <div class="flex flex-col">
                <input id="swal-input8" class="p-2 border border-gray-300 rounded mb-4 w-full" placeholder="Email" value="${biodataToEdit.email}">
                </div>

                <!-- Phone Number -->
                <div class="flex flex-col">
                <input id="swal-input9" class="p-2 border border-gray-300 rounded mb-4 w-full" placeholder="Phone Number" value="${biodataToEdit.phoneNumber}">
                </div>

                <!-- Bank Number -->
                <div class="flex flex-col">
                <input id="swal-input10" class="p-2 border border-gray-300 rounded mb-4 w-full" placeholder="Bank Number" value="${biodataToEdit.bankNumber}">
                </div>

                <!-- File Upload -->
                <div class="flex flex-col col-span-3">
                <input type="file" class="form-control rounded-none w-full" id="swal-input11" name="image">
                </div>
            </form>

            <script>
                document.getElementById('swal-input11').addEventListener('change', (event) => {
                setImageUpload(event.target.files[0]);
                });
            </script>
            `,
                        customClass: {
                popup: 'custom-swal2-modal'
            },
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#008000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save Changes',
            preConfirm: async () => {
                const userIdString = document.getElementById('swal-input1').value;
                const nameWini = document.getElementById('swal-input2').value;
                const nameWFull = document.getElementById('swal-input3').value;
                const birthdate = document.getElementById('swal-input4').value;
                const roleName = document.getElementById('swal-input5').value;
                const gender = document.querySelector('input[name="gender"]:checked').value;
                const address = document.getElementById('swal-input7').value;
                const email = document.getElementById('swal-input8').value;
                const phoneNumber = document.getElementById('swal-input9').value;
                const bankNumber = document.getElementById('swal-input10').value;
    
                let imgSrc = biodataToEdit.imgSrc;
    
                if (imageUpload) {
                    try {
                        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
                        const snapshot = await uploadBytes(imageRef, imageUpload);
                        imgSrc = snapshot.metadata.fullPath;
                    } catch (uploadError) {
                        console.error('Image upload failed:', uploadError);
                        MySwal.fire({
                            icon: 'error',
                            title: 'Image upload failed!',
                            text: 'Please try again.',
                        });
                        return false;
                    }
                }
    
                const userId = parseInt(userIdString, 10);
    
                try {
                    if (!roleName) {
                        throw new Error('Role Name is required');
                    }
    
                    try {
                        await fetch(`http://localhost:3000/biodata/updatedata/${id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                userId: userId,
                                nameWini: nameWini,
                                nameWFull: nameWFull,
                                birthdate: birthdate,
                                roleName: roleName,
                                gender: gender,
                                address: address,
                                email: email,
                                phoneNumber: phoneNumber,
                                bankNumber: bankNumber,
                                imgSrc: imgSrc
                            })
                        });
                        MySwal.fire({
                            icon: 'success',
                            title: 'Updated!',
                            text: 'Biodata has been updated.'
                        });
                        fetchBiodataList();
                    } catch (error) {
                        console.error('Failed to update biodata:', error);
                        MySwal.fire({
                            icon: 'error',
                            title: 'Failed to update!',
                            text: 'Biodata update failed.'
                        });
                    }
                } catch (error) {
                    console.error('Failed to fetch roleId:', error);
                    MySwal.showValidationMessage('Invalid Role Name');
                    return false;
                }
            }
        });
    
        if (formValues) {
            // Further actions if needed
        }
    };
    
    

    const handleAdd = async () => {
        const { value: formValues } = await MySwal.fire({
            title: 'Add New Biodata',
            html: `
                <input id="swal-input1" class="swal2-input" placeholder="User ID">
                <input id="swal-input2" class="swal2-input" placeholder="Name with Initials">
                <input id="swal-input3" class="swal2-input" placeholder="Full Name">
                <input id="swal-input4" class="swal2-input" placeholder="Birthdate" type="date">
                <select id="swal-input5" class="swal2-input">
                    <option value="" selected>Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Finance Manager">Finance Manager</option>
                    <option value="Sales Manager">Sales Manager</option>
                    <option value="HR Manager">HR Manager</option>
                    <option value="Inventory Manager">Inventory Manager</option>
                    <option value="Employee">Employee</option>
                </select>
                <div>
                    <label><input type="radio" name="gender" value="Male"> Male</label>
                    <label><input type="radio" name="gender" value="Female"> Female</label>
                </div>
                <input id="swal-input7" class="swal2-input" placeholder="Address">
                <input id="swal-input8" class="swal2-input" placeholder="Email">
                <input id="swal-input9" class="swal2-input" placeholder="Phone Number">
                <input id="swal-input10" class="swal2-input" placeholder="Bank Number">
                <input type="file" class="form-control rounded-none" id="swal-input11" name="image" />`,
            didOpen: () => {
                document.getElementById('swal-input11').addEventListener('change', (event) => {
                    setImageUpload(event.target.files[0]);
                });
            },
            customClass: {
                popup: 'custom-swal2-modal'
            },
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#008000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Save Changes',
            preConfirm: async () => {
                const userIdString = document.getElementById('swal-input1').value;
                const nameWini = document.getElementById('swal-input2').value;
                const nameWFull = document.getElementById('swal-input3').value;
                const birthdate = document.getElementById('swal-input4').value;
                const roleName = document.getElementById('swal-input5').value;
                const gender = document.querySelector('input[name="gender"]:checked').value;
                const address = document.getElementById('swal-input7').value;
                const email = document.getElementById('swal-input8').value;
                const phoneNumber = document.getElementById('swal-input9').value;
                const bankNumber = document.getElementById('swal-input10').value;
                const userId = parseInt(userIdString, 10);
    
                try {
                    if (!roleName) {
                        throw new Error('Role Name is required');
                    }
    
                    // Handle image upload before sending the rest of the data
                    const uploadImage = () => {
                        return new Promise((resolve, reject) => {
                            if (imageUpload) {
                                const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
                                uploadBytes(imageRef, imageUpload)
                                    .then((snapshot) => {
                                        const imgSrc = snapshot.metadata.fullPath;
                                        resolve(imgSrc); // Resolve with the image source path
                                    })
                                    .catch((uploadError) => {
                                        reject(uploadError); // Reject if upload fails
                                    });
                            } else {
                                resolve(''); // If no image uploaded, resolve with empty string
                            }
                        });
                    };
    
                    const imgSrc = await uploadImage(); // Await image upload before continuing
    
                    // Proceed with form submission after the image is uploaded
                    const response = await fetch(`http://localhost:3000/biodata/adddata`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            userId,
                            nameWini,
                            nameWFull,
                            birthdate,
                            roleName,
                            gender,
                            address,
                            email,
                            phoneNumber,
                            bankNumber,
                            imgSrc
                        })
                    });
    
                    if (response.ok) {
                        console.log('Profile added successfully');
                        fetchBiodataList(); // Refresh the biodata list after successful submission
                    } else {
                        console.error('Failed to add profile:', response.statusText);
                    }
    
                } catch (error) {
                    console.error('Failed to add biodata:', error);
                    MySwal.fire({
                        icon: 'error',
                        title: 'Failed to add!',
                        text: 'Adding new biodata failed.',
                    });
                    return false;
                }
            }
        });
    
        if (!formValues) {
            return; // User canceled the operation
        }
    };
    

// Updated handleUploadImage to update the file state

const handleUploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name+v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
        alert("Image uploaded successfully");
    });

}; 

const handleRemove = async (id) => {
    const biodataToRemove = biodataList.find(biodata => biodata.id === id);

    if (!biodataToRemove) {
        MySwal.fire({
            icon: 'error',
            title: 'Profile not found',
            text: 'The profile you are trying to remove does not exist.'
        });
        return;
    }

    // Display the confirmation dialog
    const result = await MySwal.fire({
        title: 'Are you sure?',
        text: "Do you want to remove this profile? This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove it!',
        cancelButtonText: 'No, cancel',
        reverseButtons: true
    });

    if (result.isConfirmed) {
        // If the user confirmed, proceed with the deletion
        try {
            // Check if there's an associated image to remove
            if (biodataToRemove.imgSrc) {
                const imageRef = ref(storage, biodataToRemove.imgSrc);
                await deleteObject(imageRef); // Delete image from Firebase storage
            }

            // Proceed with the profile removal from the server
            const response = await fetch(`http://localhost:3000/biodata/destroydata/${id}`, {
                method: 'delete'
            });

            if (response.ok) {
                // If the profile is successfully removed, update the UI
                setBiodataList(biodataList.filter(biodata => biodata.id !== id));

                MySwal.fire({
                    icon: 'success',
                    title: 'Profile removed successfully',
                    timer: 1500,
                    showConfirmButton: false
                });
            } else {
                console.error('Failed to remove profile:', response.statusText);
                MySwal.fire({
                    icon: 'error',
                    title: 'Failed to remove profile',
                    text: response.statusText
                });
            }
        } catch (error) {
            console.error('Failed to remove profile:', error);
            MySwal.fire({
                icon: 'error',
                title: 'Failed to remove profile',
                text: error.message
            });
        }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
        // If the user canceled, show a cancellation message
        MySwal.fire({
            title: 'Cancelled',
            text: 'The profile is safe!',
            icon: 'info',
            timer: 1500,
            showConfirmButton: false
        });
    }
};


const handlePrevPage = () => setCurrentPage(prev => prev > 1 ? prev - 1 : prev);
const handleNextPage = () => setCurrentPage(prev => prev < totalPages ? prev + 1 : prev);

const filteredProfiles = searchTerm
? biodataList.filter(profile =>
    (profile.userId && profile.userId.toString().includes(searchTerm)) ||
    (profile.nameWini && profile.nameWini.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (profile.email && profile.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (profile.address && profile.address.toLowerCase().includes(searchTerm.toLowerCase()))
)
: biodataList;


// const totalPages = Math.ceil(filteredProfiles.length / rowsPerPage);
const indexFrom = (currentPage - 1) * rowsPerPage;
const indexTo = currentPage * rowsPerPage;

 return (
        <div className="biodata-container">
            <h2 className="text-3xl text-black pl-1 pt-2 ">Profiles</h2>
            <div className='mb-2 mt-5 flex items-center'>
                <button onClick={handleAdd} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Add Profile
                </button>
                <div className="relative ml-4"> 
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8 a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        className="block w-80 h-10 pl-10 pr-3 py-2 text-ml border border-[#54db93] rounded-lg text-blue-500 focus:ring-[#54db93]"
                        placeholder="Search by User ID or Name"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-black uppercase bg-[#54db93]">
                    <tr>
                        <th scope="col" className="px-6 py-3">User ID</th>
                        <th scope="col" className="px-6 py-3">Name with Initials</th>
                        <th scope="col" className="px-6 py-3">Age</th>
                        <th scope="col" className="px-6 py-3">Role</th>
                        <th scope="col" className="px-6 py-3">Gender</th>
                        <th scope="col" className="px-6 py-3">Address</th>
                        <th scope="col" className="px-6 py-3">Phone Number</th>
                        <th scope="col" className="px-6 py-3">Profile Photo</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-xs text-black uppercase bg-[#cdf8da] border-b border-[#4bf885]">
                    {filteredProfiles.slice(indexFrom, indexTo).map((biodata) => (
                        <tr key={biodata.userId} className="biodata-item hover:bg-[#a1f0c6]">
                            <td className="px-6 py-4">{biodata.userId}</td>
                            <td className="px-6 py-4">{biodata.nameWini}</td>
                            <td className="px-6 py-4">{biodata.age}</td>
                            <td className="px-6 py-4">{biodata.role?.roleName}</td>
                            <td className="px-6 py-4">{biodata.gender}</td> 
                            <td className="px-6 py-4">{biodata.address}</td>
                            <td className="px-6 py-4">{biodata.phoneNumber}</td>
                            <td className="px-6 py-4">
                            <img src={biodata.imgSrc} alt="Profile" className="rounded-full w-12 h-12 object-cover border-4" onChange={handleUploadImage}/>
                            </td>
                            <td className="px-6 py-4">
                                <button className="px-2 py-1 mr-2 bg-green-500 text-white rounded" onClick={() => handleEdit(biodata.id)}>Edit</button>
                                <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleRemove(biodata.id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}