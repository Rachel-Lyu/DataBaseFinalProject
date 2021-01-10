module TicketsController
using Genie.Router, Genie.Renderer.Html, SearchLight, Genie.Renderer.Json
using SearchLight.QueryBuilder
using Tickets, TicketTypes, Comments, Users
using Dates

function allTickets()
    if Genie.Sessions.get(@params(:SESSION), :uid, nothing) === nothing 
        println(@params(:SESSION))
        # return Genie.Renderer.redirect("/login")
        # println("asdzzzzzzzzz\n\n\n\n\n\n")
    end
    sleep(0.02)
    tickets = all(Ticket)
    Dict("code" => 0, 
         "data" => [Dict(vcat([("tid", t.id.value)], 
                            [(k_name, getfield(t, k_name)) 
                                for k_name in fieldnames(eltype(tickets))])) 
                            for t in tickets]) |> json
end


function getOne(tid)
    ticket = SearchLight.findone(Ticket, id = tid)
    comments = SearchLight.find(Comment, where("tid = ?", tid))
#    getuid(uid::Int)::String = findone(User, id = uid).uid
    cmts = [Dict("cid" => c.id.value, "uid" => c.uid, 
                 "content" => c.comment, "time" => c.time, 
                 "anony" => c.anony) for c in comments]

    Dict("code" => 0,
         "data" => Dict(vcat([("tid", ticket.id.value), ("comments", cmts)], 
                        [(k_name, getfield(ticket, k_name)) 
                        for k_name in fieldnames(typeof(ticket))])) 
        ) |> json
end

function search(map)
    isFather = true
    keyword = "%" * get(map, "keyword", "") * "%"
    query = where("ticketName LIKE ?", keyword)

    type, city, bg, ed = get.(Ref(map), ["type", "city", "beginTime", "endTime"], "") 
    (type == "全部") && (type = "") 
    (city !== nothing && city != "全部") && (query += where("city = ?", city))
    if get(map, "sonType", "") !== nothing && get(map, "sonType", "") != "全部" 
        type = get(map, "sonType", "")
        query += where("typeName = ?", type)
    elseif type !== nothing
        sonTypes = SearchLight.find(TicketType, where("fatherName = ?", type)) 
        # println(join([t.typeName for t in sonTypes], "', '"))
        statement = "typeName in ('" * join([t.typeName for t in sonTypes], "', '") * "')"
        query += where(statement)
    end
    
    beginTime, endTime = DateTime(1800), DateTime(1800)
    if bg !== nothing
        beginTime = DateTime(replace(bg, " " => "T"))
        endTime = DateTime(replace(ed, " " => "T"))
        query += where("beginTime > ?", beginTime) + where("endTime < ?", endTime)
    end
    # println(query)
    tickets = SearchLight.find(Ticket, query)
    Dict("code" => 0, 
    "data" => [Dict(vcat([("tid", t.id.value)], 
                       [(k_name, getfield(t, k_name)) 
                           for k_name in fieldnames(eltype(tickets))])) 
                       for t in tickets]) |> json
end
end

