import { rest } from 'msw'

export const getUserInfo = rest.post('/message', (req, res, ctx) => {
    const { username } = req.body

    return res(
        ctx.json({
            id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
            username,
            firstName: 'Brian',
            lastName: 'Kernighan'
        })
    )
})

export const UserApi = [getUserInfo]
