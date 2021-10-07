# Restaurant reviewer website
Single-page application built using CSS, HTML, Javascript and Node.js. Most of the content is dinamically generated using DOM, only the front page being built in HTML. The application is connected to a MongoDB database using MongoDB’s Node.js driver so that users can interact with the database of restaurants and articles. Features a Markdown to HTML parser so that users can write formatted articles using Markdown.

More features such as searching restaurants by name and filtering based on more criteria are going to be added in the new versions.

Available at: https://reviewr.azurewebsites.net/. Might take longer to load.

## Installation
Download and install [Node.js](https://nodejs.org/en/download/).

(Optional) Install the [Nodemon](https://www.npmjs.com/package/nodemon) package using the following command run in the main directory of the project.

```bash
node install -g nodemon
```

## Usage
Double-click the start.bat file.
If you didn't install the Nodemon package, you should edit the bat and replace "nodemon index.js" with "node index.js".
