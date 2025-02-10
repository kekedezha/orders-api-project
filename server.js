const express = require("express"),
  server = express(),
  fs = require("fs"),
  orderData = require("./orders");

server.set("port", process.env.PORT || 3000);

server.get("/", (request, response) => {
  response.send("Welcome to our simple online order managing web app!");
});

//Add the /orders code here!
server.get("/orders", (request, response) => {
  response.json(orderData);
});

//Add the /neworder code here!
//use express.json() middleware to parse an incoming POST request with new order data
server.post("/neworder", express.json(), (request, response) => {
  orderData.orders.push(request.body);
  fs.writeFileSync("orders.json", JSON.stringify(orderData));
  response.send("Successful request. Created new order.");
  console.log("Successful request. Created new order");
});

//Add the /update/:id code here!
//use express.text() middleware to parse
server.put(
  "/update/:id",
  express.text({ type: "*/*" }),
  (request, response) => {
    var items = orderData.orders;

    items.forEach(function (o) {
      console.log(o);
      if (o.id == request.params.id) {
        console.log("Modifying order!");
        o.state = request.body;
      }
    });

    fs.writeFileSync("orders.json", JSON.stringify(orderData));

    response.send("Successful order update for matching id.");
    console.log("Successful order update for matching id.");
  }
);

//Add the /delete/:id code here!

server.listen(3000, () => {
  console.log("Express server started at port 3000");
});
