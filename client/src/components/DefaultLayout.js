import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined ,
    UserOutlined,
    LogoutOutlined,
    CopyOutlined,
    UnorderedListOutlined,
    ShoppingCartOutlined,
   
  } from '@ant-design/icons';
  import { Layout, Menu, theme } from 'antd';
  import React, {  useState, useEffect } from 'react';
  import {useSelector} from 'react-redux'
  import '../styles/DefaultLayout.css';
  import { Link, useNavigate } from 'react-router-dom';
// import { rootReducer } from './../redux/rootReducer';

  const { Header, Sider, Content } = Layout;


  const DefaultLayout = ({children}) => {
    const {cartItems}= useSelector(state=> state.rootReducer)
    const [collapsed, setCollapsed] = useState(false);
    const navigate= useNavigate();
    const {
      token: { colorBgContainer },
    } = theme.useToken();

    //to store cart in local storage
    useEffect(()=>{
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
    },[cartItems])



    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" >
            <h2 className='text-center text-light fs-2 mt-4'>Food Mela</h2>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={window.location.pathname}
            
          >
            <Menu.Item key='/' icon={<HomeOutlined />}>
                <Link to='/'>Home</Link>
            </Menu.Item>
            <Menu.Item key='/bills' icon={<CopyOutlined />}>
                <Link to='/bills'>Bills</Link>
            </Menu.Item>
            <Menu.Item key='/items' icon={<UnorderedListOutlined />}>
                <Link to='/items'>Items</Link>
            </Menu.Item>
            <Menu.Item key='/customers' icon={<UserOutlined />}>
                <Link to='/customers'>Customers</Link>
            </Menu.Item>
            <Menu.Item key='/logout' icon={<LogoutOutlined />}
              onClick={()=>{
                localStorage.removeItem('auth')
                localStorage.removeItem('cartItems')
                navigate('/login')
              }}
            >
               Logout
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}

            <div className="cart-item" onClick={()=>navigate('/cart')}>
              <p>{cartItems.length}</p>
              <ShoppingCartOutlined/>

            </div>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  };
  export default DefaultLayout;