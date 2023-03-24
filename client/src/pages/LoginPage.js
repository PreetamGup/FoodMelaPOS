import { Form, Input, Button } from "antd";
import React,{useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

const LoginPage = () => {
  const navigate= useNavigate()
const handleSubmit=async(value)=>{
  try {
    const res = await axios.post('/api/users/login', value)
    if(res.data.message!=="Login Fail"){
      console.log(res);
      message.success("User Login Sucessfully")
      localStorage.setItem('auth', JSON.stringify(res.data));
      navigate('/')
    }else{
      message.error("Incorrect credential")
    }
    
  } catch (error) {
    message.error("Something Went wrong")
      console.log(error);
  }
}

//current login user

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
          <h3>Login page</h3>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between fs-5">
              <p>
                Not a User Please
                <Link to="/register"> Register Here</Link>
              </p>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
