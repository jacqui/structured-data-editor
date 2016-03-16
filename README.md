# A platform for managing Structured Data

**Important! This is a pre-version-1.0 development release**

This is a simple platform with Search, Create, Retreive, Update and Delete (SCRUD) methods for managing Structured Data.

It comes with models for People, Places, Organizations, Events and Quotes and is easy to extend with additional models.

It's not a Linked Data Platform and does not aim for LDP compliance but rather provides a working platform to easily manage entities that can be used to populate and manage data in a Triplestore (and provides an easy to use API).

## About 

This platform uses Node.js, with the Express and Mongoose libraries to allow for rapid application development and quick protoyping.

If you don't need features like SPARQL support all you need is Node.js and MongoDB installed and you are good to go. You can also deploy it to Heroku.

The focus of this platform is utility and ease of use. It aims to be informed by and compliant with existing relevant standards.

It currently includes models for:

* People
* Places
* Organizations
* Events
* Quotes

These are currently very simple implmentations whcih are easy to expand on (all you need to do is update the corresponding model in the `./models/` directory).

Future releases will expand the existing models to include properties from models defined on schema.org and the ability to render them in JSON-LD.

## Install and run

You'll need Node.js installed and MongoDB running locally to run this software.

Once downloaded, install and run with:

    > npm install
    > npm start

To login to the UI go to `http://localhost:3000` in your browser. The default username and password are both set to 'admin'. You'll be able to change the password and add new accounts once you've logged in.

You can check everything is working with `npm test`.

Note: If you don't have a MongoDB database running locally you can specify a remote server by passing a connection string as an environment variable.

e.g. 

    > MONGODB=mongodb://username:password@server.example.com:27017/db-name npm start

## SPARQL and Triplestore support

If you have a decicated triplestore you can use the _save_ and _remove_ hooks in `models/entity.js` to push updates to another data source on every create/update/delete request.

AllegroGraph provides an easy way to sync a Triplestore with MongoDB.

For a list of other Triplestores, see:  https://en.wikipedia.org/wiki/List_of_subject-predicate-object_databases.

## Deploy to Heroku

If don't have Node.js and MongoDB set up locally and want to deploy it to Heroku you can use the following link deploy a free instance to try it out.

@TODO <insert link here>

This will automatically setup a free MongoDB instance with mlab.com.

## How to use the REST API

For working examples see the `tests` directory.

### Searching

HTTP GET to /entity/search

    > curl http://localhost/entity/search/?name=John+Smith
    > curl http://localhost/entity/search/?type=Person

### Creating

HTTP POST to /entity

    > curl -X POST -d '{type: "Person", "name": "John Smith", "description": "Description goes here..."}' -H "Content-Type: application/json" http://localhost/entity

### Retreiving

HTTP GET to /entity/:id

    > curl http://localhost/entity/9cb1a2bf7f5e321cf8ef0d15

### Updating

HTTP PUT to /entity/:id

    > curl -X PUT -d '{type: "Person", "name": "John Smith", "description": "Updated description..."}' -H "Content-Type: application/json" http://localhost/entity/9cb1a2bf7f5e321cf8ef0d15

### Delete

HTTP DELETE to /entity/:id

    > curl -X DELETE http://localhost/entity/9cb1a2bf7f5e321cf8ef0d15

## Todo / known issues

The following features are on the immediate roadmap:

* Provide a system for authentication to limit Creating, Updating and Deleting.
* A web based interface with to manage entities and users, and documentation.
* Add more powerful searching (free text, based on properties, etc).
* Review the schema for different entities, including properties, naming conventions, object structure, and determine potential improvements.
* Allow entities to be directly imported/exported in common Stuctured Data formats.

## Contributing

Contributions in the form of pull requests with bug fixes, enhancements and tests - as well as bug reports and feature requests - are all welcome.
