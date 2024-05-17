import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { FloatingLabel } from "flowbite-react";

import { Select } from "flowbite-react";

export default function AddRolecomp({ onClose }) {
  const [openModal, setOpenModal] = useState(true);
  const [email, setEmail] = useState('');

  const onCloseModal = () => {
    setOpenModal(false);
    if (onClose) onClose();
  }

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
                <Label htmlFor="countries" value="Select Role List" />
              </div>
              <Select id="countries" required>
                
              </Select>
            </div>

            <div className="max-w-md">
              <div className="pb-2">
                <Label htmlFor="list" value="Date Income" />
              </div>
              <div className="grid grid-flow-col justify-stretch space-x-4">
                <FloatingLabel variant="outlined" label="Enter Date Income" />
              </div>
            </div>


            <div className="w-full">
              <Button>Submit</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
