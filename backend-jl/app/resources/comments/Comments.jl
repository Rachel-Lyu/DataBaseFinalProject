module Comments

import SearchLight: AbstractModel, DbId, save!
import Base: @kwdef
import Dates: DateTime
export Comment

@kwdef mutable struct Comment <: AbstractModel
  id::DbId = DbId()
  uid::Int = 0
  tid::Int = 0
  comment::String = ""
  time::DateTime = DateTime(2020)
  anony::Bool = false
end

function seed()
  Comment(DbId(), 1, 1, "挺好看的", DateTime("2020-12-20T08:00:00"), false) |> save!
end

end
