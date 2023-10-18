interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Pharmacist'],
  customerRoles: ['Customer'],
  tenantRoles: ['Business Owner', 'Pharmacy Manager', 'Pharmacist', 'Medical Representative'],
  tenantName: 'Pharmacy',
  applicationName: 'Order Medicine Online',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Read product information',
    'Create orders',
    'Manage own orders',
    'Read prescription information',
  ],
  ownerAbilities: [
    'Manage pharmacy information',
    'Manage pharmacy products',
    'View orders from users',
    'View prescriptions from users',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/3810b19b-c3b8-4d43-8c97-1fb99719ddcb',
};
