import React, { useState, useEffect } from "react";
import { Button, Label, Modal, TextInput, Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { MdDataSaverOn, MdCancel } from "react-icons/md";
import { FcAddDatabase } from "react-icons/fc";
import { GrPowerReset } from "react-icons/gr";
import { motion } from 'framer-motion';

export default function AddBudgetedAllowance({ onClose }) {
  const [openModal, setOpenModal] = useState(true);
  const [confirmModal, setConfirmModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [baValue, setBaValue] = useState('');
  const [baDate, setBaDate] = useState('');

  useEffect(() => {
    localStorage.setItem('openModal', JSON.stringify(openModal));
  }, [openModal]);

  useEffect(() => {
    localStorage.setItem('isButtonDisabled', JSON.stringify(isButtonDisabled));
  }, [isButtonDisabled]);

  const validate = () => {
    let isValid = true;
    const errors = {};

    if (!baDate) {
      errors.baDate = "Please select a date.";
      isValid = false;
    }

    if (!baValue) {
      errors.baValue = "Please enter the amount.";
      isValid = false;
    } else if (!/^\d*\.?\d*$/.test(baValue)) {
      errors.baValue = "Please enter a valid number.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleBaValueChange = (e) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.replace(/[^0-9.]/g, '');
    setBaValue(filteredValue);
  };

  const handleBaDateChange = (e) => {
    setBaDate(e.target.value);
  };

  const handleReset = () => {
    setBaValue('');
    setBaDate('');
    setErrors({});
  };

  const handleConfirmSave = async () => {
    try {
      console.log('Saving data...', baDate, baValue);
      const response = await fetch('http://localhost:3000/salary/addbudgetedallowance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          baDate,
          baValue: parseFloat(baValue)
        })
      });

      console.log('Response:', response);

      if (!response.ok) {
        throw new Error('Failed to save budgeted allowance');
      }

      setConfirmModal(false);
      setOpenModal(false);
      setIsButtonDisabled(true);
      handleReset();
      setAlertVisible(true); // Show success alert

      // Automatically dismiss the alert after 2 seconds
      setTimeout(() => {
        setAlertVisible(false);
        if (onClose) onClose(); // Call onClose if it's provided
      }, 2000);

    } catch (error) {
      console.error('Error saving budgeted allowance:', error);
    }
  };

  const handleSave = () => {
    if (validate()) {
      setConfirmModal(true);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
    if (onClose) onClose(); // Call onClose if it's provided
  }

  return (
    <>
      <Modal show={openModal} size="md" onClose={handleClose} popup>
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add Budgeted Allowance</h3>

              <div className="max-w-md">
                <div className="pb-2">
                  <Label htmlFor="baDate" value="Allowance Date" />
                </div>
                <TextInput id="baDate" type="date" value={baDate} onChange={handleBaDateChange} />
                {errors.baDate && <span className="text-red-500">{errors.baDate}</span>}
              </div>

              <div className="max-w-md">
                <div className="pb-2">
                  <Label htmlFor="baValue" value="Allowance Amount" />
                </div>
                <TextInput id="baValue" type="text" placeholder="Enter allowance amount" value={baValue} onChange={handleBaValueChange} />
                {errors.baValue && <span className="text-red-500">{errors.baValue}</span>}
              </div>

              <div className="flex gap-2">
                <Button color="gray" onClick={handleReset}>
                  <motion.div
                    className="flex items-center"
                    animate={{ opacity: [1, 0.5, 1], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  >
                    <GrPowerReset className="mr-3 h-5 w-5" />
                  </motion.div>
                  Reset
                </Button>

                <Button color="success" onClick={handleSave} disabled={isButtonDisabled}>
                  <motion.div
                    className="flex items-center"
                    animate={{ opacity: [1, 0.5, 1], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                  >
                    <MdDataSaverOn className="mr-3 h-5 w-5" />
                  </motion.div>
                  Save
                </Button>
              </div>
            </div>
          </Modal.Body>
        </motion.div>
      </Modal>

      {/* Confirmation modal */}
      <Modal show={confirmModal} size="md" onClose={() => setConfirmModal(false)} popup>
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <motion.div
                animate={{ opacity: [1, 0.9, 1], scale: [1, 1.04, 1] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              >
                <FcAddDatabase className="flex items-center mx-auto mb-4 h-24 w-24 text-gray-400 dark:text-gray-200" />
              </motion.div>

              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to <b>Save</b> this information?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleConfirmSave}>
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

      {/* Success Alert */}
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
