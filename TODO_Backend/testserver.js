
const port = 3001
const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(cors());
  function findIndex(arr, id) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) return arr[i];
    }
    return -1;
  }
  
  function removeAtIndex(arr, index) {
    let newArray = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id !== index) newArray.push(arr[i]);
      // console.log(newArray);
    }
    return newArray;
  }


  app.get('/todos', (req, res) => {
    fs.readFile("tododata.json", "utf8", (err, data) => {
      if (err) throw err;
      if (!data) {
        return res.status(404).json({ error: "No data found" });
    }
      res.json(JSON.parse(data));
    });
  });


  app.get('/todos/:id',(req,res)=>{
    fs.readFile("tododata.json", "utf8", (err, data) => {
        if (err) throw err;
        if (!data) {
          return res.status(404).json({ error: "No data found" });
      }
       const todos=JSON.parse(data);
       const todoIndex=findIndex(todos,parseInt(req.params.id))
       if (todoIndex === -1) {
        res.status(404).send();
      } else {
        res.json(todos[todoIndex]);
      }
      });
  })

  app.post('/todos',(req,res)=>{
    const newtodo={
        id: Math.floor(Math.random() * 1000000),
        title: req.body.title,
        description: req.body.description
    }
    fs.readFile('tododata.json','utf-8',(err,data)=>{
        if(err) throw err;
        const todos=JSON.parse(data);
        todos.push(newtodo);
        fs.writeFile("tododata.json", JSON.stringify(todos), (err) => {
            if (err) throw err;
            res.status(201).json(todos);
          });
    })
  })


app.put('/todos/:id',(req,res)=>{
    fs.readFile('tododata.json','utf-8',(err,data)=>{
        if(err) throw err;
        const todos = JSON.parse(data);
        const todoindex=findIndex(todos, parseInt(req.params.id));
        if(todoindex==-1)
        {
            res.status(404).send();
        }
        else
        {
            const updatedtodo={
                id: Math.floor(Math.random() * 1000000),
                title: req.body.title,
                description: req.body.description
            }
            todos[todoindex]=updatedtodo;
            fs.writeFile("tododata.json", JSON.stringify(todos), (err) => {
                if (err) throw err;
                res.status(200).json(updatedTodo);
              });
        }
    })
  })
 app.delete('/todos/:id',(req,res)=>{
    fs.readFile('tododata.json','utf-8',(err,data)=>{
        if(err){throw err;}
        var todos=JSON.parse(data);
        var todoindex=findIndex(todos,parseInt(req.params.id))
        if (todoindex.id === -1 || !todoindex.id) {
            res.status(404).send("NOt douns");
          } else {
            todos = removeAtIndex(todos, todoindex.id);
            fs.writeFile("tododata.json", JSON.stringify(todos), (err,data) => {
              if (err) {
                res.status(500).send('Error updating data');
              } else {
                res.status(200).json(todos);
              }
            });
          }
    })
 })

app.use((req, res, next) => {
  res.status(404).send();
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})