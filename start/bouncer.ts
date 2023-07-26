import Bouncer from '@ioc:Adonis/Addons/Bouncer'
import Database from '@ioc:Adonis/Lucid/Database';
import User from 'App/Models/User';
async function permissionGuard(params: number, name: string) {
    const arr: number[] = [];
    const call = Database
        .from('permissions')
        .join('role_has_permissions', 'permissions.id', '=', 'role_has_permissions.permission_id')
        .join('roles', 'role_has_permissions.role_id', '=', 'roles.id')
        .where('permissions.name', name)
        .select('role_has_permissions.role_id');
    (await call).forEach(el => {
        arr.push(el.role_id)
    });
    return arr.includes(params)
}
export const { actions } = Bouncer
// START::USER AUTHORIZATION
.define('create-user', (user: User) => {
    return permissionGuard(user.role_id, 'create-user')
})
.define('read-user', (user: User) => {
    return permissionGuard(user.role_id, 'read-user')
})
.define('update-user', (user: User) => {
    return permissionGuard(user.role_id, 'update-user')
})
.define('delete-user', (user: User) => {
    return permissionGuard(user.role_id, 'delete-user')
})
// END::USER AUTHORIZATION
// START::ROLE AUTHORIZATION
.define('create-role', (user: User) => {
    return permissionGuard(user.role_id, 'create-role')
})
.define('read-role', (user: User) => {
    return permissionGuard(user.role_id, 'read-role')
})
.define('update-role', (user: User) => {
    return permissionGuard(user.role_id, 'update-role')
})
.define('delete-role', (user: User) => {
    return permissionGuard(user.role_id, 'delete-role')
})
// END::ROLE AUTHORIZATION
// START::PERMISSION AUTHORIZATION
.define('create-permission', (user: User) => {
    return permissionGuard(user.role_id, 'create-permission')
})
.define('read-permission', (user: User) => {
    return permissionGuard(user.role_id, 'read-permission')
})
.define('update-permission', (user: User) => {
    return permissionGuard(user.role_id, 'update-permission')
})
.define('delete-permission', (user: User) => {
    return permissionGuard(user.role_id, 'delete-permission')
})
// END::PERMISSION AUTHORIZATION
export const { policies } = Bouncer.registerPolicies({})
