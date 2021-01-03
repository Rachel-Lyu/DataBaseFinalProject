using Genie, Genie.Router, Genie.Requests
using TicketsController, UsersController, TicketTypesController, OrdersController

using Genie.Renderer.Json

# Genie.config.run_as_server = true

route("/") do
  serve_static_file("welcome.html")
end

route("/ticket/parentTypes") do 
  TicketTypesController.getParentTypes()
end

route("/ticket/sonTypes", method = POST) do 
  TicketTypesController.getSonTypes(jsonpayload())
end

route("/ticket/all") do
  TicketsController.allTickets()
end

route("/api/ticket/all") do
  TicketsController.allTickets()
end

route("/ticket/getOne") do 
  tid = parse(Int, @params(:ticketId))
  TicketsController.getOne(tid)
end

route("/ticket/search", method = POST) do 
  TicketsController.search(jsonpayload())  
end

route("/user/register", method = POST) do 
  UsersController.register(jsonpayload())
end

route("/order/createOrder") do 
  OrdersController.create(@params)
end

route("/order/selfOrder") do 
  OrdersController.getOrders(@params)
end

route("/order/deleteOrder") do 
  OrdersController.delete(@params)
end

route("/api/login") do 
  uid = haskey(@params, :id) ? @params(:id) : ""
  password = haskey(@params, :password) ? @params(:password) : ""
  UsersController.checkLogin(uid, password, @params)
end

route("/api/logout") do 
  UsersController.logout(@params)
end

# Genie.startup()
