# express-md-docs
📝 An Express middleware to render Markdown files into beautiful content in your API

## Install

- **Using NPM**

```sh
npm install express-md-docs
```

- **Using Yarn**

```sh
yarn add express-md-docs
```

## Use

### Basic

Just add middleware to some route as request handler:

```ts
import express from "express";
import expressMdDocs from "express-md-docs";

const app = express();

// Docs rendered in the root route
app.get("/", expressMdDocs());

// Docs rendered in the /docs route
app.get("/docs", expressMdDocs());
```

### Options

Is also possible to pass options:

```ts
app.get("/", expressMdDocs({
    docsPath: "docs.md",
    style: false,
    htmlPrefix: "<title>My great API</title>"
}));
```

- `docsPath` (type: `string` - default: `README.md`):
    The path to the file that contains the API documentation.

- `style` (type: `boolean` - default: `true`):
    Whether auto to import styling from [Simple CSS](https://simplecss.org).

- `htmlPrefix` (type: `string`):
    So you can import your own custom stylesheet, add content to the `<head>` of the HTML document, or pretty much anything else you want.
