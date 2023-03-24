const itemModel = require('../models/itemModel')

//get Items
const getItemController=async(req, res)=>{
    try {
        const items = await itemModel.find()
        // console.log(items);
        res.status(200).send(items)
    } catch (error) {
        console.log(error);
    }
}

//add Items
const addItemController=async(req, res)=>{
    try {
        const newItem = new itemModel(req.body)
        await newItem.save();
        res.status(200).send("Item created Successfully")
    } catch (error) {
        
        res.status(400).send('error', error)
        console.log(error);
    }
}

//update item
const editItemController=async(req, res)=>{
    try {
        await itemModel.findOneAndUpdate({_id: req.body.itemId}, req.body,{
            new:true,
        })
        res.status(201).send('Item Updated!')

    } catch (error) {
        res.status(400).send(error)
        console.log(error);
    }
}

//delete Item
const deleteItemController=async(req,res)=>{
    
    try {
        const {itemId}= req.body
        console.log(req.body)
        await itemModel.findOneAndDelete({_id: itemId})
        res.status(200).send('Item Deleted!')

    } catch (error) {
        res.status(400).send(error)
        console.log(error);
    }
}


module.exports = {deleteItemController, getItemController, addItemController, editItemController}