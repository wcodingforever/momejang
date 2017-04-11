import pymysql.cursors

# Connect to the database
connection = pymysql.connect(host='localhost',
                             user='root',
                             password='1cptcrunch',
                             db='momejang',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

try:
    with connection.cursor() as cursor:

        sql = "DROP TABLE UserHistory;" \
              "DROP TABLE UserWorkout;" \
              "DROP TABLE Profile;" \
              "DROP TABLE Message; " \
                "DROP TABLE GroupUser; " \
                "DROP TABLE ChatRoom; " \
                "DROP TABLE FriendList; " \
                "DROP TABLE User; "

        cursor.execute(sql)


    # connection is not autocommit by default. So you must commit to save
    # your changes.
    connection.commit()


finally:
    connection.close()