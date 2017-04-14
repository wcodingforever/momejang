import pymysql

class appconnection:

    def __init__(self):
        self.connection = pymysql.connect(host='localhost',
                        user='root',
                        password='1cptcrunch',
                        db='momejang',
                        charset='utf8mb4',
                        cursorclass=pymysql.cursors.DictCursor)