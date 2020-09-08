# Magellan Code & Design Consulting

This repository contains the portfolio found at [bymagellan.co](https://bymagellan.co)

### Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites & Installing

You need to have gulp CLI, git and NPM installed globally on your machine. Then you can simply clone this repo and do:

```
npm install
```

### Building

```
gulp
```

Run to build the complete website from app/ to dist/.

### Running locally

```
gulp c
```

Runand find the project running on localhost:8080.

### Running via proxy

To test the page on multiple devices and under real-world scenarios, run:

```
lt --port 8080
```

Please note that you have to have localtunnel installed globally, as it doesn't come with this package. Additionally, a local server must be running on port 8080.

### Coding style

Please try to stick to the BEM naming scheme when modifying and proposing a push request.

```
.block__element--modifier
```
___

### PR

If you want to propose a push request, do so via GitHub.

### Built With

* [VS Code](https://code.visualstudio.com/) - The text editor used
* [Gulp.js](https://gulpjs.com/) - Workflow tool
* [Localtunnel](https://localtunnel.github.io/www/) - Local webserver Proxy
* [Unsplash](https://unsplash.com/) - Beautiful, free photos

### License

(c) Copyright 2020 Jonathan Arbely, all rights reserved.