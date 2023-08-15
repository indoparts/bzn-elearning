import Database from "@ioc:Adonis/Lucid/Database";
import Application from '@ioc:Adonis/Core/Application'
import Drive from '@ioc:Adonis/Core/Drive'
import moment from 'moment'

export async function datatables(req, table, col, act) {
    const totalFiltered: any[] = [];

    const search = req['search'].value;
    const limit = req['length'];
    const start = req['start'];
    const order = col[req['order'][0]['column']];
    const dir = req['order'][0]['dir'];
    const datas: any[] = []
    if (search === '') {
        datas['fetch'] = await Database.from(table).offset(start).limit(limit).orderBy(order, dir);
        totalFiltered['total'] = await Database
            .from(table)
            .count('*', 'total')
    } else {
        datas['fetch'] = await Database.from(table)
            .where((q) => {
                q.whereILike(order, '%' + search + '%')
            })
            .offset(start).limit(limit).orderBy(order, dir);

        totalFiltered['total'] = await Database.from(table)
            .where((q) => {
                q.whereILike(order, '%' + search + '%')
            })
            .count('*', 'total')
    }
    const data: any[] = []

    datas['fetch'].forEach(el => {
        let action = ''

        if (act !== null) {
            if (act.typeact === 'btn' && act.attr.length !== 0) {
                action += '<div class="dropdown show">'
                action += '<a class="btn btn-default dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown link</a>'
                action += '<div class="dropdown-menu" aria-labelledby="dropdownMenuLink">'
                act.attr.forEach(async e => {
                    let p = e.permission.split("-");
                    action += `<a link='${(p[0] === 'update' || p[0] === 'edit') ? e.url + '/' + el.id + '/edit' : e.url + '/' + el.id}' type-act='${p[0]}' class="btn-action dropdown-item" type-request="${(p[0] === 'read' || p[0] === 'edit' || p[0] === 'update') ? 'get' : 'delete'}">${e.icon} ${e.btntext}</a>`
                });
                action += '</div>'
                action += '</div>'
            }
        }
        const fetch = {}
        col.forEach(e => {
            fetch[e] = el[e]
            if (action !== '') {
                fetch['action'] = action
            }
        });
        data.push(fetch)
    });

    return {
        draw: parseInt(req['draw']),
        recordsTotal: totalFiltered['total'][0].total,
        recordsFiltered: totalFiltered['total'][0].total,
        data: data
    };
}

function btnColor(indicatour) {
    switch (indicatour) {
        case 'read':
            return 'info'
            break;
        case 'update':
            return 'success'
            break;
        case 'edit':
            return 'success'
            break;
        case 'delete':
            return 'danger'
            break;

        default:
            return 'default'
            break;
    }
}

export async function uploadFile(req, fileRename, pathFile) {
    await req.move(Application.tmpPath(pathFile), {
        name: `${fileRename}.${req.extname}`,
        overwrite: true,
    })
    return fileRename
}
export async function unlinkFile(namefile, pathtarget) {
    const filePath = Application.tmpPath(`${pathtarget}/${namefile}`)
    return await Drive.delete(filePath)
}
export function DateTimeFormated(format, date) {
    return moment(date).format(format)
}
export function uniqueDatime(xDate) {
    return xDate.getFullYear().toString(10).substring(2)
        + (xDate.getMonth() + 1).toString(10).padStart(2, '0')
        + xDate.getDate().toString(10).padStart(2, '0')
        + xDate.getHours().toString(10).padStart(2, '0')
        + xDate.getMinutes().toString(10).padStart(2, '0')
        + xDate.getSeconds().toString(10).padStart(2, '0')
}
export const slugify = str =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');