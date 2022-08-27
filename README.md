# PaperDrop

An app that allows you to drop anonymous messages based on your location.

Instructions:
- Make sure your location services are turned on when using the app.
- Users can read messages dropped by other users, given they are within the range of the message(50m).
- Users can see messages up to 2km radius on the map.
- A drop expires when 10 people have read it.
- At any given point a user can only have 10 active drops. To create new drops they either delete existing drops or wait for them to expire.
- Happy hunting! :)

🌏 Live link: [https://devdevgo.site](https://devdevgo.site)


### Screenshots

![Login Page](https://i.imgur.com/qjhg8gF.png)
![Playground Page](https://i.imgur.com/xADKcQj.png)
![Architecture](https://i.imgur.com/zhUSwPW.png)

# Overview video (Optional)

Here's a short video that explains the project and how it uses Redis:

[Insert your own video here, and remove the one below]

[![Embed your YouTube video](https://i.ytimg.com/vi/vyxdC1qK4NE/maxresdefault.jpg)](https://www.youtube.com/watch?v=vyxdC1qK4NE)

## How it works

Since the main focus of the app are message drops(or just drops), I'll mainly focus on that.

### How the data is stored:

A drop document in MongoDB looks like this:
```ts
   _id: ObjectId,
   user: ObjectId,
   message: string,
   location: {
         type: 'Point',
         coordinates: [number, number] // [longitude, latitude]
   },
   readBy: ObjectId[], // array of user IDs
   isAnonymous: boolean,
   isExpired: boolean,
   isDeleted: boolean,
   createdAt: Date,
   updatedAt: Date
```

Whenever a drop is created it is stored in MongoDB. But at the same time the `_id`/ and the `location` is also stored in redis.

Redis query:
```js
   await redisClient.geoAdd('drops', {
         longitude,
         latitude,
         member: drop.id,
   });
```

Notice the use of `id` instead of `_id`, that's because I get a lean doc after saving to MongoDB which is more performant.

### How the data is accessed:

Whenever any user requests for drops, following steps happen:
1. Check redis cache for the query. If available, return the data to user.
2. If not, use `GEORADIUS` to fetch all the doc IDs within 2kms of range.
3. Find all the docs with retrieved IDs.
4. Save the result in cache for 30s and send the data back to the user.

When this user requests again, we'll already have the data in redis cache.

Redis queries:
1. Fetching from cache
```js
const redisKey = `nearby-drops:${req.decoded.id}`;
const cachedDrops = await redisClient.get(redisKey);
```
2. Fetching using `GEORADIUS` on cache miss
```js
const dropIds = await redisClient.geoRadius(
   'drops',
   { latitude, longitude }, // these are received in req body
   2,
   'km'
);
```


## How to run it locally?

1. After cloning the repo, go to `/client` directory.
2. Run `npm i`.
3. Create a `.env` file, which should have following env vars.
```
REACT_APP_MAPBOX_TOKEN=YOUR_TOKEN_HERE
REACT_APP_API=http://localhost:5000/api
```
4. Run `npm start`, this will start the React client on PORT 3000.
5. To run the server, go to `/server` directory.
6. Run `npm i`.
7. Create a `.env` file, which should have following env vars.
```
SECRET=random_string
DB_URL=mongodb+srv://[username]:[password]@[host]/[database]?retryWrites=true&w=majority
REDIS_DB_URL=redis://[username]:[password]@[host]:17570
PORT=5000
```
8. Run `npm start`.
9. Finally, go to http://localhost:3000 to use the app.

Note: I have used [Redis cloud](https://redis.com/redis-enterprise-cloud/overview/) and [MongoDB Atlas](https://www.mongodb.com/atlas/database) for my DBs. You can find all the credentials on both the platforms. For [Mapbox](https://www.mapbox.com/), you can create an account with them to get your API token.

### Prerequisites

Node: v16 LTS

### Local installation

No local installation is required except Node. Everything else is on cloud.

## Deployment

For deployment on any linux node, perform the same steps as local setup. Just don't run `npm start`.
For client:
1. Run `npm run build --prod`. This will create a `build` directory.
2. Move this directory into `/server` directory where our backend is.
3. Install pm2 using `npm i -g pm2`
4. Deploy the project using `pm2 start app --name paper-drop`

This will run the project on `http://[YOUR_IP]:5000`. Further, you can use nginx for reverse proxy and domain setup.


## More Information about Redis Stack

Here some resources to help you quickly get started using Redis Stack. If you still have questions, feel free to ask them in the [Redis Discord](https://discord.gg/redis) or on [Twitter](https://twitter.com/redisinc).

### Getting Started

1. Sign up for a [free Redis Cloud account using this link](https://redis.info/try-free-dev-to) and use the [Redis Stack database in the cloud](https://developer.redis.com/create/rediscloud).
1. Based on the language/framework you want to use, you will find the following client libraries:
    - [Redis OM .NET (C#)](https://github.com/redis/redis-om-dotnet)
        - Watch this [getting started video](https://www.youtube.com/watch?v=ZHPXKrJCYNA)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-dotnet/)
    - [Redis OM Node (JS)](https://github.com/redis/redis-om-node)
        - Watch this [getting started video](https://www.youtube.com/watch?v=KUfufrwpBkM)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-node/)
    - [Redis OM Python](https://github.com/redis/redis-om-python)
        - Watch this [getting started video](https://www.youtube.com/watch?v=PPT1FElAS84)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-python/)
    - [Redis OM Spring (Java)](https://github.com/redis/redis-om-spring)
        - Watch this [getting started video](https://www.youtube.com/watch?v=YhQX8pHy3hk)
        - Follow this [getting started guide](https://redis.io/docs/stack/get-started/tutorials/stack-spring/)

The above videos and guides should be enough to get you started in your desired language/framework. From there you can expand and develop your app. Use the resources below to help guide you further:

1. [Developer Hub](https://redis.info/devhub) - The main developer page for Redis, where you can find information on building using Redis with sample projects, guides, and tutorials.
1. [Redis Stack getting started page](https://redis.io/docs/stack/) - Lists all the Redis Stack features. From there you can find relevant docs and tutorials for all the capabilities of Redis Stack.
1. [Redis Rediscover](https://redis.com/rediscover/) - Provides use-cases for Redis as well as real-world examples and educational material
1. [RedisInsight - Desktop GUI tool](https://redis.info/redisinsight) - Use this to connect to Redis to visually see the data. It also has a CLI inside it that lets you send Redis CLI commands. It also has a profiler so you can see commands that are run on your Redis instance in real-time
1. Youtube Videos
    - [Official Redis Youtube channel](https://redis.info/youtube)
    - [Redis Stack videos](https://www.youtube.com/watch?v=LaiQFZ5bXaM&list=PL83Wfqi-zYZFIQyTMUU6X7rPW2kVV-Ppb) - Help you get started modeling data, using Redis OM, and exploring Redis Stack
    - [Redis Stack Real-Time Stock App](https://www.youtube.com/watch?v=mUNFvyrsl8Q) from Ahmad Bazzi
    - [Build a Fullstack Next.js app](https://www.youtube.com/watch?v=DOIWQddRD5M) with Fireship.io
    - [Microservices with Redis Course](https://www.youtube.com/watch?v=Cy9fAvsXGZA) by Scalable Scripts on freeCodeCamp
