import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {DeleteOutlined, EditOutlined}  from '@ant-design/icons'
import { Form, Input, message, Modal,Select,Table } from 'antd';
import { Button } from 'antd';
import DefaultLayout from '../components/DefaultLayout';


function ItemPage() {
const [itemData, setItemData] = useState([]);
const [popupModal, setPopupModal] = useState(false);
const [editItem, setEditItem] = useState(null);
const [deleteOrNot, setdeleteOrNot] = useState(false);


const getAllItems=async()=>{
  try {
      const {data} = await axios.get('/api/items/get-item')
      setItemData(data);

      console.log(data);
      
  } catch (error) {
      console.log(error);
  }
}

  useEffect(()=>{
    
    getAllItems();
},[popupModal, deleteOrNot])

//represent data in table
const columns =[
  {title: 'Name', dataIndex: 'name'},
  {title: 'Image', dataIndex: 'image', 
   render: (image,record)=> <img src={image} alt={record.name} height='60' width='60' />},
  {title: 'Price', dataIndex:'price'},
  {title: 'Actions', dataIndex:"_id", render:(id, record)=> <>
    <EditOutlined style={{cursor:'pointer'}}
    onClick={()=>{
      setEditItem(record);
      setPopupModal(true)
    }}
    />
    <DeleteOutlined 
      style={{cursor:'pointer'}}
      onClick={()=>handleDelete(record)}
    /> 
  </>
},

]

const handleSubmit=async  (value)=>{
  if(editItem ===null){

    try {
      await axios.post('/api/items/add-item',value)
      message.success("Item Added Sucessfully")
      setPopupModal(false)
    } catch (error) {
      message.error("Something Went wrong")
        console.log(error);
    }

  }
  else{

    try {
      await axios.put('/api/items/edit-item',{...value, itemId: editItem._id})
      message.success("Item Updated Sucessfully")
      setPopupModal(false)
    } catch (error) {
      message.error("Something Went wrong")
        console.log(error);
    }

  }
}

const handleDelete=async(record)=>{
  try {
    console.log(record._id)
    await axios.delete('/api/items/delete-item',{data:{itemId: record._id}})
    message.success("Item Deleted Sucessfully")
    setdeleteOrNot(!deleteOrNot);
    
  } catch (error) {
    message.error("Something Went wrong")
    setdeleteOrNot(!deleteOrNot);
      console.log(error);

  }
}


  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Item List</h1>
        <Button type='primary' onClick={()=> setPopupModal(true)}>Add Item</Button>

      </div>
      <Table columns={columns} dataSource={itemData} bordered/>
      
      {
        popupModal && (
          <Modal 
            title={`${editItem !==null ? 'Edit Item' : 'Add New Item'}`} 
            open={popupModal} 
            onCancel={()=>{
              setEditItem(null)
              setPopupModal(false)
            }} 
            footer={false}
            >

            <Form layout='vertical' initialValues={editItem} onFinish={handleSubmit}>
            <Form.Item name='name' label="Name">
              <Input/>
            </Form.Item>
            <Form.Item name='price' label="Price">
              <Input/>
            </Form.Item>
            <Form.Item name='image' label="Image Url">
              <Input/>
            </Form.Item>

            <Form.Item name='category' label='Category'>
              <Select>
                <Select.Option value="drinks">Drinks</Select.Option>
                <Select.Option value="rice">Rice</Select.Option>
                <Select.Option value="noodles">Noodles</Select.Option>
              </Select>
            </Form.Item>
            <div className="d-flex justify-content-end">
              <Button type='primary' htmlType='submit'>Save</Button>
            </div>
            </Form>
          </Modal>
        )
      }
    </DefaultLayout>
    
  );
}

export default ItemPage;
