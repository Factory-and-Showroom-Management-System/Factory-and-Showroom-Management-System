import React, { useState, useEffect } from "react";
import { Button, Label, Modal, TextInput, Alert } from "flowbite-react";
import { HiOutlineExclamationCircle, HiInformationCircle } from "react-icons/hi";

export default function EditRoleComp({ onClose, id }) {
  const [openModal, setOpenModal] = useState(true);
  const [confirmModal, setConfirmModal] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [dateIncome, setDateIncome] = useState('');
  const [errors, setErrors] = useState({});
  const [selectedRole, setSelectedRole] = useState('');
  const condition = true; // Replace this with your actual condition

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

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!selectedRole) {
      newErrors.selectedRole = "Please select a role.";
      isValid = false;
    }

    if (!dateIncome) {
      newErrors.dateIncome = "Please enter the date income.";
      isValid = false;
    } else if (!/^\d*\.?\d*$/.test(dateIncome)) {
      newErrors.dateIncome = "Please enter a valid number.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleConfirmSave = async () => {
    try {
      const response = await fetch(`http://localhost:3000/salary/updateroleincome/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          role: selectedRole,
          dateIncome: parseFloat(dateIncome)
        })
      });
      if (!response.ok) {
        throw new Error('Failed to save role income');
      }

      setConfirmModal(false);
      setOpenModal(false);
      setAlertVisible(true);

      setTimeout(() => {
        setAlertVisible(false);
        if (onClose) onClose();
      }, 2000);
    } catch (error) {
      console.error("Error updating role income:", error);
    }
  };

  const handleDateIncomeChange = (e) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^0-9.]/g, '');
    setDateIncome(filteredValue);
  };

  const handleSelectedRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSave = () => {
    if (validate()) {
      setConfirmModal(true);
    }
  };

  const handleReset = () => {
    setDateIncome('');
    setErrors({});
  };

  const handleClose = () => {
    setOpenModal(false);
    if (onClose) onClose();
  };

  return (
    <>
      <Modal show={openModal} size="md" onClose={handleClose} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Role Income</h3>
            <div className="max-w-md">
              <Label htmlFor="selectedRole" value="Select Role" />
              {condition ? (
                <TextInput
                  id="selectedRole"
                  value={selectedRole}
                  readOnly
                  style={{ color: '#BFBFBF' }}
                />
              ) : (
                <TextInput
                  id="selectedRole"
                  value={selectedRole}
                  onChange={handleSelectedRoleChange}
                />
              )}
              {errors.selectedRole && <span className="text-red-500">{errors.selectedRole}</span>}
            </div>

            <div className="pb-2">
              <Label htmlFor="dateIncome" value="Date Income" />
              <TextInput
                id="dateIncome"
                value={dateIncome}
                onChange={handleDateIncomeChange}
              />
              {errors.dateIncome && <span className="text-red-500">{errors.dateIncome}</span>}
            </div>
            <div className="flex gap-2">
              <Button color="gray" onClick={handleReset}>Reset</Button>
              <Button color="success" onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={confirmModal} size="md" onClose={() => setConfirmModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to save this information?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleConfirmSave}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setConfirmModal(false)}>
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
            Role income <b>- Saved Successfully! ✅</b>
          </Alert>
        </div>
      )}
    </>
  );
}
