import { RequestHandler } from "express";
import { PathLike, readFile } from "fs";
import { marked } from "marked";

const simpleCSSImport: string = `<link rel="stylesheet" href="https://cdn.simplecss.org/simple.min.css">`;

export interface ExpressDocsOptions {
    /**
     * The pasth to the file that contains
     * the API documentation.
     * @default "README.md"
     */
    docsPath?: PathLike;
    /**
     * Whether auto to import styling from
     * [Simple CSS](https://simplecss.org).
     * @default true
     */
    style?: boolean;
    /**
     * So you can import your own custom stylesheet,
     * add content to the `<head>` of the HTML document,
     * or pretty much anything else you want.
     */
    htmlPrefix?: string;
}

export const defaultOptions: ExpressDocsOptions = {
    docsPath: "README.md",
    style: true,
};

export default function expressMdDocs(options?: ExpressDocsOptions): RequestHandler {
    const {
        docsPath,
        style,
        htmlPrefix
    }: ExpressDocsOptions = {
        ...defaultOptions,
        ...options,
    };

    return (_req, res) => {
        readFile(docsPath, (error, data) => {
            if (error) {
                console.error("Error reading documentation file.", error);
                res.status(500).send("Error reading documentation file.");
            } else {
                let html = marked(data.toString());

                if (style) html = simpleCSSImport + html;
                if (htmlPrefix) html = htmlPrefix + html;

                res.header("Content-Type", "text/html").send(html);
            }
        });
    };
}
