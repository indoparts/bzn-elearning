import Route from '@ioc:Adonis/Core/Route'
import Application from '@ioc:Adonis/Core/Application'
import './routes/web/RouteWeb'
import './routes/api/client'

Route.get('/', ({ response }) => {
    response.redirect().toPath('/login')
})
Route.get('images/:folder/:filename', async ({ params, response }) => {
    const folder = params.folder.split("&")
    if (folder.length > 1) {
        const filePath = Application.tmpPath(`upload/${folder[0]}/${folder[1]}/${params.filename}`)
        return response.attachment(filePath)
    } else {
        const filePath = Application.tmpPath(`upload/${folder[0]}/${params.filename}`)
        return response.attachment(filePath)
    }
})
