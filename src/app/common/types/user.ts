export interface User {
  id: number;
  organizationId: number;
  role: string;
  adminFlag: boolean;
  viewOnlyFlag: boolean;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  emailHash: string;
  loggedInFlag: boolean;
  dateUpdated: string;
  dateCreated: string;
  staffFlag: boolean;
  activeFlag: boolean;
}
