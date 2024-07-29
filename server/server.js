const http = require("node:http");
const sqlite3 = require("sqlite3").verbose();

let ffr_tables = {};

const startDatabase = () => {
    return new sqlite3.Database("../database/fast_food.db", (err) => {
        if(err) {
            console.error(err);
            return;
        }

        console.log("Database connected: ...")
    });
}

const getCols = (db) => {
    let column_names = []

    const column_name_query = "SELECT name FROM pragma_table_info('arbys')";

    db.all(column_name_query, [], (err, rows) => {
        if (err) {
            console.error(err);
            return;
        }

        for (const row of rows) {
            column_names.push(row.name)
        }
    });

    return column_names;
}

const dataGet = (tables, request, response) => {
    let db = startDatabase();

    request
        .on('data', () => {})
        .on('end', () => {

            db.serialize(() => {
                let column_names = getCols(db)

                let res_text = '{ "food_items": [';

                for (const ff_place of tables) {
                    const ffr = ffr_tables[ff_place]

                    if (ffr != ff_place) {
                        response.statusCode = 404;
                        break;
                    }

                    const restraunt_query = "SELECT * FROM " + ffr;

                    //Getting restraunt data.
                    db.each(restraunt_query, (err, row) => {
                        if (err) {
                            response.statusCode = 404;

                            return;
                        }

                        res_text += '{';

                        res_text += ' "fast_food_restaurant":"' + ffr + '" ';

                        for (let i = 0; i < column_names.length; ++i) {
                            if (i == 0) {
                                res_text += ' "' + column_names[i] + '":"' + row[column_names[i]] + '" ';
                            }
                            else {
                                res_text += ' "' + column_names[i] + '":' + row[column_names[i]] + ' ';
                            }
                        }

                        res_text += '},';
                    });
                }

                db.close((err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    res_text += " ]}";

                    switch(response.statusCode) {
                        case 404:
                            response.end();
                            console.log("...could not find table");
                            return;
                        case 503:
                            response.end();
                            console.log("...invalid macros");
                            return;
                    }

                    response.statusCode = 200;
                    response.end(res_text);
        
                    console.log("...closed Database connection");
                });
                
            });
        });
}

const ffrsGet = (request, response) => {
    request
        .on("data", () => {})
        .on("end", () => {
            let ffr_table_names = Object.keys(ffr_tables).join();

            response.statusCode = 200;
            response.end(ffr_table_names);

            console.log("...tables fetched");
        });
}

const macroColsGet = (request, response) => {
    let db = startDatabase();

    request
        .on('data', () => {})
        .on('end', () => {
            db.serialize(() => {
                let columns = getCols(db)

                db.close((err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }

                    response.statusCode = 200;
                    response.end(columns.join())

                    console.log("...closed Database connection")
                });
            })
        })
}

const server = http.createServer((request, response) => {
    //Extracting headers, method, and url from request
    const { headers, method, url } = request;

    const url_parts = url.split("?tables=");

    const uri = url_parts[0];

    //Allowing response to be sent to site and only allowing the response to be sent to a HTTP:GET response
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    response.setHeader('Access-Control-Allow-Method', "GET")

    //Only allows GET requests from url's /data and /ffrs
    if (method === 'GET') {
        request
            .on('error', err => {
                console.error(err);
                
                response.statusCode = 400;
                response.end();
            })

        switch (uri) {
            case "/data":
                if (url_parts.length === 2) {
                    dataGet(url_parts[1].split(","), request, response)
                    break;
                }

                response.statusCode = 404;
                response.end();
                break;

            case "/ffrs":
                ffrsGet(request,  response);

                break;

            case "/macro_cols":
                macroColsGet(request, response);

                break;

            default:
                response.statusCode = 404;
                response.end();
        }
    }
}).listen(8080, "0.0.0.0");

console.log("Started:");

const db = startDatabase();

db.serialize(() => {
    db.all("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name", (err, rows) => {
        if (err) {
            console.error(err);
            return;
        }
        
        for (const row of rows) {
            ffr_tables[row.name] = row.name;
        }
    });

    db.close((err) => {
        if (err) {
            console.error(err);
        }

        console.log("...closed Database connection");
    });
});