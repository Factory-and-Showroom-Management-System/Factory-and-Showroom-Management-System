import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function Biodata() {
    const [biodataList, setBiodataList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchBiodataList();
    }, []);

const fetchBiodataList = async () => {
    try {
        const response = await fetch('http://localhost:3000/biodata/showdata');
        const data = await response.json();
        setBiodataList(data);
    } catch (error) {
        console.error('Failed to fetch biodata:', error);
    }
};

const handleEdit = async (id) => {
    const biodataToEdit = biodataList.find(biodata => biodata.id === id);
    if (!biodataToEdit) {
        return;
    }

    const { value: formValues } = await MySwal.fire({
        title: 'Edit Biodata',
        html: `
                <style>
                    .custom-swal2-modal .swal2-popup {
                        width: 100vw;
                        max-width: 100vw;
                    }
                    .custom-swal2-modal .grid-container {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        grid-gap: 10px;
                    }
                    .custom-swal2-modal .form-group {
                        display: flex;
                        flex-direction: column;
                    }
                    .custom-swal2-modal .swal2-input {
                        padding: 8px;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        margin-bottom: 10px;
                        box-sizing: border-box;
                        width: 100%;
                    }
                    .custom-swal2-modal .form-group.full-width {
                        grid-column: span 3;
                        text-align: center;
                    }
                    .custom-swal2-modal button {
                        padding: 10px;
                        background-color: #28a745;
                        color: #fff;
                        border: none;
                        border-radius: 4px;
                        font-size: 16px;
                        cursor: pointer;
                        width: 100%;
                    }
                    .custom-swal2-modal button:hover {
                        background-color: #218838;
                    }
                </style>
                <form>
                    <div class="grid-container">
                        <div class="form-group">
                            <input type="text" id="swal-input1" class="swal2-input" placeholder="User ID" value="${biodataToEdit.userId}" disabled>
                        </div>
                        <div class="form-group">
                            <input type="text" id="swal-input2" class="swal2-input" placeholder="Name with Initials" value="${biodataToEdit.nameWini}">
                        </div>
                        <div class="form-group">
                            <input type="text" id="swal-input3" class="swal2-input" placeholder="Full Name" value="${biodataToEdit.nameWFull}">
                        </div>
                        <div class="form-group">
                            <input type="date" id="swal-input4" class="swal2-input" placeholder="Birthdate" value="${biodataToEdit.birthdate}">
                        </div>
                        <div class="form-group">
                            <select id="swal-input5" class="swal2-input">
                                <option value="Admin" ${biodataToEdit.role.roleName === 'Admin' ? 'selected' : ''}>Admin</option>
                                <option value="Finance Manager" ${biodataToEdit.role.roleName === 'Finance Manager' ? 'selected' : ''}>Finance Manager</option>
                                <option value="Sales Manager" ${biodataToEdit.role.roleName === 'Sales Manager' ? 'selected' : ''}>Sales Manager</option>
                                <option value="HR Manager" ${biodataToEdit.role.roleName === 'HR Manager' ? 'selected' : ''}>HR Manager</option>
                                <option value="Inventory Manager" ${biodataToEdit.role.roleName === 'Inventory Manager' ? 'selected' : ''}>Inventory Manager</option>
                                <option value="Employee" ${biodataToEdit.role.roleName === 'Employee' ? 'selected' : ''}>Employee</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <div>
                                <label><input type="radio" name="gender" value="Male" ${biodataToEdit.gender === 'Male' ? 'checked' : ''}> Male</label>
                                <label><input type="radio" name="gender" value="Female" ${biodataToEdit.gender === 'Female' ? 'checked' : ''}> Female</label>
                            </div>
                        </div>
                        <div class="form-group">
                            <input type="text" id="swal-input7" class="swal2-input" placeholder="Address" value="${biodataToEdit.address}">
                        </div>
                        <div class="form-group">
                            <input type="email" id="swal-input8" class="swal2-input" placeholder="Email" value="${biodataToEdit.email}">
                        </div>
                        <div class="form-group">
                            <input type="text" id="swal-input9" class="swal2-input" placeholder="Phone Number" value="${biodataToEdit.phoneNumber}">
                        </div>
                        <div class="form-group">
                            <input type="text" id="swal-input10" class="swal2-input" placeholder="Bank Number" value="${biodataToEdit.bankNumber}">
                        </div>
                        <div class="form-group">
                            <input type="text" id="swal-input11" class="swal2-input" placeholder="Profile Photo" value="${biodataToEdit.imgSrc}">
                        </div>
                    </div>
                </form>`,
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
            const imgSrc = document.getElementById('swal-input11').value;

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
            <input id="swal-input11" class="swal2-input" placeholder="Profile Photo">`,
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
            const imgSrc = document.getElementById('swal-input11').value;
            const userId = parseInt(userIdString, 10);

            try {
                if (!roleName) {
                    throw new Error('Role Name is required');
                }

                const response = await fetch('http://localhost:3000/biodata/adddata', {
                    method: 'POST',
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

                if (!response.ok) {
                    throw new Error('Failed to add biodata');
                }
                const data = await response.json();
                MySwal.fire({
                    icon: 'success',
                    title: 'Added!',
                    text: 'New biodata has been added.',
                });
                fetchBiodataList();
                // return { userId, nameWini, nameWFull, birthdate, roleName, roleId, gender, email, phoneNumber, bankNumber, imgSrc };
            } catch (error) {
                console.error('Failed to add biodata:', error);
                MySwal.fire({
                    icon: 'error',
                    title: 'Failed to add!',
                    text: 'Adding new biodata failed.',
                });
                return false; // Prevent form submission on error
            }
        }
    });

    if (!formValues) {
        return; // User cancelled the operation
    }
};



const handleRemove = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/biodata/destroydata/${id}`, {
            method: 'delete'
        });
        if (response.ok) {
            // Remove the profile from state correctly
            setBiodataList(biodataList.filter(biodata => biodata.id !== id));
            // Show success message
            MySwal.fire({
                icon: 'success',
                title: 'Profile removed successfully',
                timer: 1500,
                showConfirmButton: false
            });
        } else {
            console.error('Failed to remove profile:', response.statusText);
            // Show error message
            MySwal.fire({
                icon: 'error',
                title: 'Failed to remove profile',
                text: response.statusText
            });
        }
    } catch (error) {
        console.error('Failed to remove profile:', error);
        // Show error message
        MySwal.fire({
            icon: 'error',
            title: 'Failed to remove profile',
            text: error.message
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
                {filteredProfiles.map((biodata) => (
                    <tr key={biodata.userId} className="biodata-item hover:bg-[#a1f0c6]">
                        <td className="px-6 py-4">{biodata.userId}</td>
                        <td className="px-6 py-4">{biodata.nameWini}</td>
                        <td className="px-6 py-4">{biodata.age}</td>
                        <td className="px-6 py-4">{biodata.role?.roleName}</td>
                        <td className="px-6 py-4">{biodata.gender}</td> 
                        <td className="px-6 py-4">{biodata.address}</td>
                        <td className="px-6 py-4">{biodata.phoneNumber}</td>
                        <td className="px-6 py-4">{biodata.imgSrc}</td>
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
