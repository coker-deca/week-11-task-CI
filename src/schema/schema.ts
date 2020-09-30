import { buildSchema } from "graphql";

//GraphQL schema
const schema = buildSchema(`
type User {
  username: String!
  email: String!
  createdAt: String!
  updatedAt: String!
  password: String
  role: String
}
type Organization{
  _id: ID
  organization: String
  createdAt: String
  updateAt: String
  products: [String]
  marketValue: String
  address: String
  ceo: String
  country: String
  noOfEmployees: Int
  employees: [String]
}
input OrganizationInput{
  organization: String
  products: [String]
  marketValue: String
  address: String
  ceo: String
  country: String
  noOfEmployees: Int
  employees: [String]
}
type Query{
  organizationOne(organization: String!): Organization
  organizations: [Organization]
  getUser(username: String!): User
  getAllUsers:[User!]!
}
type Mutation{
  createOrganization(organization: OrganizationInput): Organization
  updateOrganization(organization: String!, organizations: OrganizationInput): Organization
  deleteOrganization(organization: String!): Organization
  registerUser(username: String!, email: String!, password: String!, role: String ): User!
  login(username: String!, password: String!): String!
}
schema{
  query: Query
  mutation: Mutation
}
`);

export default schema;
