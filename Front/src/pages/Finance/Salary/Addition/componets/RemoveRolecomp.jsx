import React, { useState, useEffect } from "react";
import { Button, Modal, Alert } from "flowbite-react";
import { HiOutlineExclamationCircle, HiInformationCircle } from "react-icons/hi";
import { FcDeleteDatabase } from "react-icons/fc";
import { MdDeleteSweep } from "react-icons/md";

import { MdCancel } from "react-icons/md";
import { motion } from 'framer-motion';




export default function RemoveRolecomp({ onClose, id }) {
  const [confirmModal, setConfirmModal] = useState(true); // Set to true to open the modal on mount
  const [alertVisible, setAlertVisible] = useState(false);
  const [dateIncome, setDateIncome] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    fetchRoleIncome();
  }, [id]);

  const fetchRoleIncome = async () => {
    try {
      const response = await fetch(`http://localhost:3000/salary/deleteroleotincome/${id}`);
      const data = await response.json();
      if (response.ok) {
        setDateIncome(data.roleincome.dateIncome.toString());
        setSelectedRole(data.roleincome.role);
      } else {
        console.error("Failed to fetch role income:", data.message);
      }
    } catch (error) {
      console.error("Error fetching role income:", error);
    }
  };

  const handleConfirmRemove = async () => {
    try {
      const response = await fetch(`http://localhost:3000/salary/deleteroleotincome/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          role: selectedRole,
          dateIncome: parseFloat(dateIncome)
        })
      });
      if (!response.ok) {
        throw new Error('Failed to delete role income');
      }

      setConfirmModal(false);
      setAlertVisible(true);

      setTimeout(() => {
        setAlertVisible(false);
        if (onClose) onClose();
      }, 2000);


    } catch (error) {
      console.error("Error deleting role income:", error);
    }
  };

  return (
    <>
      <Modal show={confirmModal} size="md" onClose={() => {setConfirmModal(false); if (onClose) onClose();      }} popup>
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            
            
          <motion.div
              
              animate={{ opacity: [1, 0.9, 1],scale: [1, 1.04, 1]  }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            >
              <FcDeleteDatabase className="flex items-center mx-auto mb-4 h-24 w-24 text-gray-400 dark:text-gray-200" />
            </motion.div>
            
            
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure!, You want to <b>Delete</b> <br></br>this Role OT income?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleConfirmRemove} >
              
              <motion.div
                  className="flex items-center"
                  animate={{ opacity: [1, 0.5, 1], scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                >
                  <MdDeleteSweep className="mr-2 h-5 w-5" />
                </motion.div>
               
               Yes, I'm sure
             
              </Button>
              
              <Button color="gray" onClick={() => {setConfirmModal(false);
                if (onClose) onClose();
              }}>
                
                <motion.div
                  className="flex items-center"
                  animate={{ opacity: [1, 0.5, 1], scale: [1, 1.01, 1] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                >
                  <MdCancel className="mr-3 h-5 w-5" />
                </motion.div>               
               
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
        </motion.div>
      </Modal>

      {alertVisible && (
       
       <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
         
         <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20, transition: { duration: 0.8, ease: "easeInOut" } }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <Alert
                color="success"
                icon={HiInformationCircle}
                onDismiss={() => setAlertVisible(false)}
              >
                Role OT income <b>- Deleted Successfully! ✅</b>
              </Alert>
            </motion.div>

          
        </div>


      )}
    </>
  );
}
