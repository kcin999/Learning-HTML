# Overview
This was originally just the [Learning-HTML](/Learning-HTML) Folder. 

I had some exposure to proper frontend/backend development and wanted to explore this using [Python Flask](https://flask.palletsprojects.com/en/2.1.x/) and [Angular JS](https://angularjs.org/). I am not sure what the goal of my frontend and backend project will be however. Just going to do some development. Want to work in data somehow. 

Going to walk away from the games though in [Learning-HTML](/Learning-HTML). That was just a fun little side project. Really want to get into some data especially with MLB.

What do I want to visualize:
1. Stats over time (Homeruns, wins, etc)
2. Compare Team Stats (BA, OBP, OPS) with wins on a line graph
3. Probaly tie in some other projects as well that I have done in the past (March Madness, Robinhood, etc.)

# To Start The Backend.
1. Make sure that python is installed.
2. Make sure you are in the root directory.
3. Run `pip install -r requirements.txt` to install all dependencies
4. Set Environment Variables on you system:
```

```
5. Run `python -m backend`. You will see an alert in terminal saying 'Service Flask app'.
	It defaults to being run at localhost:8000.

# To Start The Frontend. 
1. Navigate to the frontend folder
2. Run `npm install` to install all dependencies.
3. Update both [environment.prod.ts](/frontend/src/environments/environment.prod.ts) and [environment.ts](/frontend/src/environments/environment.ts) to make sure that the backendurl matches the url of your flask application
4. Run `ng serve` to start the application.
5. Navigate to localhost:4200 and you see the application. 
