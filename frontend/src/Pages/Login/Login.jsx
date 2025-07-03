import { useEffect, useState } from "react";
import { useLoginMutation } from "../../Redux/user/userApi";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const { loggedUser } = useSelector((store) => store.user);
  const [error, setError] = useState("");
  const [login, { isLoading, isError }] = useLoginMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin/dashboard";

  useEffect(() => {
    if (loggedUser?.success && !isError) {
      navigate(from, { replace: true });
    }
  }, [loggedUser, isError, from, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value;
    const password = form.password.value;

    const loginInfo = {
      username,
      password,
    };

    const res = await login(loginInfo);

    if (res?.error) {
      return setError(res?.error?.data?.error);
    }

    if (res?.data?.success) {
      Swal.fire("", "Login Success", "success");
      form.reset();
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <form onSubmit={handleLogin} className="w-[90%] sm:w-[350px]">
        <div>
          <h2 className="text-center text-2xl font-medium">Admin Login</h2>
        </div>
        <br />
        <div className="mb-5">
          <label htmlFor="username" className="mb-2 block text-sm font-medium">
            Username
          </label>
          <input
            type="username"
            id="username"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
            placeholder="eManager"
            required
          />
        </div>
        <div className="mb-1">
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
            placeholder="********"
            required
          />
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}
        <br />
        <button
          type="submit"
          disabled={isLoading && "disabled"}
          className="w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-base-100 sm:w-auto"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
