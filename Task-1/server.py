import asyncio
import websockets

# List to store connected clients
clients = set()

async def chat_server(websocket, path):
    # Add the connected client to the set
    clients.add(websocket)
    try:
        async for message in websocket:
            # Broadcast the received message to all connected clients
            for client in clients:
                await client.send(message)
    finally:
        # Remove the disconnected client from the set
        clients.remove(websocket)

# Start the WebSocket server
start_server = websockets.serve(chat_server, "0.0.0.0", 8080)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
