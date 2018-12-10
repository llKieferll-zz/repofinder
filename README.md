# About
A coding challenge that should be done in 7 days. Had to make it in 3,5 ~ 4 days, over half of it in a single weekend, since I wasn't able to start the challenge when it was sent. The goal was not to finish it perfectly, but to give a grasp of the coding style and how things are done.

Before anything, make sure you have both [yarn](https://yarnpkg.com/lang/en/docs/install/#windows-stable) and [node](https://nodejs.org/en/download/) installed before using these.

After that, you can either directly download the zip file to your pc and extract its contents or simply use the command `git clone https://github.com/llKieferll/repofinder.git`. Regardless of which, navigate to the root folder of the project (the one that contains the file called `package.json`) and then use the following commands:

```yarn```

```yarn serve```

The first command, `yarn`, will install everything needed. After that, `yarn serve` will start everything up using the vue cli 3 service. After everything is compiled successfully, open your browser and access the localhost url (http://localhost:8080)

The project is live at [https://adoring-pasteur-698913.netlify.com/](https://adoring-pasteur-698913.netlify.com/)

# Important

When running locally, it's advisable to open the `.env` file, create a variable called `VUE_APP_OAUTH_TOKEN` and set your github oauth token in it (e.g. `VUE_APP_OAUTH_TOKEN=abcdefghijkl1234567`). This is because the github api heavily limits the number of not authenticated requests that can be performed.

To create that token, follow these steps:

1 - Log in to Github
2 - Click on your profile picture on the top right corner
3 - Click on Settings
4 - On the left stacked menu, click on Developer Settings
5 - On the new left stacked menu, click on Personal access tokens
6 - On the right side, click on Generate new token
7 - If requested, input your password again
8 - Select the appropriate settings for your new token
9 - By the bottom of the page, click on Generate token

Take note of the big numbers and letters code that was generated (once you close the page, you'll not be able to see it ever again!). That code is the value you can set to `VUE_APP_OAUTH_TOKEN` in the `.env` file. Treat that token it as any important password and never share it with anyone. 

With that, the limit of requests able to be made is much higher and, because of that, the app will retrieve more information during its use (e.g. branches last commit message and author).

# Considerations

- Decided to use [Vue](https://vuejs.org/) with [Vuetify](https://vuetifyjs.com/en/) as both are amazing tools.

- Lack of time completely cut down any kind of unit testing.

- Fun challenge but I'm sure I would feel and perform better if it wasn't for the time constraint.

- Intended to, after finishing the functionalities, make them all REST, with everything being based on the URLs themselves. Will probably do that later on even after the challenge is over. I simply feel bothered when leaving something incomplete.
