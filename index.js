import express, { json } from 'express';

const PORT = 3000;
const app = express();

app.use(json());

let memoryDB = [];
let id = 1;

// create new coffee menu || CREATE
app.post("/", (req, res) => {
   const { name, price } = req.body;
   const newMenu = { id: id++, name, price };
   memoryDB.push(newMenu);
   res.status(201).send({message : "New menu is added", newMenu});
});

// get all coffee menu || READ
app.get("/", (req, res) => {
   res.status(200).send(memoryDB);
});

// get one coffee menu || READ
app.get("/:id", (req, res) => {
   const { id } = req.params;
   const menu = memoryDB.find(m => m.id === parseInt(id));
   if (!menu) {
      return res.status(404).send({ message: "Menu not found" });
   }
   res.status(200).send(menu);
});

// update menu || UPDATE
app.put("/:id", (req, res) => {
   const { id } = req.params;
   const { name, price } = req.body;

   const menu = memoryDB.find(m => m.id === parseInt(id));
   if (!menu) {
      return res.status(404).send({ message: "Menu not found" });
   }

   menu.name = name;
   menu.price = price;
   res.status(200).send({ message: `Menu id - ${id} is updated.` });
});

// delete menu || DELETE
app.delete("/:id", (req,res) => {
   const {id} = req.params;
   const menuIndex = memoryDB.findIndex(m => m.id === parseInt(id));
   
   if (menuIndex === -1) {
      return res.status(404).send({ message: " Menu not found." });
   }

   memoryDB.splice(menuIndex, 1);
   res.status(200).send({ message: `Menu is deleted.` });
});

app.listen(PORT, () => {
   console.log("Express server is connected");
})