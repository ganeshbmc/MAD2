from flask import Flask
from flask_caching import Cache
import time

config = {
    "DEBUG": True,
    "CACHE_TYPE": "RedisCache",
    "CACHE_REDIS_URL": "redis://localhost:6379/1",
    "CACHE_DEFAULT_TIMEOUT": 300
}

app = Flask(__name__)
app.config.from_mapping(config)
cache = Cache(app)


@app.get('/name/<name>')
@cache.cached(timeout=100)
def get_name(name):
    time.sleep(30)
    return name

if __name__ == "__main__":
    app.run()


# What happens when you run the above code?
# Suppose the application is running on "http://localhost:5000". If the client makes two requests to URL "http://localhost:5000/name/Mohan" and "http://localhost:5000/name/Sohan" within 50 seconds. What will be the approximate difference in the time taken to serve the two requests?
# 0 seconds or 30 seconds?
# 30 seconds
# Please explain your answer.
# The first request will take 30 seconds to serve. The second request will be served from the cache and will take 0 seconds to serve.
# What is the purpose of the above code?
# To cache the response of the API call.
# If the client makes requests to URL "http://localhost:5000/name/HulkHogan", will it respond from cache or by running the function?
# It will respond from cache.

