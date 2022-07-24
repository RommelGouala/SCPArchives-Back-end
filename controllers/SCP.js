// dependancies
const router =  require('express').Router()
const SCP = require('../models/SCP-Model')

// this should hopefully be the home page, tested and works
router.get('/', (req, res) => {
    res.send('Home!')
})

// scp list page named "SCP Archive", tested and works
router.get('/scp', async (req, res) => {
    try {
        const SCPs = await SCP.find().populate('SCP')

        res.json(SCPs)
    } catch (error) {
        res.status(500).json({ "message": "error accessing SCP archives" })
    }
})

// indiviual scp page, page you are taken to when you select one of SCPs from the archive page. not yet tested
router.get('/scp/:id', async (req, res) => {
    try {
        const { id } = req.params
        const scp = await SCP.findOne({ id })

        res.json(scp)
    } catch (error) {
        res.status(500).json({ "message": "error accessing SCP entry" })
    }
})

// delete SCP entry, not yet tested
router.delete('/scp/:id', async (req, res) => {
    try {
        const { id } = req.params
        const scp = await SCP.findOneAndDelete({ id })

        res.json(scp)
    } catch (error) {
        res.status(500).json({ "message": "error deleting SCP entry" })
    }
})

// SCP create page labeled roughly "New Archive Entry", not yet tested
router.post('/new_entry', async (req, res) => {
    try {
        const { id, name, location, date, image, description, containment } = req.body

        const createNewSCPEntry = await new SCP({
            id,
            name,
            location,
            date,
            image,
            description,
            containment
        }).save()

        res.json({ 'message': 'New SCP entry added'})
    } catch (error) {
        res.status(400).json({ "message": "error adding SCP entry" })
    }
})

module.exports = router