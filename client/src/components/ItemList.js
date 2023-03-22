import React from "react";
import { Button,Card } from "antd";
import { useDispatch } from "react-redux";

function ItemList({ item }) {
  const { Meta } = Card;
  const dispatch= useDispatch()

  const handleCart=()=>{
    dispatch({
      type: 'AddToCart',
      payload: {...item, quantity:1},
    })
  }

  return (
    <div>
      <Card
        hoverable
        style={{
          width: 200,
          marginBottom: 20
        
        }}
        cover={
          <img
            alt={item.name}
            src={item.image}
            style={{
              height: 200,
            }}
          />
        }
      >
        <Meta title={item.name}  />
        <div className="item-button">
          <Button onClick={()=>handleCart()}>Add to cart</Button>
        </div>
      </Card>
    </div>
  );
}

export default ItemList;
