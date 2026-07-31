// import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";

// export default function ResetPasswordPage() {
//   return (
//     <main className="min-h-screen bg-slate-50">
//       <div className="grid min-h-screen lg:grid-cols-2">
//         <section className="hidden items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-16 lg:flex">
//           <div className="max-w-lg text-white">
//             <h1 className="text-5xl font-bold leading-tight">
//               Create a New
//               <br />
//               Password
//             </h1>

//             <p className="mt-6 text-lg text-blue-100">
//               Choose a secure password to protect your account and continue
//               using the Asset Management Dashboard.
//             </p>

//             <div className="mt-10 space-y-4">
//               <div className="flex items-center gap-3">
//                 <div className="h-2.5 w-2.5 rounded-full bg-white" />
//                 <span>Secure password policy</span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="h-2.5 w-2.5 rounded-full bg-white" />
//                 <span>Real-time password validation</span>
//               </div>

//               <div className="flex items-center gap-3">
//                 <div className="h-2.5 w-2.5 rounded-full bg-white" />
//                 <span>Protected authentication flow</span>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section className="flex items-center justify-center px-6 py-12">
//           <ResetPasswordForm />
//         </section>
//       </div>
//     </main>
//   );
// }

import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";

export default function LoginPage() {
  return <ResetPasswordForm />;
}
