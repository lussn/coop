export function changePage (page, organization) {
  return { type: 'CHANGE_PAGE', page: page, organization: organization }
}
