from MomeJangScript.ConnectionFile import appconnection as ac
import json

c = ac().connection

with c.cursor() as cursor:
    sql = "SELECT A, B, C FROM testTable";

    cursor.execute(sql)
    result = cursor.fetchall()
print(type(result))
print(result)
print(str(result))
print(type(result[0]["A"]))
print(result[0]["A"])

x = json.JSONEncoder().encode(result)

print(x)