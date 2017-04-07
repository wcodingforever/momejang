import pymysql

class appconnection:

    def __init__(self):
        self.connection = pymysql.connect(host='localhost',
                        user='root',
                        password='xf903hu3332zdmc9oka039cjmkdl',
                        db='momejang',
                        charset='utf8mb4',
                        cursorclass=pymysql.cursors.DictCursor)