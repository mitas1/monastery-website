const fs = require("fs");
const path = require("path");
const yamlFront = require("yaml-front-matter");
const md = require("markdown-it")({
    html: true,
});
const LANGUAGES = require("../constants").LANGUAGES;

const fetch = () =>
    LANGUAGES.forEach(lang => {
        const staticLocales = "static/locales";
        const inputDir = path.join("locales", lang);
        const outDir = path.join(staticLocales, lang);

        if (!fs.existsSync(staticLocales)) {
            fs.mkdirSync(staticLocales);
        }

        if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir);
        }

        fs.readdirSync(inputDir)
            .filter(fn => fn.endsWith(".json"))
            .forEach(file => {
                fs.copyFile(
                    path.join(inputDir, file),
                    path.join(outDir, file),
                    err => {
                        if (err) throw err;
                    },
                );
            });

        fs.readdirSync(inputDir)
            .filter(fn => fn.endsWith(".md"))
            .forEach(file => {
                fs.readFile(path.join(inputDir, file), "utf8", function(
                    err,
                    fileContents,
                ) {
                    if (err) {
                        throw err;
                    }

                    const content = yamlFront.loadFront(fileContents);

                    content.__content = md.render(content.__content);

                    fs.writeFileSync(
                        path.join(
                            outDir,
                            `${file.substr(0, file.lastIndexOf("."))}.json`,
                        ),
                        JSON.stringify(content),
                    );
                });
            });

        return;
    });

fetch();
