module CommentsController
using Comments
using SearchLight, Genie.Renderer.Json, Genie.Requests, Genie.Router
using SearchLight.QueryBuilder
using Dates

  function createComment()
	dct = jsonpayload()
	println(dct)
    uid, tid, comment, anony = get.(Ref(dct), ["uid", "tid", "comment", "anony"], "")
	tid_ = parse(Int, string(tid))
	anony_ = parse(Bool, string(anony))
    Comment(SearchLight.DbId(), uid, tid_, comment, now(), anony_) |> SearchLight.save!
	println("保存成功")
    return Dict("code" => 0, "msg" => "success") |> json
  end

  function deleteComment()
    cid = @params(:cid)
    comment = findone(Comment, id = cid)
    SearchLight.delete(comment)
    return Dict("code" => 0, "msg" => "success") |> json
  end

  function modifyComment()
    cid = @params(:cid)
    anony = @params(:anony)
    comment = findone(Comment, id = cid)
    comment.comment = @params(:newcmt)
    comment.anony = anony
    comment |> save!
  end
  
  function getComments()
    tid = @params(:tid)
    comments = SearchLight.find(Comment, where("tid = ?", tid))
    Dict("code" => 0, "data" => Dict("comments" => [Dict(vcat([("content", c.comment), ("cid", c.id.value)], 
                            [(k_name, getfield(c, k_name)) 
                                for k_name in fieldnames(eltype(comments))])) 
                            for c in comments])) |> json
  end
end
