export default{
  update: { method: 'post', url: 'usuario/update'},
  insert: { method: 'post', url: 'pets/registrar'},
  updatePets: { method: 'post', url: 'pets/update'},
  delete: { method: 'delete', url: 'pets/delete{/id}'},
  find: { method: 'get', url: 'pets/selectall'},
  findDetails: { method: 'get', url: 'pets/select{/id}'},
}
