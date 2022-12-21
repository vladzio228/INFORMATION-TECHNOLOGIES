export const links = {
  '/database/create': ['/database/delete?name='],
  '/table/write': ['/table/update?name=', '/table/delete?name='],
  '/table/update': ['/table/delete?name='],
  '/table/find': ['/table/update?name=', '/table/delete?name='],
  '/database/delete': [],
  '/table/delete': [],
};

export type LinkType = keyof typeof links;
