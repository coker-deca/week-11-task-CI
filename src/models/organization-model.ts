import mongoose from "mongoose";

export interface OrganizationType extends mongoose.Document {
  organization: string,
  createdAt: Date,
  updatedAt: Date,
  products: string[],
  marketValue: string
  address: string,
  ceo: string,
  country: string,
  noOfEmployees: number,
  employees: string[]
}

const TypeSchema = mongoose.Schema;

const OrgSchema = new TypeSchema({
  organization: { type: String, required: true, index: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  products: { type: [String] },
  marketValue: { type: String },
  address: { type: String },
  ceo: { type: String },
  country: { type: String },
  noOfEmployees: { type: Number },
  employees: { type: [String] },
});

const OrganizationModel = mongoose.model<OrganizationType>("OrganizationModel", OrgSchema);

export default OrganizationModel;

