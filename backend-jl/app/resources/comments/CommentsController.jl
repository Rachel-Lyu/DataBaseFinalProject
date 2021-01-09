module CommentsController
using Comments
using SearchLight, Genie.Renderer.Json
using Dates

  function createComment()
    uid, tid, comment, anony = get.(Ref(@params), [:uid, :tid, :comment, :anony], "")
    Comment(SearchLight.DbId(), uid, tid, now(), anony) |> SearchLight.save!
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
  
end
