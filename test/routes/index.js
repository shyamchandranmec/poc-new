/**
 * Created by shyam on 22/03/16.
 */

"use strict";

let logger = require("log4js").getLogger();
let jwt = require("jwt-simple");


describe("Route: /status", () => {
    describe("Method: GET ", () => {
        it("Returns the api status", (done) => {
            request.get("/status")
                .expect(200)
                .end((err, res) => {
                    const expected = {
                        status: "abc"
                    };
                    expect(res.body).to.eql(expected);
                    done(err);
                });
        });
    });
});

describe("Route: /token: ", () => {
    describe("Method: POST: ", () => {
        beforeEach(done => {
            logger.info("Creating new user user user user user user");
            done();
        });
        describe("Successful authentication: ", () => {
            it("Returns authenticated users token", done => {
                request.post("/token")
                    .send({
                        email: "s@s.com",
                        password: "s"
                    })
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body).to.include.keys("token")
                        done(err);
                    })
            });
        });
        describe("Unsuccessful authentication: ", () => {
            it("Throws error when email does not exist", done => {
                request.post("/token")
                    .send({
                        password: "s"
                    })
                    .expect(401)
                    .end((err, res) => {
                        done(err);
                    })
            });
            it("Throws error when email is empty", done => {
                request.post("/token")
                    .send({
                        email: "",
                        password: "s"
                    })
                    .expect(401)
                    .end((err, res) => {
                        done(err);
                    })
            });
        });
    });
});

describe("Route: /users", () => {
    describe("Method: GET", () => {
        let app = require("../../app");
        let cfg = app.libs.config;
        let token = jwt.encode({
            id: "s@s.com"
        }, cfg.jwtSecret);

        it("Returns array of users", (done) => {
            request.get("/users")
                .set("Authorization", `JWT ${token}`)
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.be.instanceof(Array);
                    done(err);
                })

        })
    })
});