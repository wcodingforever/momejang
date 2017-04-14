class CodeHelper:

    def buildJSONreturn(code, message, results=0):
        if results == None:
            results = 0
        else:
            results = str(results).replace("'", '"').replace(': None', ': "None"')
        body = '"code" : {}, "message" : "{}", "results" : {}'.format(code, message, results)
        return "{" + body + "}"

