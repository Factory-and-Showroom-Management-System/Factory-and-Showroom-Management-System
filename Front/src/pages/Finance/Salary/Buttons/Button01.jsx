import React, { useState } from 'react';
import { Button } from "flowbite-react";

import BasicSalaries from '../Earning/BasicSalaries';

export default function Card01() {
    const [openEar, setOpen] = useState(false);


    const openEarning = () => {
        setOpen(true);

    }

    return (

            <div className=''>
                <Button onClick={openEarning} className='bg-blue-600 hover:bg-blue-800' size="xl">
                    Earning Salary
                </Button>

                {openEar && <BasicSalaries />}
            
            </div>


    );
}
