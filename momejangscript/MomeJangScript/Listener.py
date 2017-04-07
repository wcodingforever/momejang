import asyncio, websockets, json
from MomeJangScript.EventFile import decision

async def master(websocket, path):
        task = await websocket.recv()
        print(task)
        event = json.loads(task)
        result = str(decision(event["event"], event["payload"]))
        print(result)
        result = json.JSONEncoder().encode(result)
        await websocket.send(result)

PORT = 8001
start_server = websockets.serve(master, '192.168.1.193', PORT)
print("Serving at port", PORT)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
