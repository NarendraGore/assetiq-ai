// import RegisterForm from "@/features/auth/components/RegisterForm";

// export default function RegisterPage() {
//   return (
//     <main className="min-h-screen bg-slate-50">
//       <div className="grid min-h-screen lg:grid-cols-2">
//         {/* Left Section */}
//         <section className="hidden items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-16 lg:flex">
//           <div className="max-w-lg text-white">
//             <h1 className="text-5xl font-bold leading-tight">
//               Join Asset
//               <br />
//               Management
//             </h1>

//             <p className="mt-6 text-lg text-blue-100">
//               Create your account and start managing assets, inventory,
//               employees and reports from one modern dashboard.
//             </p>

//             <div className="mt-10 space-y-4">
//               <div className="flex items-center gap-3">
//                 <div className="h-2.5 w-2.5 rounded-full bg-white" />
//                 <span>Secure JWT Authentication</span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="h-2.5 w-2.5 rounded-full bg-white" />
//                 <span>Role Based Access Control</span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="h-2.5 w-2.5 rounded-full bg-white" />
//                 <span>Modern SaaS Dashboard</span>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Right Section */}
//         <section className="flex items-center justify-center px-6 py-12">
//           <RegisterForm />
//         </section>
//       </div>
//     </main>
//   );
// }

import RegisterForm from "@/features/auth/components/RegisterForm";

export default function LoginPage() {
  return <RegisterForm />;
}
