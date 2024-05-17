import React, { useState, useEffect } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { FloatingLabel, Select } from "flowbite-react";

export default function AddRolecomp({ onClose }) {
  const [openModal, setOpenModal] = useState(true);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [dateIncome, setDateIncome] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch("http://localhost:3000/salary/showallrole");
      if (!response.ok) {
        throw new Error('Failed to fetch roles');
      }
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const onCloseModal = () => {
    setOpenModal(false);
    if (onClose) onClose();
  };

  const validate = () => {
    let isValid = true;
    const errors = {};

    if (!selectedRole) {
      errors.selectedRole = "Please select a role.";
      isValid = false;
    }

    if (!dateIncome) {
      errors.dateIncome = "Please enter the date income.";
      isValid = false;
    } else if (!/^\d*\.?\d*$/.test(dateIncome)) {
      errors.dateIncome = "Please enter a valid number.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleDateIncomeChange = (e) => {
    // Restrict input to numeric characters and dots
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^0-9.]/g, '');
    setDateIncome(filteredValue);
  };

  const handleReset = () => {
    setSelectedRole('');
    setDateIncome('');
    setErrors({});
  };

  const handleSubmit = () => {
    if (validate()) {
      // Perform submit action
      console.log("Form submitted successfully!");
    }
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add New RoleIncome</h3>

            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="roles" value="Select Role List" />
              </div>
              <Select id="roles" required onChange={(e) => setSelectedRole(e.target.value)} value={selectedRole}>
                <option value="">Select Role</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.roleName}</option>
                ))}
              </Select>
              {errors.selectedRole && <span className="text-red-500">{errors.selectedRole}</span>}
            </div>

            <div className="max-w-md">
              <div className="pb-2">
                <Label htmlFor="list" value="Date Income" />
              </div>
              <div className="grid grid-flow-col justify-stretch space-x-4">
                <FloatingLabel variant="outlined" label="Enter Date Income" value={dateIncome} onChange={handleDateIncomeChange} />
              </div>
              {errors.dateIncome && <span className="text-red-500">{errors.dateIncome}</span>}
            </div>

            <div className="flex gap-2">
              <Button color="gray" onClick={handleReset}>Reset</Button>
              <Button color="success" onClick={handleSubmit}>
                Save
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
