import React from 'react'


const Navbar = () => {
  return (
    <div className="bg-gray-500">
        
        

        <nav class="bg-white border-gray-200 dark:bg-gray-900">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
            </a>
            <button className="px-4 py-2 font-bold bg-blue-500 border border-blue-700 rounded hover:bg-blue-700">
          Logout
        </button>

          </div>
        </nav>
  </div>
  )
}

export default Navbar