module DbTicket

using Genie, Logging, LoggingExtras

function main()
  Base.eval(Main, :(const UserApp = DbTicket))

  Genie.genie(; context = @__MODULE__)

  Base.eval(Main, :(const Genie = DbTicket.Genie))
  Base.eval(Main, :(using Genie))
end

end
