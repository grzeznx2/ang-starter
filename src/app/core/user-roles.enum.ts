export const USER_ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  NGO_USER: 'NGO_USER',
  COMPANY_USER: 'COMPANY_USER',
  CITIZEN: 'CITIZEN',
} as const;

export type UserRoles = keyof typeof USER_ROLES;
