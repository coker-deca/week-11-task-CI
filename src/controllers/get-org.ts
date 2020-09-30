import organizationModel from "../models/organization-model";
import { authenticate } from "./auth-middleware";

export async function getOne(search: any) {
  // authenticate(context);
  try {
    const organization = await organizationModel.find({
      organization: search.organization,
    });
    return organization[0];
  } catch (err) {
    console.log(err.message);
  }
}

export async function delOne(search: any) {

  try {
    const organization = await organizationModel.findOneAndDelete({
      organization: search.organization,
    });
    if (!organization) return "No organization to be deleted";
    return organization;
  } catch (err) {
    console.log(err.message);
  }
}

export async function updateOne(parameters: {
  organization: string;
  organizations: any;
}) {
  const { organization, organizations } = parameters;
  const searchOrg = await organizationModel.findOne({ organization });
  if (!searchOrg) return "Organization does not exist";
  try {
    const foundOrg = organizationModel.findOneAndUpdate(
      { organization },
      { ...organizations }
    );
    return foundOrg;
  } catch (e) {
    console.error(e);
  }
}

export async function getAll(context: any) {
  // authenticate(context);
  const organizationdb = await organizationModel.find();
  return organizationdb;
}

export async function createNew(request: Record<string, unknown>) {
  console.log(request.organization);
  const organization = new organizationModel(request.organization);

  try {
    const newOrg = await organization.save();

    return newOrg;
  } catch (err) {
    console.error(err);
  }
}
