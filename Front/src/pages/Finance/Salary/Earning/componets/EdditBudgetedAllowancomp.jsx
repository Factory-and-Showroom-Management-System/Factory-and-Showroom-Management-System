import React, { useState, useEffect } from "react";
import { Button, Label, Modal, TextInput, Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { FcAddDatabase } from "react-icons/fc";
import { MdCancel, MdDataSaverOn } from "react-icons/md";
import { motion } from 'framer-motion';

export default function EditBudgetedAllowance({ onClose, id }) {
  const [openModal, setOpenModal] = useState(true);
  const [confirmModal, setConfirmModal] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [allowance, setAllowance] = useState('');
  const [allowanceDate, setAllowanceDate] = useState('');

  useEffect(() => {
    fetchBudgetedAllowance();
  }, [id]);

  const fetchBudgetedAllowance = async () => {
    try {
      const response = await fetch(`http://localhost:3000/salary/showbudgetedallowance/${id}`);
      const data = await response.json();
      if (response.ok) {
        const budgetedAllowance = data.budgetedAllowance; // Access the nested object
        setAllowance(budgetedAllowance.baValue.toString());
        setAllowanceDate(budgetedAllowance.baDate.substring(0, 10)); // Extracting the date part from the ISO string
      } else {
        setErrors(prevErrors => ({ ...prevErrors, fetch: "Failed to fetch budgeted allowance" }));
      }
    } catch (error) {
      setErrors(prevErrors => ({ ...prevErrors, fetch: "Error fetching budgeted allowance" }));
    }
  };
  



  const handleConfirmSave = async (confirmed) => {
    if (confirmed) {
      try {
        const response = await fetch(`http://localhost:3000/salary/updatebudgetedallowance/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            baDate: allowanceDate,
            baValue: parseFloat(allowance)
          })
        });
        if (!response.ok) {
          throw new Error('Failed to save budgeted allowance');
        }

        setConfirmModal(false);
        setOpenModal(false);
        setAlertVisible(true);

        setTimeout(() => {
          setAlertVisible(false);
          if (onClose) onClose();
        }, 2000);
      } catch (error) {
        console.error("Error updating budgeted allowance:", error);
      }
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!allowanceDate) {
      newErrors.allowanceDate = "Please select a date.";
      isValid = false;
    }

    if (!allowance) {
      newErrors.allowance = "Please enter the amount.";
      isValid = false;
    } else if (!/^\d*\.?\d*$/.test(allowance)) {
      newErrors.allowance = "Please enter a valid number.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAllowanceChange = (e) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^0-9.]/g, '');
    setAllowance(filteredValue);
  };

  const handleAllowanceDateChange = (e) => {
    setAllowanceDate(e.target.value);
  };

  const handleSave = () => {
    if (validate()) {
      setConfirmModal(true);
    }
  };

  const handleReset = () => {
    setAllowance('');
    setAllowanceDate('');
    setErrors({});
  };

  const handleClose = () => {
    setOpenModal(false);
    if (onClose) onClose();
  };

  return (
    <>
      <Modal show={openModal} size="md" onClose={handleClose} popup>
        <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Budgeted Allowance</h3>
              <div className="max-w-md">
                <div className="pb-2">
                  <Label htmlFor="allowanceDate" value="Allowance Date" />
                </div>
                <TextInput id="allowanceDate" type="date" value={allowanceDate} onChange={handleAllowanceDateChange} />
                {errors.allowanceDate && <span className="text-red-500">{errors.allowanceDate}</span>}
              </div>
              <div className="pb-2">
                <Label htmlFor="allowance" value="Allowance Amount" />
                <TextInput id="allowance" placeholder="Enter allowance amount" value={allowance} onChange={handleAllowanceChange} />
                {errors.allowance && <span className="text-red-500">{errors.allowance}</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <Button color="gray" onClick={handleReset}>Reset</Button>
              <Button color="success" onClick={handleSave}>Save</Button>
            </div>
          </Modal.Body>
        </motion.div>
      </Modal>

      <Modal show={confirmModal} size="md" onClose={() => setConfirmModal(false)} popup>
        <motion.div initial={{ opacity: 0, scale: 1 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <motion.div animate={{ opacity: [1, 0.9, 1], scale: [1, 1.04, 1] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}>
                <FcAddDatabase className="flex items-center mx-auto mb-4 h-24 w-24 text-gray-400 dark:text-gray-200" />
              </motion.div>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to <b>Save</b> this information?
              </h3>

              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={() => handleConfirmSave(true)}>
                  <motion.div
                    className="flex items-center"
                    animate={{ opacity: [1, 0.5, 1], scale: [1, 1.01, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  >
                    <MdDataSaverOn className="mr-3 h-5 w-5" />
                  </motion.div>
                  Yes, I'm sure
                </Button>
                <Button color="gray" onClick={() => setConfirmModal(false)}>
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
              Budgeted allowance <b>saved successfully!</b> ✅
            </Alert>
          </motion.div>
        </div>
      )}
    </>
  );
}
