import Database from "@ioc:Adonis/Lucid/Database";
import User from "App/Models/User"

export async function GetProfile(userId) {
    const q = await User.findOrFail(userId)
    return ProfileAct(q)
}
async function ProfileAct(user) {
    const arr: string[] = [];
    const call = Database
        .from('role_has_permissions AS rhp')
        .join('permissions AS p', 'p.id', '=', 'rhp.permission_id')
        .join('roles AS r', 'rhp.role_id', '=', 'r.id')
        .join('users AS u', 'u.role_id', '=', 'r.id')
        .where('u.id', user.id)
        .select('p.name AS permissionsname');
    (await call).forEach(el => {
        arr.push(el.permissionsname)
    });
    const q = await User.query().where('id', user.id)
        .preload('roles')
    const userData = {
        role_id: q[0]['role_id'],
        name: q[0]['name'],
        username: q[0]['username'],
        email: q[0]['email'],
        rolename: q[0]['roles']['name'],
    };
    return {
        user: userData,
        permission: arr
    };
}