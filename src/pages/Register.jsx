import { useState } from "react";
import { registerUser } from "../api/authService";
import { useNavigate, Link } from "react-router-dom";


export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const submit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const res = registerUser(form);

    if (!res.success) {
      setError("This email is already registered. Redirecting to login…");
      setTimeout(() => navigate("/"), 1500);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="auth-card p-5 w-100" style={{ maxWidth: 800 }}>
        <h3 className="text-center mb-3">Register</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={submit} className="row g-3">
          <div className="col-md-6">
            <input
              className="form-control auth-input"
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control auth-input"
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <input
              type="email"
              className="form-control auth-input"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control auth-input"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control auth-input"
              placeholder="Company"
              value={form.company}
              onChange={(e) =>
                setForm({ ...form, company: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <select
              className="form-select auth-input"
              value={form.industry}
              onChange={(e) =>
                setForm({ ...form, industry: e.target.value })
              }
            >
              <option value="">Choose Industry</option>
              <option value="IT">IT</option>
              <option value="Finance">Finance</option>
              <option value="Retail">Retail</option>
            </select>
          </div>

          <div className="col-md-6">
            <input
              className="form-control auth-input"
              placeholder="Country / Region"
              value={form.country}
              onChange={(e) =>
                setForm({ ...form, country: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <input
              type="password"
              className="form-control auth-input"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <input
              type="password"
              className="form-control auth-input"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <button className="btn auth-btn w-100 mt-2">
              Register
            </button>
          </div>
        </form>

        <p className="text-center mt-3">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}
