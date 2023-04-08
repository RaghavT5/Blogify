import Link from "next/link";
import { useState } from "react";
import { auth } from "../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email && password) {
        await signInWithEmailAndPassword(auth, email, password);

        // await updateProfile(auth.currentUser, { displayName: `${name}` });
        toast.success(`Welcome ${auth.currentUser.displayName}`, {
          // position: "top-center",
        });

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        return toast.error("All fields are mandatory.");
      }
    } catch (error) {
      toast.error(`${error.message}`, {
        //  position: "top-center",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        theme="colored"
        //className="my-28 mr-[45rem] text-xl"
        className="my-44 ml-16"
      />
      <div className="w-screen max-w-xl h-[30rem] p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Log in</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-400 p-4 rounded-md focus:outline-none focus:border-[#1967d2] focus:border-2 text-lg"
              placeholder="Enter your email address"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-400 p-4 rounded-md focus:outline-none focus:border-[#1967d2] focus:border-2 text-lg"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="mt-2 w-full bg-[#2196F3] text-white py-4 px-4 rounded-md hover:bg-blue-700 transition duration-200 text-xl font-semibold"
            >
              Log in
            </button>
          </div>
        </form>
        <div className="mt-8">
          <p className="text-gray-600 text-lg">
            Don't have an account yet?{" "}
            <Link href="/signup" legacyBehavior>
              <a className="text-[#1976d2] hover:text-blue-700 hover:font-semibold">
                Sign up here.
              </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
