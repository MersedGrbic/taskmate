//importing routes
const router = require("express").Router();

const { request } = require("express");
//importing model schema
const TodoItemsModel = require("../Models/todoItemModel");

//post route
router.post("/api/item", async (req, res) => {
  try {
    const newItem = new TodoItemsModel({
      user: req.body.user,
      name: req.body.name,
      task: req.body.task,
    });
    const saveItem = await newItem.save();
    res.status(200).json(saveItem);
  } catch (error) {
    console.log(error);
  }
});
//get route
router.get("/api/items/:user", async (req, res) => {
  try {
    const allTodoItems = await TodoItemsModel.find({ user: req.params.user });
    res.status(200).json(allTodoItems);
  } catch (error) {
    console.log(error);
  }
});



//put router
router.put("/api/item/:id", async (req, res) => {
  try {
    const updateItem = await TodoItemsModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("item updated");
  } catch (error) {
    console.log(error);
  }
});

//delete router
router.delete("/api/item/:id",async(req,res)=>{
  try {
      const deleteItem = await TodoItemsModel.findByIdAndDelete(req.params.id);
      res.status(200).json('Item deleted')
  } catch (error) {
    console.log(error)
    
  }
})
module.exports = router;
