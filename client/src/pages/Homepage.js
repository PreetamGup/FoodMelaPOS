import React,{useEffect, useState} from 'react';
import axios from 'axios';
import ItemList from '../components/ItemList';
import { Col, Row } from 'antd';
import DefaultLayout from '../components/DefaultLayout';


function Homepage() {
    const [itemData, setItemData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('drinks');
    const categories =[
        {
            name : "drinks",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/430/430561.png"
        },

        {
            name : "rice",
            imageUrl : "https://cdn-icons-png.flaticon.com/512/3174/3174880.png"
        },

        {
            name: "noodles",
            imageUrl : "https://cdn-icons-png.flaticon.com/512/1471/1471262.png"
        }
    ]

    useEffect(()=>{
        const getAllItems=async()=>{
            try {
                const {data} = await axios.get('/api/items/get-item')
                setItemData(data);

                console.log(data);
                
            } catch (error) {
                console.log(error);
            }
        }

        getAllItems();
    },[])

    

  return (
    
        <DefaultLayout>
            <div className='d-flex'>
                {categories.map(category=>(
                    <div  key={category.name} 
                        className={`d-flex category ${selectedCategory === category.name && "category-active"}`}
                        onClick={()=> setSelectedCategory(category.name)}
                        >
                        <h4>{category.name}</h4>
                        <img src={category.imageUrl} alt={category.name} height='40' width='60' />
                    </div>
                ))}
            </div>
            <Row>
            {
                itemData.filter(item=> item.category===selectedCategory).map(item=>(
                    <Col xs={24} md={12} lg={6} sm={6}>
                        <ItemList key={item.id} item={item}/>    
                    </Col>
                ))
            }
            </Row>
        </DefaultLayout>
    
  );
}

export default Homepage;
