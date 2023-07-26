import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Permission'
import Role from 'App/Models/Role';
import RoleHasPermission from 'App/Models/RoleHasPermission';

export default class extends BaseSeeder {
  public async run() {
    await Role.createMany([
      {
        name: 'Superadmin'
      },
      {
        name: 'Writer'
      },
    ])
    const permission = [
      { name: "create-user" },
      { name: "read-user" },
      { name: "update-user" },
      { name: "delete-user" },
      { name: "create-role" },
      { name: "read-role" },
      { name: "update-role" },
      { name: "delete-role" },
      { name: "create-permission" },
      { name: "read-permission" },
      { name: "update-permission" },
      { name: "delete-permission" },
    ];
    
    if (await Permission.createMany(permission)) {
      const roleHasPermission: { role_id: number, permission_id: number }[] = [];
      for (let i = 1; i < permission.length; i++) {
        roleHasPermission.push({
          role_id: 1,
          permission_id: i
        });
      }
      await RoleHasPermission.createMany(roleHasPermission);
    }
  }
}
