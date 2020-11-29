# installation : development cycle and deployment

### cats living with dogs
The JavaScript development ecosystem is an active, varied, dynamic place.  JavaScript itself is a bit unusual, straddling realms other programming languages don't.  (A typical Javascript program isn't installed by the user, but nor does it execute on the server it came from;  but even though it is running locally, it does not enjoy all the normal access that a local program does;  etc.)  There are a great many tools within the JavaScript development ecosystem; new arrivals are a regular occurrance, some fade away in short order, and those that stay change rapidly.  The low barrier to entry for JavaScript means there are a great many people trying a great many things and offering a great deal of advice.  All of this makes it hard to find solid footing when working with JavaScript, and exceedingly easy to find information that is passé, incomplete, or even outright incorrect.

Thus, I want to be very clear upfront about the nature, structure, and tooling that constitutes [piccolo](https://github.com/landru27/piccolo).  My aim is to leave no ambiguity for how it all works together, and no guessing about how to make `piccolo` work in a given situation.

`piccolo` consists of a client portion and a server portion.  As with a great deal of modern networked software, the client portion itself acts as a server to other parts of the overall usage chain.  It is not itself a server _per se_, but it acts more-or-less like one, and anyway is accessed through a web server.  Specifically, the client portion sits between the end user's web browser, acting as a server with the browser as client; then, as part of doing what it does, the `piccolo` client portion exchanges certain information with the `piccolo` server portion.

The `piccolo` client and server portions are each written as [Node.js](https://nodejs.org/) applications.  This allows for a natural way to structure the JavaScript into a code hierarchy, and allows for a robust way to make use of the galaxy of existing JavaScript third-party libraries, in the form of [npm](https://www.npmjs.com/) modules.

The `piccolo` client portion is accessed through a web browser, and so must be transformed from a Node.js hierarchy into a monolith suitable for how the browser will treat it.  This project therefore includes a simple, sample website and details for how to accomplish this transformation.

The `piccolo` server portion is deployed as-is, as a Node.js application.  It includes a minimal HTTP access point for receiving data sent to it, and for sending data requested from it.  Thus, where the client is made up of code that the browser will execute, the server exchanges data, and any associated code execution takes place behind that access point.  The primary consumer of the `piccolo` server is, of course, the `piccolo` client.  But of course anything that talks HTTP (such as a web browser) can send data to and retrieve data from the `piccolo` server.  This can be useful for checking on things during development, but is rarely useful beyond that.  The `piccolo` client and server use [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) to communicate.

### overview
As a preface to the installation details below, here is a list of tools used by the `piccolo` project, in summary form:
* [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) - code hierarchy and library/package management
* [eslint](https://eslint.org/) - code sanity
* [jest](https://jestjs.io/) - unit testing
* [snowpack](https://www.snowpack.dev/) - development cycle unbundled code execution
* [webpack](https://webpack.js.org/) - deployment bundling for browser usage

Below are notes on installing `piccolo`, both for development and for usage.

During development, the `piccolo` client is accessed in a nearly direct manner, so that the developer can work with the source files within the hierarchy in which they exist.  This greatly speeds up development cycles, by eliminating the need for bundle and publish steps.  This is accomplished with [snowpack](https://www.snowpack.dev/), which performs a kind of on-the-fly micro-bundling that is unobtrusive to the ongoing development work.  (Technically, the browser sees bundled JavaScript, but `snowpack` does it in such a way that for the developer's work cycle, it's as if the browser is working directly from the source code.)

For deployment, the `piccolo` client is bundled in to a monolithic JavaScript file that packages together everything pertinent from the source code hierarchy.  Of course, this can be periodically done during development, too, and it's good to exercise the deployment process regularly.  `piccolo` uses [webpack](https://webpack.js.org/) for this.

For both development and deployment, the `piccolo` server exists as a Node.js application.  The `piccolo` server application already contains what it needs to provide access to the functions it provides.  Therefore, during development you can work directly in the server code, and have the `piccolo` client point at that same place, by how you set up the port the server listens on;  for deployment, the installation will be like the development area, with the dev-specific tools stripped out.  (I am also looking into the potential benefits of a bundled `piccolo` server deployment option.)

### prerequisites
The following software needs to be installed in order to proceed with installing `piccolo`.  Likely, you already have these installed, assuming you were looking for this project and didn't, say, stumble upon it randomly.  But if not already installed, visit the Node.js site for installation instructions; `npm` will be installed as part of installing `nodejs`.
* [nodejs](https://nodejs.org/)
* [npm](https://www.npmjs.com/) (installed by installing nodejs)

To verify the Node.js prerequisites, simply issue these commands:
```bash
node --version
npm --version
```

For deployment (i.e., beyond development), you will also need a web server from which to serve a website that hosts the `piccolo` client.  The `demo1` folder contains a minimal website as an example of how a website hosts the `piccolo` client.  But no matter how large or small, it really boils down to having a webpage that references `piccolo-client.js` in a `<script>` tag.  So in order to serve up that page, you need a webserver.  Here are some of the many choices for satisfying this prerequisite:
* [Apache](https://www.apache.org/)
* [IIS](https://www.iis.net/)
* [nginx](https://www.nginx.com/)
* [lighttpd](https://redmine.lighttpd.net/projects/lighttpd)
* [serverz](https://greggman.github.io/servez/)
* [webfs](https://linux.bytesex.org/misc/webfs.html)
* [twisted](http://twistedmatrix.com/) are other minimal web server choices
* Node.js, Python, Ruby, PHP, and Go all have a way to run a barebones HTTP server
  * if you use Node.js for this, please do note that you should do so in a separate, non-`piccolo` nodejs directory

A prerequisite for running a webserver is having a machine on which to run it.  This can certainly be your own, local, development machine.  It could also be another machine on your local network, off-premises hardware, a virtual machine in the cloud (really just another form of off-premises hardware -- clouds are fluffy but not magical; it's running on someone's hardware someplace ...), or anything equivalent.  Choose something that works best for your situation; reuse / repurpose whenever you can, and pick something that taps what you already know about setting up websites.

The same machine where you host a website to host a page that hosts the `piccolo` client JavaScript can be the machine where you host the `piccolo` server Node.js application.

### installation - development
**TODO** : add details on configuring the `piccolo` client and server

As a preface to the detailed installation instructions, here is a summary directory listing of the `piccolo` project:
```
─
│
└── LICENSE                          [project-wide license : MPLv2]
└── README.md                        [exactly what it says on the tin]
└── README-personal-history.md       [my own journey through 3D development]
└── CREDITS.md                       [this work has benefited greatly from the work of others]
└── CREDITS-additional-details.md    [... many, *many* others]
└── DCO.md                           [Developer Certificate of Origin]
└── CODE_OF_CONDUCT.md               [we are committed to providing a safe, welcoming, constructive, and productive environment for all people]
└── CONTRIBUTING.md                  [parameters around contributing, and how best to contribute]
└── INSTALL.md                       [installation for both development work and for usage]

└── demo1                            [a simple website to demonstrate deployment and base functionality]
│   └── www
│       └── css
│       └── html
│       └── img
│       └── js                       [the bundled piccolo client would be deployed here]
│       └── vid

└── src                              [source code for piccolo]
    └── client                       [source code for the client portion of piccolo]
    │   └── package-lock.json        [standard nodejs / npm file for repeatable installations]
    │   └── package.json             [standard nodejs / npm file for package parameters]
    │   └── snowpack.config.js       [we use snowpack for development without bundling]
    │   └── webpack.config.js        [we use webpack for deployment bundling]
    │   └── devsite                  [snowpack mini website for development]
    │   └── dist                     [webpack target build directory]
    │   └── node_modules             [standard nodejs / npm dependency directory]
    │   └── pkg                      [the piccolo client is more of a package than an application]
    │       └── main.js              [main entry point]
    │       └── components           [piccolo client ECS components]
    │       └── systems              [piccolo client ECS systems]
    │           └── terrain
    │           └── skydome
    │           └── soundfx
    │           └── music
    │           └── physics
    │           └── animation
    │           └── intelligence
    │           └── userinterface
    │           └── usercode
    └── server                       [source code for the server portion of piccolo]
        └── package-lock.json        [standard nodejs / npm file for repeatable installations]
        └── package.json             [standard nodejs / npm file for package parameters]
        └── app                      [the piccolo server runs as an independent service]
        │   └── main.js              [main entry point]
        └── node_modules             [standard nodejs / npm dependency directory]
        └── world                    [definition of the tiny world serviced by this piccolo server ]
            └── world.cfg
            └── fonts
            └── guis
            └── landscape
            └── models
            └── sounds
            └── sprites
            └── textures
```

#### clone the `piccolo` repo
```bash
cd /path/to/your/workarea
git clone git@github.com:landru27/piccolo.git
```

#### initialize the client and server dev areas
```bash
cd /path/to/your/workarea/piccolo/src/client
npm install

cd /path/to/your/workarea/piccolo/src/server
npm install
```

#### reviewing ongoing development work
The following `npm run devsite` command utilizes `snowpack` to host the `piccolo` client via the mini website, `devsite`, in the client directory.  See `package.json` and `snowpack.config.js` for details.
```bash
cd /path/to/your/workarea/piccolo/src/client
npm run devsite
navigate to http://localhost:8080/
```
The `npm run devsite` command likely will direct your web browser to open a tab pointed at `http://localhost:8080/`, but if it does not, simply do so by hand.  Likewise, the `npm run devsite` command is meant to reuse such a tab once it's open, but a manual refresh does the same thing, and might be needed anyway if a momentary load on your dev machine gets in the way.

### installation - deployment

#### prepare an area for conducting `piccolo` client deployment
The below `npm run build` command utilizes `webpack` to bundle the `piccolo` client into a target `piccolo-client.js` file in the `dist` directory inside the client directory.  See `package.json` and `webpack.config.js` for details.  This bundled file needs to then be transferred to where a webpage can reference it.

* EITHER configure your local webserver to serve out of `/path/to/your/workarea/piccolo/demo1/www/`
* OR copy the directory `/path/to/your/workarea/piccolo/demo1/www/` to a directory your webserver can already serve
* OR transfer the `piccolo-client.js` file to an existing website where you are adding `piccolo` usage

#### bundle and publish the `piccolo` client
```bash
cd /path/to/your/workarea/piccolo/src/client
npm run build
cp -ip dist/piccolo-client.js /path/to/your/workarea/piccolo/demo1/www/js
```
... or ...
```bash
cd /path/to/your/workarea/piccolo/src/client
npm run build
cp -ip dist/piccolo-client.js /path/to/your/website/js/
```
... or ...
```bash
cd /path/to/your/workarea/piccolo/src/client
npm run build
rsync --delete -avce ssh dist/piccolo-client.js USER@YOUR_WEB_HOST:/path/to/your/website/javascript/
```
etc.  The exact routine depends on where you are hosting your website.

#### publish the `piccolo` server
```bash
cd /path/to/your/workarea/piccolo/src/server
rsync --delete --exclude='node_modules/*' -avce ssh ./ USER@YOUR_WEB_HOST:/path/to/your/nodesite/

ssh USER@YOUR_WEB_HOST
cd /path/to/your/nodesite
npm install --production
```

