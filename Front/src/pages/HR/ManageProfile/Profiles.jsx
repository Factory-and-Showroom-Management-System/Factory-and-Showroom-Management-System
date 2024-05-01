import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';



const MySwal = withReactContent(Swal);

export default function Profiles() {
    const [profiles, setProfiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [editProfile, setEditProfile] = useState(); // Add editProfile state variable


    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const dateString = now.toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });
            const timeString = now.toLocaleTimeString('en-US', {
                hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true
            });
            setCurrentDateTime(`${dateString}, ${timeString}`);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        fetchProfiles();
    }, []);



    const fetchProfiles = async () => {
        try {
            const response = await fetch('http://localhost:3000/biodata/showdata');
            if (response.ok) {
                const data = await response.json();
                setProfiles(data);
            } else {
                console.error('Failed to fetch profiles:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to fetch profiles:', error);
        }
    };
    

    const handleAdd = async () => {
        // Code for adding new profile
    };

    const handleSaveEdit = async (id) => {
        // Code for editing profile
        try {
            const response = await fetch(`http://localhost:3000/biodata/updatedata/${editProfile.userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editProfile) // Send updated profile data
            });
            if (response.ok) {
                // Update profile in state
                setProfiles(profiles.map(profile => profile.userId === editProfile.userId ? editProfile : profile));
                // Close modal or form
                setEditProfile(null);
                // Show success message
                MySwal.fire({
                    icon: 'success',
                    title: 'Profile updated successfully',
                    timer: 1500,
                    showConfirmButton: false
                });
            } else {
                console.error('Failed to update profile:', response.statusText);
                // Show error message
                MySwal.fire({
                    icon: 'error',
                    title: 'Failed to update profile',
                    text: response.statusText
                });
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
            // Show error message
            MySwal.fire({
                icon: 'error',
                title: 'Failed to update profile',
                text: error.message
            });
        }
    };

    const handleCancelEdit = () => {
        // Close modal or form
        setEditProfile(null);
    };
    

    const handleRemove = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/biodata/destroydata/${id}`, {
                method: 'delete'
            });
            if (response.ok) {
                // Remove the profile from state
                setProfiles(profiles.filter(profile => profile.userId !== id));
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
    const handleNextPage = () => setCurrentPage(prev => prev + 1);

    // Pagination calculations
    const indexFrom = (currentPage - 1) * rowsPerPage;
    const indexTo = currentPage * rowsPerPage;
    const totalPages = Math.ceil(profiles.length / rowsPerPage);

    const filteredProfiles = searchTerm
        ? profiles.filter(profile =>
            profile.nameWFull.toLowerCase().includes(searchTerm.toLowerCase()) ||
            profile.userId.toString().includes(searchTerm)
        )
        : profiles;

    return (
        <div className="shadow-lg p-20 bg-white rounded-lg">
            <div className="relative overflow-x-auto l:rounded-lg">
                <h1 className="text-3xl text-blue-500 pl-1 pt-2">Profiles Table: {currentDateTime}</h1>
                <div className='mb-2 mt-5 flex items-center'>
                    <div className="relative ml-4">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8 a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="w-80 h-10 pl-10 pr-3 py-2 border border-blue-400 rounded-lg text-blue-500 focus:ring-blue-500 focus:border-red-500"
                            placeholder="Search by Name or ID"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-white uppercase bg-blue-600">
                        <tr>
                            <th scope="col" className="px-6 py-3">User ID</th>
                            <th scope="col" className="px-6 py-3">Full Name</th>
                            <th scope="col" className="px-6 py-3">Age</th>
                            <th scope="col" className="px-6 py-3">Role</th>
                            <th scope="col" className="px-6 py-3">Gender</th>
                            <th scope="col" className="px-6 py-3">Address</th>
                            <th scope="col" className="px-6 py-3">Phone Number</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {profiles.map((profile) => (
                            <tr key={profile.userId} className="bg-blue-500 text-white border-b border-blue-400 hover:bg-blue-400">
                                <td className="px-6 py-4">{profile.userId}</td>
                                <td className="px-6 py-4">{profile.nameWFull}</td>
                                <td className="px-6 py-4">{profile.age}</td>
                                <td className="px-6 py-4">{profile.roleId}</td>
                                <td className="px-6 py-4">{profile.gender}</td>
                                <td className="px-6 py-4">{profile.address}</td>
                                <td className="px-6 py-4">{profile.phoneNumber}</td>
                                <td className="px-6 py-4">
                                    <button className="font-medium text-white hover:underline" style={{ marginRight: '10px' }} onClick={() => handleSaveEdit(profile.userId)}>Edit</button>
                                    <button className="font-medium text-white hover:underline" onClick={() => handleRemove(profile.userId)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-between mt-4">
                    <button className="text-blue-500" disabled={currentPage === 1} onClick={handlePrevPage}>Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button className="text-blue-500" disabled={currentPage === totalPages} onClick={handleNextPage}>Next</button>
                </div>
            </div>
        </div>
    );
}
