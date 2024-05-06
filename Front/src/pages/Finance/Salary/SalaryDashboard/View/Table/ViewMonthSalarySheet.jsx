import React from 'react'
import { Card, Modal, Button } from "flowbite-react";
import { useState } from 'react';



export default function ViewMonthSalarySheet({ onClose }) {
    const [openModal, setOpenModal] = useState(true);

    const handleClose = () => {
        setOpenModal(false);
        onClose();
    }

    return (

        <>
            <Modal show={openModal} onClose={handleClose} size="5xl">
                <Modal.Header>Monthly Salary Sheet</Modal.Header>
                <Modal.Body >
                    <div className='w-full h-full'>
                       <div>
                        

                       </div>
                        
                    </div>
                    
                </Modal.Body>
            </Modal>
        </>

    )
}
