import redis


# Connect to Redis
r = redis.Redis(host='localhost', port=6379, db=0)


# Subscribe to the channel
pubsub = r.pubsub()
pubsub.subscribe('my_channel')


print('Listening for events...')


# Listen for events
for message in pubsub.listen():
    if message['type'] == 'message':
        for i in range(3):
            print(i)
        print(f"Received message: {message['data'].decode('utf-8')}")
        # exit()


