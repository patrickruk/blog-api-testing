const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {type: String, enum:["admin","editor","user"], default: "user"}
});

bcrypt.hash(req.body.password, 10, (err, hash) => {
  const newUser = new User({ username: req.body.username,password: hash, role: req.body.role }); 
  newUser.save();   
});
 
bcrypt.compare(hash, req.body.password, (err, result) => {
  if (!result) return res.status(401).json({ message: "Authentication failed" });
  else {
       const token = jwt.sign({ userId: user._id, role: user.role }, "secretKey", { expiresIn: "1h" });
  }
 });

function authMiddleware(req,res,next) {

  const authHeader = req.header.authorization;
  if(!authHeader) return res.status(401).send("Failed to have jwt");

  const token = authHeader.split(" ")[1];

  jwt.verify(token,bcrypt.hash,(err,decoded) => {
  if(err) return res.status(401).send("invalid token");
  
  req.user = decoded;
  next();  
})
};

function roleMiddleware(role){

  return (req,res,next) => { 
  if(!req.user) return res.send(403).send("not authenticated");

  if(req.user.role !== user.role || user.admin){
  return res.status(403).send({message: "not allowed"});
  }
  next();
  };
}

app.get("admin",authMiddleware,roleMiddleware("admin"),(req,res) => {
  res.send("welcome admin" + req.user.name);
});

app.get("admin",authMiddleware,roleMiddleware("user"),(req,res) => {
  res.send("welcome user" + req.user.name);
});

app.get("admin",authMiddleware,roleMiddleware("editor"),(req,res) => {
  res.send("welcome editor" + req.user.name);
});

app.post("/posts", authMiddleware, roleMiddleware("editor"), createPost);

app.delete("/posts/:id", authMiddleware, roleMiddleware("admin"), deletePost);
