import React, { useState, useEffect } from "react";
import { Button, Modal, Alert } from "flowbite-react";
import { HiOutlineExclamationCircle, HiInformationCircle } from "react-icons/hi";

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
      const response = await fetch(`http://localhost:3000/salary/showroleincome/${id}`);
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
      const response = await fetch(`http://localhost:3000/salary/deleteroleincome/${id}`, {
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
      <Modal show={confirmModal} size="md" onClose={() => setConfirmModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this role income?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleConfirmRemove}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => {
                setConfirmModal(false);
                if (onClose) onClose();
              }}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {alertVisible && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
          <Alert
            color="success"
            icon={HiInformationCircle}
            onDismiss={() => setAlertVisible(false)}
          >
            Role income <b>- Deleted Successfully! ✅</b>
          </Alert>
        </div>
      )}
    </>
  );
}
