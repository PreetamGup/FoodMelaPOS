import { Form, Input, Button, message } from "antd";
import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate()

  const handleSubmit = async(value) => {
    try {
      
      await axios.post("/api/users/register", value);
      message.success("Register Succesfully");
      navigate("/login");
      
    } catch (error) {
     
      message.error("Something Went Wrong");
      console.log(error);
    }
  };

  useEffect(()=>{
    if(localStorage.getItem('auth')){
      navigate('/')
    }
  }, [navigate])

  return (
    <>
      <div className="register">
        <div className="register-form">
          <h1>POSS APP</h1>
          <h3>Register page</h3>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between fs-5">
              <p>
                Already Register Please
                <Link to="/login"> Login Here</Link>
              </p>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
