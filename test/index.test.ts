import app from "../src/app";
// import mongoose from "mongoose";
import supertest from "supertest";
// jest.setTimeout(100000);
const request = supertest(app);
//const request = require ("supertest")

// beforeEach((done) => {
//   done();
//   // jest.setTimeout(100000);
// });

// afterEach((done) => {
// // Closing the DB connection allows Jest to exit successfully.
// mongoose.connection.close();
// done();
// });

describe("Get organization queries", () => {
  it("Returns organization using name", async (done) => {
    request
      .post("/graphql")
      .send({
        query: `{ organizationOne(organization: "Decagon") { organization address country } }`,
      })
      .set("Accept", "application.json")
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err: any, res: any) => {
        console.log(res.body);
        if (err) return done(err);
        let val = res.body.data.organizationOne;
        expect(val).toHaveProperty("country", "Nigeria");
        expect(val).toHaveProperty("organization", "Decagon");
        done();
      });
  });

  // it("Add new Organization", async (done) => {
  //   request
  //     .post("/graphql")
  //     .send({
  //       query:
  //         'mutation{addOrganization(organization: "Decagon2227", ceo: "James", country: "Germany", market_value: "85%", employees: ["base1", "ment1"], products: ["once", "twice", "thrice"], address: "Abeokuta") { id organization ceo country }}',
  //     })
  //     .set("Accept", "application.json")
  //     .expect("Content-Type", /json/)
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       expect(res.body).toBeInstanceOf(Object);
  //       let val = res.body.data.addOrganization;
  //       expect(val).toHaveProperty("ceo", "James");
  //       expect(val).toHaveProperty("country", "Germany");
  //       done();
  //     });
  // });

  // test("Add new Organization", async (done) => {
  //   request
  //     .post("/graphql")
  //     .send({
  //       query: `mutation{
  //           createOrganization(
  //             organization: "DecaLeague",
  //             ceo: "James",
  //             country: "Germany",
  //             market_value: "85%",
  //             employees: ["base1", "ment1"],
  //             products: ["once", "twice", "thrice"],
  //             address: "Abeokuta"
  //             )
  //             { id organization ceo country }
  //           }`,
  //     })
  //     .set("Accept", "application.json")
  //     .expect("Content-Type", /json/)
  //     .end((err, res) => {
  //       if (err) return done(err);
  //       expect(res.body).toBeInstanceOf(Object);
  //       let val = res.body.data.createOrganization;
  //       expect(val).toHaveProperty("ceo", "James");
  //       expect(val).toHaveProperty("country", "Germany");
  //       done();
  //     });
  // });
});
// describe("Check failure", () => {
//   it("number one failure🤣", () => {
//     expect(1).toBe(1)
//   })
//   it('fails sepertest', (done) => {
//     request.post("/sdsdf").expect(400).end(done)
//   })
//   it('fails sepertest', (done) => {
//       request
//         .post("/graphql")
//         .send({
//           query:
//             'mutation{addOrganization(organization: "Decagon2227", ceo: "James", country: "Germany", market_value: "85%", employees: ["base1", "ment1"], products: ["once", "twice", "thrice"], address: "Abeokuta") { id organization ceo country }}',
//         })
//         .set("Accept", "application.json")
//         .expect("Content-Type", /json/)
//         .expect((res) => {
//           console.log(res)
//         })
//         .end(done);
//   })
// })