from MomeJangScript.ConnectionFile import appconnection as ac

def createnewprofile(userID):
    c = ac().connection

    try:

        with c.cursor() as cursor:
            sql = "INSERT INTO PROFILE (UserID) VALUES (%s);"

            cursor.execute(sql, (userID))

            c.commit()

    except:
        print("ERROR OCCURED IN PROFILE CREATION")
    finally:
        c.close()
    return

def createnewuser(jsonDict):
    result = None
    c = ac().connection
    try:

        with c.cursor() as cursor:

            sql = "SELECT 1 FROM User WHERE UserName = %s;"

            cursor.execute(sql, (jsonDict["username"]))

            result = cursor.fetchall()

            if result.__len__() == 1:
                result = "ERROR: User already exists"
            else:
                sql = "INSERT INTO User (UserName, FirstName, LastName, Password) " \
                      "VALUES (%s, %s, %s, %s);"

                cursor.execute(sql, (jsonDict["username"], jsonDict["firstname"], jsonDict["lastname"], jsonDict["password"]))

                c.commit()

                sql = "SELECT UserID FROM User WHERE UserName = %s;"
                cursor.execute(sql, (jsonDict["username"]))

                result = cursor.fetchall()

                if result.__len__() == 1:
                    createnewprofile(result[0]["UserID"])
                    result = "SUCCESS: User created."
    except:
        result = "ERROR: Error occurred."
    finally:
        c.close()
        return result

def searchforuser(jsonDict):
    result = None
    c = ac().connection
    try:

        with c.cursor() as cursor:

            sql = "SELECT u.UserID, u.Username, u.FirstName, u.LastName, p.ProfilePicture, " \
                  "FROM User u " \
                  "INNER JOIN Profile p ON u.UserID=p.UserID " \
                  "WHERE MATCH (Username, FirstName, LastName) AGAINST (%s IN BOOLEAN MODE) " \
                  "LIMIT 20 OFFSET %s;"

            cursor.execute(sql, (jsonDict["parameter"], jsonDict["parameter"], jsonDict["offset"]))
            result = cursor.fetchall()

    finally:
        c.close()
        if result.__len__() == 0:
            return str(result)
        else:
            return result

def sendmessage(jsonDict):
    try:
        c = ac()

        with c.cursor() as cursor:

            sql = "INSERT INTO Message (FromUserID, ToGroupID, MessageText, MessageType, SentAt)" \
                  "VALUES (%s, %s, %s, %s, %s);"

            cursor.execute(sql, (jsonDict["fromuserid"], jsonDict["togroupid"], jsonDict["messagetext"], jsonDict["messagetype"], jsonDict["sentat"]))

        c.commit()
    except:
        #c.close()
        return "Message failed to send."

    finally:
        #c.close()
        return "Message sent."

def getmessage(jsonDict):
    try:
        c = ac()

        with c.cursor() as cursor:

            sql = "SELECT MessageID, MessageText, SentAt FROM Message WHERE ToGroupID = %s AND SentAt >= %s;"

            cursor.execute(sql, (jsonDict["ToGroupID"], jsonDict["SentAt"]))

        result = cursor.fetchall()

    except:
        c.close()
        return "Error retrieving messages."

    finally:
        c.close()
        return result

def getmessagehistory(jsonDict):
    try:
        c = ac().connection

        with c.cursor() as cursor:

            sql = "SELECT MessageID, MessageText, SentAt FROM Message WHERE ToGroupID = %s AND MessageID < %s" \
                  "LIMIT 20;"

            cursor.execute(sql, (jsonDict["ToGroupID"], jsonDict["MessageID"]))

        result = cursor.fetchall()

    except:
        c.close()
        return "Error retrieving messages."

    finally:
        c.close()
        if result.__len__() == 0:
            return "End of messages."
        else:
            return result

def saveuserstats(jsonDict):

    c = ac().connection

    try:
        with c.cursor() as cursor:

            sql = "INSERT INTO UserHistory (UserID, Exercise, Repetitions, Sets) VALUES (%s, %s, %s, %s);"

            cursor.execute(sql, (jsonDict["userid"], jsonDict["exercise"], jsonDict["repetitions"], jsonDict["sets"]))

            c.commit()

    except:
        return "Error saving stats."

    finally:
        c.close()
        return "Stats saved."



def decision(event, eventDict):
    if event == 'searchforuser':
        return searchforuser(eventDict)
    elif event == 'sendmessage':
        return sendmessage(eventDict)
    elif event == 'getmessage':
        return getmessage(eventDict)
    elif event == 'getmessagehistory':
        return getmessagehistory(eventDict)
    elif event == 'createnewuser':
        return createnewuser(eventDict)
    elif event == 'saveuserstats':
        return saveuserstats(eventDict)
    else:
        return "Invalid function name!"