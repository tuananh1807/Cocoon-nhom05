import { login } from "../../services/UserSevices";
import "./LoginPageStyles.css";
import Video from "./video/video.mp4";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, message } from "antd";
import { FacebookOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch hook
import { jwtDecode } from "jwt-decode";
import { FaGoogle, FaFacebookF } from "react-icons/fa"; // Import icons from react-icons
import { Transition } from "@headlessui/react"; // Optional: For smooth transition effects

function LoginPage() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(data);
      localStorage.setItem("token", res.token);

      message.success("Đăng nhập thành công");
      navigate("/");
    } catch (err) {
      message.error(
        err.response?.data?.error || "Login failed. Please try again."
      );
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const GoogleLoginButton = ({ onGoogleLogin }) => {
    const handleGoogleLogin = async () => {
      try {
        window.location.href = "http://localhost:4000/auth/google";
      } catch (error) {
        console.error("Google login error:", error);
        alert("Đăng nhập Google không thành công");
      }
    };

    return (
      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 ease-in-out transform hover:scale-105 space-x-4 w-full max-w-xs mx-auto my-2"
      >
        <FaGoogle className="text-2xl" /> {/* Google icon with larger size */}
        <span className="text-lg">Sign in with Google</span>
      </button>
    );
  };
  const FacebookLoginButton = ({ onFacebookLogin }) => {
    const handleFacebookLogin = async () => {
      try {
        // Điều chỉnh URL theo setup Passport của chúng ta
        window.location.href = "http://localhost:4000/auth/facebook";
      } catch (error) {
        console.error("Facebook login error:", error);
        alert("Đăng nhập Facebook không thành công");
      }
    };

    return (
      <button
        onClick={handleFacebookLogin}
        className="flex items-center justify-center bg-blue-800 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-900 transition-all duration-300 ease-in-out transform hover:scale-105 space-x-4 w-full max-w-xs mx-auto my-2"
      >
        <FaFacebookF className="text-2xl" />{" "}
        {/* Facebook icon with larger size */}
        <span className="text-lg">Sign in with Facebook</span>
      </button>
    );
  };

  useEffect(() => {
    const handleFacebookCallback = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        try {
          // Giải mã token
          const decodedUser = jwtDecode(token);
          console.log("Decoded user:", decodedUser);

          // Lưu token vào localStorage
          localStorage.setItem("token", token);

          // Kiểm tra xem decodedUser có thuộc tính userId không
          if (decodedUser && decodedUser.userId) {
            // Gọi API để lấy thông tin người dùng từ userId
            fetchUserDetails(decodedUser.userId);
          } else {
            console.error("Token không chứa thông tin chi tiết người dùng");
          }
        } catch (error) {
          console.error("Lỗi xử lý token:", error);
        }
      }
    };

    // Gọi hàm callback khi trang được tải
    handleFacebookCallback();
  }, [navigate]);
  useEffect(() => {
    const handleSocialCallback = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        try {
          // Giải mã token
          const decodedUser = jwtDecode(token);
          console.log("Decoded user:", decodedUser);

          // Lưu token vào localStorage
          localStorage.setItem("token", token);

          // Kiểm tra xem decodedUser có thuộc tính userId không
          if (decodedUser && decodedUser.userId) {
            // Gọi API để lấy thông tin người dùng từ userId
            fetchUserDetails(decodedUser.userId);
          } else {
            console.error("Token không chứa thông tin chi tiết người dùng");
          }
        } catch (error) {
          console.error("Lỗi xử lý token:", error);
        }
      }
    };

    // Gọi hàm callback khi trang được tải
    handleSocialCallback();
  }, [navigate]);

  // Hàm lấy thông tin người dùng từ userId
  const fetchUserDetails = async (userId) => {
    try {
      const response = await fetch(`http://localhost:4000/users/${userId}`);
      const userDetails = await response.json();

      // Kiểm tra nếu API trả về lỗi
      if (response.ok) {
        console.log("User details:", userDetails);
        setUserDetails(userDetails); // Lưu thông tin người dùng vào state

        // Chuyển hướng về trang chủ sau khi login thành công
        navigate("/"); // Chuyển hướng về trang chủ sau khi lấy thông tin người dùng thành công
      } else {
        console.error("API error:", userDetails);
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    }
  };
  return (
    <div className="containers">
      <div className="container">
        <div className="left">
          <video className="background-video" src={Video} autoPlay loop muted />
          <div className="text-overlay">
            <div className="headline">
              <span className="line1">Create And Sell</span>
              <span className="line2">Extraordinary</span>
              <span className="line3">Products</span>
            </div>
            <p>Adopt the peace of nature!</p>
          </div>
          <div className="footer-signup">
            <p>Don't have an account?</p>
            <Link to="/signup" className="signup-button">
              Sign Up
            </Link>
          </div>
        </div>
        <div className="right">
          <h2>Welcome Back!</h2>
          <div className="flex justify-between space-x-4">
            <FacebookLoginButton />
            <GoogleLoginButton />
          </div>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                id="email"
                placeholder="Enter Email"
                value={data.email}
                onChange={handleChange}
                required
                style={{ height: "40px" }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input.Password
                type="password"
                id="password"
                placeholder="Enter Password"
                value={data.password}
                onChange={handleChange}
                required
                style={{ height: "40px" }}
              />
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            <div className="form-footer">
              <p style={{ textAlign: "center" }}>
                Forgot your password? <a href="#">Click Here</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
