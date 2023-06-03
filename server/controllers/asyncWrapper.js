

export const wrap = fn => (req, res) => fn(req, res).catch(e=> res.send(e.message))

 