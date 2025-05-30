
// import { useState } from 'react';
// import API from '../../utils/api';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('customer'); // UI only, not sent to backend
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       // Login API expects only email and password
//       const res = await API.post('/auth/login', { email, password });

//       const { token, user } = res.data;

//       // Save token locally (optional here since login() also saves it)
//       localStorage.setItem('token', token);

//       // Set user and token in AuthContext
//       await login(user, token);

//       alert('Login Successful');

//       // Redirect based on actual user role returned from backend
//       if (user.role === 'artisan') {
//         navigate('/artisan/dashboard');
//       } else {
//         navigate('/');
//       }
//     } catch (err) {
//       console.error('Login error:', err.response?.data || err.message);
//       alert('Login Failed');
//     }
//   };

//   return (
//     <form
//       onSubmit={handleLogin}
//       className="max-w-md mx-auto mt-10 p-6 border rounded shadow space-y-4"
//     >
//       <h2 className="text-2xl font-semibold mb-4">Login</h2>

//       <input
//         className="form-control w-full p-2 border rounded"
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//       />

//       <input
//         className="form-control w-full p-2 border rounded"
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />

//       {/* Role selector UI only, does NOT affect login API */}
//       <select
//         className="form-control w-full p-2 border rounded"
//         value={role}
//         onChange={(e) => setRole(e.target.value)}
//         disabled // disable to avoid confusion, or remove it if you want
//         title="Role is set by the backend and cannot be changed here"
//       >
//         <option value="customer">Customer</option>
//         <option value="artisan">Artisan</option>
//       </select>

//       <button className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//         Login
//       </button>
//     </form>
//   );
// }

// export default LoginPage;




















import { useState } from 'react';
import API from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify'; // 👈 Import Toastify

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/auth/login', { email, password });
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      await login(user, token);

      toast.success('Login Successful'); // ✅ Show toast

      if (user.role === 'artisan') {
        navigate('/artisan/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      toast.error('Login Failed'); // ✅ Show error toast
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="max-w-md mx-auto mt-10 p-6 border rounded shadow space-y-4"
    >
      <h2 className="text-2xl font-semibold mb-4">Login</h2>

      <input
        className="form-control w-full p-2 border rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className="form-control w-full p-2 border rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <select
        className="form-control w-full p-2 border rounded"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        disabled
        title="Role is set by the backend and cannot be changed here"
      >
        <option value="customer">Customer</option>
        <option value="artisan">Artisan</option>
      </select>

      <button className="btn btn-primary bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Login
      </button>
    </form>
  );
}

export default LoginPage;
