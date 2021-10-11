# Restaurant reviewer website
Single-page application built using CSS, HTML, Javascript and [Node.js](https://nodejs.org/en/). Most of the content is dinamically generated using DOM, only the front page being built in HTML. The application is connected to a [MongoDB](https://www.mongodb.com/) database using MongoDB’s Node.js driver so that users can interact with the database of restaurants and articles. Features a Markdown to HTML parser so that users can write formatted articles using Markdown.

More features such as searching restaurants by name and filtering based on more criteria are going to be added in the new versions.

Demo available at: https://reviewr.azurewebsites.net/. Might take longer to load.

## Installation
Download and install [Node.js](https://nodejs.org/en/download/).

(Optional) Install the [Nodemon](https://www.npmjs.com/package/nodemon) package using the following command run in the main directory of the project. It enables the auto-restart of the aplication when a file of the project is modified. Recommended if you want to modify the application.

```bash
node install -g nodemon
```

## Usage
[Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) or [download](https://www.itprotoday.com/development-techniques-and-management/how-do-i-download-files-github) the application.

Double-click the start.bat file. The website will be available to use at [localhost:3000](https://localhost:3000/).

Alternatively, it can be started using a command prompt command run in the main directory of the project as such:

```bash
nodemon index.js
```

If you didn't install the nodemon package, replace 'nodemon' with 'node' in the aforementioned command and/or in the bat file.
