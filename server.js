const express = require("express");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/happy", (req, res) => {
  res.render("happy");
});

app.post("/happy", (req, res) => {
  const name = req.body.name; // User's name
  const gender = req.body.gender; // User's gender
  const output = [] // array for the output song
  let pronoun = "he's"; //inital pronoun
  const guestee = []; // array for guests
  
  let dets = req.body;
  console.log(dets);

  let detsString = JSON.stringify(dets, null, 2);  // make the req body to a string
  detsString = detsString.replace(/[{}"]/g, ''); // remove the curly braces
  detsString = detsString.replace(/[,"]/g, ''); // remove the commas
 

  if (name == "" || gender == ""){
    output.push("Error. Fill put all details.")
  }

  if (gender === "female"){
    pronoun = "she's";
  }

  const song = [
    "happy", "birthday", "to", "you!",
    "happy", "birthday", "to", "you!",
    "happy", "birthday", "dear", `${name}`,
    "happy", "birthday", "to", "you!",
    `For ${pronoun} a jolly good fellow, For ${pronoun} a jolly good fellow, That nobody can deny!`]; //lyrics
  
  for (let i = 1; req.body[`name${i}`]; i++) {
    if(req.body[`checkbox${i}`]== "on"){
      guestee.push(req.body[`name${i}`]);
    }
  }
  console.log(guestee); // collects the name of the guests in a single array

  if (guestee.length > 0){
    for (let x =0; x <song.length; x++){
      let person = guestee[x % guestee.length];
      output.push(`${person}: ${song[x]}`);
    }
  } //finalizing the output

  console.log(output);

  
  res.render("happy", {Output1: output.join('\n'), Output2: detsString}); //handing the data to happy.hbs
});


// Start server
app.listen(port, () => console.log(`App listening on port ${port}`));
