// import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";

// export default function ForgotPasswordPage() {
//   return (
//     <main className="min-h-screen bg-slate-50">
//       <div className="grid min-h-screen lg:grid-cols-2">
//         <section className="hidden items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-16 lg:flex">
//           <div className="max-w-lg text-white">
//             <h1 className="text-5xl font-bold">Reset Your Password</h1>

//             <p className="mt-6 text-lg text-blue-100">
//               We will help you regain access to your account securely.
//             </p>
//           </div>
//         </section>

//         <section className="flex items-center justify-center px-6 py-12">
//           <ForgotPasswordForm />
//         </section>
//       </div>
//     </main>
//   );
// }

import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";

export default function LoginPage() {
  return <ForgotPasswordForm />;
}
