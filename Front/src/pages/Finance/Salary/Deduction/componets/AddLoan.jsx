import React, { useState, useEffect } from "react";
import { Button, Label, Modal, TextInput, Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { MdDataSaverOn, MdCancel } from "react-icons/md";
import { FcAddDatabase } from "react-icons/fc";
import { GrPowerReset } from "react-icons/gr";
import { motion } from 'framer-motion';

export default function AddLoan({ onClose }) {
  const [openModal, setOpenModal] = useState(true);
  const [confirmModal, setConfirmModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [loanDate, setLoanDate] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [toBePaid, setToBePaid] = useState('');
  const [loanRatePercentage, setLoanRatePercentage] = useState('');
  const [loanDuration, setLoanDuration] = useState('');

  useEffect(() => {
    localStorage.setItem('openModal', JSON.stringify(openModal));
  }, [openModal]);

  useEffect(() => {
    localStorage.setItem('isButtonDisabled', JSON.stringify(isButtonDisabled));
  }, [isButtonDisabled]);

  const validate = () => {
    let isValid = true;
    const errors = {};

    if (!userId) {
      errors.userId = "Please enter the user ID.";
      isValid = false;
    }

    if (!name) {
      errors.name = "Please enter the name.";
      isValid = false;
    }

    if (!loanDate) {
      errors.loanDate = "Please select a date.";
      isValid = false;
    }

    if (!loanAmount) {
      errors.loanAmount = "Please enter the loan amount.";
      isValid = false;
    } else if (isNaN(parseFloat(loanAmount))) {
      errors.loanAmount = "Please enter a valid number.";
      isValid = false;
    }

    if (!toBePaid) {
      errors.toBePaid = "Please enter the amount to be paid.";
      isValid = false;
    } else if (isNaN(parseFloat(toBePaid))) {
      errors.toBePaid = "Please enter a valid number.";
      isValid = false;
    }

    if (!loanRatePercentage) {
      errors.loanRatePercentage = "Please enter the loan rate percentage.";
      isValid = false;
    } else if (isNaN(parseFloat(loanRatePercentage))) {
      errors.loanRatePercentage = "Please enter a valid number.";
      isValid = false;
    }

    if (!loanDuration) {
      errors.loanDuration = "Please enter the loan duration.";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleInputChange = async (e, setter, type = 'text') => {
    const value = e.target.value;
    if (type === 'number' && value !== '' && isNaN(value)) {
      return;
    }
    setter(value);
    if (setter === setUserId) {
      try {
        const response = await fetch(`http://localhost:3000/salary/showuseridbiodata/${value}`);
        if (!response.ok) {
          throw new Error('Failed to fetch name');
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0 && data[0].nameWini) {
          setName(data[0].nameWini);
        } else {
          setName('');
        }
      } catch (error) {
        console.error('Error fetching name:', error);
        handleReset();
      }
    }
  };

  const handleReset = () => {
    setUserId('');
    setName('');
    setLoanDate('');
    setLoanAmount('');
    setToBePaid('');
    setLoanRatePercentage('');
    setLoanDuration('');
    setErrors({});
  };

  const handleConfirmSave = async () => {
    try {
      const payload = {
        userId: parseInt(userId), // Replace with the actual user ID
        name: name, // Replace with the actual user name
        loanDate: loanDate,
        loanAmount: parseFloat(loanAmount),
        toBePaid: parseFloat(toBePaid),
        loanRatePresentage: parseFloat(loanRatePercentage),
        loanDuration: loanDuration
      };
  
      const response = await fetch('http://localhost:3000/salary/addusertotalloan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      if (!response.ok) {
        // Handle the error appropriately
        throw new Error('Failed to save loan');
      }
  
      // Handle successful response
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
      console.error('Error saving loan:', error);
      // Handle error state or display error message to the user
    }
  };


  const handleSave = () => {
    if (validate()) {
      setConfirmModal(true);
    }
  };

  const handleClose = () => {
    setOpenModal(false);
    if (onClose) onClose();
  };

  return (
    <>
      <Modal show={openModal} size="lg" onClose={handleClose} popup>
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="space-y-6">
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white text-center">Add Loan</h3>

              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <div>
                  <Label htmlFor="userId" value="User ID" />
                  <TextInput id="userId" type="text" placeholder="Enter user ID" value={userId} onChange={(e) => handleInputChange(e, setUserId)} />
                  {errors.userId && <span className="text-red-500">{errors.userId}</span>}
                </div>

                <div>
                  <Label htmlFor="name" value="Name" />
                  <TextInput id="name" type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                  {errors.name && <span className="text-red-500">{errors.name}</span>}
                </div>

                <div>
                  <Label htmlFor="loanDate" value="Loan Date" />
                  <TextInput id="loanDate" type="date" value={loanDate} onChange={(e) => handleInputChange(e, setLoanDate)} />
                  {errors.loanDate && <span className="text-red-500">{errors.loanDate}</span>}
                </div>

                <div>
                  <Label htmlFor="loanAmount" value="Loan Amount" />
                  <TextInput id="loanAmount" type="text" placeholder="Enter loan amount" value={loanAmount} onChange={(e) => handleInputChange(e, setLoanAmount, 'number')} inputMode="decimal" />
                  {errors.loanAmount && <span className="text-red-500">{errors.loanAmount}</span>}
                </div>

                <div>
                  <Label htmlFor="toBePaid" value="To Be Paid" />
                  <TextInput id="toBePaid" type="text" placeholder="Enter amount to be paid" value={toBePaid} onChange={(e) => handleInputChange(e, setToBePaid, 'number')} inputMode="decimal" />
                  {errors.toBePaid && <span className="text-red-500">{errors.toBePaid}</span>}
                </div>

                <div>
                  <Label htmlFor="loanRatePercentage" value="Loan Rate Percentage" />
                  <TextInput id="loanRatePercentage" type="text" placeholder="Enter loan rate" value={loanRatePercentage} onChange={(e) => handleInputChange(e, setLoanRatePercentage, 'number')} inputMode="decimal" />
                  {errors.loanRatePercentage && <span className="text-red-500">{errors.loanRatePercentage}</span>}
                </div>

                <div>
                  <Label htmlFor="loanDuration" value="Loan Duration (Months)" />
                  <TextInput id="loanDuration" type="text" placeholder="Enter loan duration (10M)" value={loanDuration} onChange={(e) => setLoanDuration(e.target.value)} />
                  {errors.loanDuration && <span className="text-red-500">{errors.loanDuration}</span>}
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <Button color="gray" onClick={handleReset}>
                  <motion.div className="flex items-center" animate={{ opacity: [1, 0.5, 1], scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}>
                    <GrPowerReset className="mr-3 h-5 w-5" />
                  </motion.div>
                  Reset
                </Button>

                <Button color="success" onClick={handleSave} disabled={isButtonDisabled}>
                  <motion.div className="flex items-center" animate={{ opacity: [1, 0.5, 1], scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}>
                    <MdDataSaverOn className="mr-3 h-5 w-5" />
                  </motion.div>
                  Save
                </Button>
              </div>
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
                <Button color="failure" onClick={handleConfirmSave}>
                  <motion.div className="flex items-center" animate={{ opacity: [1, 0.5, 1], scale: [1, 1.01, 1] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}>
                    <MdDataSaverOn className="mr-3 h-5 w-5" />
                  </motion.div>
                  Yes, I'm sure
                </Button>
                <Button color="gray" onClick={() => setConfirmModal(false)}>
                  <motion.div className="flex items-center" animate={{ opacity: [1, 0.5, 1], scale: [1, 1.01, 1] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}>
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
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20, transition: { duration: 0.8, ease: "easeInOut" } }} transition={{ duration: 0.6, ease: "easeInOut" }}>
            <Alert color="success" icon={HiInformationCircle} onDismiss={() => setAlertVisible(false)}>
              Loan <b>saved successfully!</b> ✅
            </Alert>
          </motion.div>
        </div>
      )}
    </>
  );
}
