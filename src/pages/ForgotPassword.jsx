import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="auth-card p-4" style={{ width: 360 }}>
        <h4 className="text-center mb-3">Forgot Password</h4>

        {sent ? (
          <div className="alert alert-success">
            Password reset link sent to your email
          </div>
        ) : (
          <>
            <input
              type="email"
              className="form-control auth-input mb-3"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className="btn auth-btn w-100" onClick={submit}>
              Send Reset Link
            </button>
          </>
        )}

        <p className="text-center mt-3">
          <Link to="/">Back to login</Link>
        </p>
      </div>
    </div>
  );
}
