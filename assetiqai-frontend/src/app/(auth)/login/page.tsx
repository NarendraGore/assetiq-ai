// import LoginForm from "@/features/auth/components/LoginForm";

// export default function LoginPage() {
//   return (
//     <main className="min-h-screen bg-slate-50">
//       <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">
//         {/* Left Section */}
//         <section className="hidden items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 p-16 lg:flex">
//           <div className="max-w-md text-white">
//             <h1 className="mb-6 text-5xl font-bold leading-tight">
//               Smart Asset
//               <br />
//               Management
//             </h1>

//             <p className="text-lg text-blue-100">
//               Manage assets, inventory, employees and reports from one modern
//               dashboard.
//             </p>
//           </div>
//         </section>

//         {/* Right Section */}
//         <section className="flex items-center justify-center p-6 md:p-12">
//           <LoginForm />
//         </section>
//       </div>
//     </main>
//   );
// }
import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return <LoginForm />;
}
