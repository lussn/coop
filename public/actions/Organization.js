export function deleteOrganization(organizationId) {
  return { type: 'DELETE', organizationId }
}
export function getOrganizations(organizations) {
  return { type: 'GET', organizations }
}
