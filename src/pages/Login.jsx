import { useState } from "react";
import { loginUser } from "../api/authService";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = (e) => {
    e.preventDefault();

    const res = loginUser(form);

    if (!res.success) {
      setError("Email or password incorrect");
    } else {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: form.email.split("@")[0],
          email: form.email,
          registeredAt: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        })
      );

      navigate("/dashboard");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="auth-card p-4" style={{ width: 360 }}>
        <h4 className="text-center mb-3">Log in</h4>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={submit}>
          <input
            type="email"
            className="form-control auth-input mb-3"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <input
            type="password"
            className="form-control auth-input mb-2"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          {/* Forgot password */}
          <div className="text-end mb-3">
            <Link to="/forgot-password" className="forgot-link">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="btn auth-btn w-100">
            Log in
          </button>
        </form>

        <p className="text-center mt-3">
          Don’t have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
