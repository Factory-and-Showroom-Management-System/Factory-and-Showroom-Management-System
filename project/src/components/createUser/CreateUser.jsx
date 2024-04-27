// import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
// import { useState } from "react";

// export default function CreateUser() {
//   const [formData, setFormData] = useState({});
 
//   const [loading, setLoading] = useState(false);
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//         setLoading(true);
//       const res = await fetch("http://localhost:3000/users/createUser", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       setLoading(false);
//     } catch (error) {
//         setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen mt-20">
//       <div className="flex flex-col max-w-3xl gap-5 p-3 mx-auto md:flex-row md:items-center">
//         <div className="flex-1">
//           <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//             <div>
//               <Label value="Your name" />
//               <TextInput
//                 type="text"
//                 placeholder="name"
//                 id="name"
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <Label value="Your username" />
//               <TextInput
//                 type="username"
//                 placeholder=""
//                 id="username"
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <Label value="Your password" />
//               <TextInput
//                 type="password"
//                 placeholder="Password"
//                 id="password"
//                 onChange={handleChange}
//               />
//             </div>
//             <Button type="submit" className="text-blue-500" disabled={loading}>

//                 {loading ?(
//                     <>
//                         <Spinner size='sm'/>
//                         <span className="pl-3">Loading...</span>
//                     </>
//                 )
//                 )}
                
//               Sign Up
//             </Button>
//           </form>

          
//         </div>
//       </div>
//     </div>
//   );
// }
