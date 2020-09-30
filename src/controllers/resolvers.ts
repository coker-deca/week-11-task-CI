import { getOne, delOne, getAll, updateOne, createNew } from "./get-org";
import { createNewUSer, loginUser } from "./register-login";
import { getOneUser, getAllUsers } from "./get-users";

interface OrganizationInputSchema {
  organization: string;
  marketValue: string;
  address: string;
  ceo: string;
  country: string;
  products: [string];
  employees: [string];
  noOfEmployee: number,
  createdAt: string;
  updatedAt: string;
}

const root = {
  updateOrganization: updateOne,
  createOrganization: createNew,
  deleteOrganization: delOne,
  organizationOne: getOne,
  organizations: getAll,
  registerUser: createNewUSer,
  login: loginUser,
  getUser: getOneUser,
  getAllUsers: getAllUsers
};

export default root;
