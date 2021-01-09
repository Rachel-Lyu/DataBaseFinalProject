module CreateTableComments

import SearchLight.Migrations: create_table, column, primary_key, add_index, drop_table
function up()
  create_table(:comments) do
    [
      primary_key()
      column(:uid, :int, limit = 20)
      column(:tid, :int)
      column(:comment, :string, limit = 5000)
      column(:time, :datetime)
      column(:anony, :bool)
    ]
  end

  add_index(:comments, :tid)
end

function down()
  drop_table(:comments)
end

end
