const Member = require('../models/Member.model')
const router = require('express').Router()

// index: Fetch all
router.get('/', async (req, res) => {
    try {
        const members = await Member.find({})
        if(members && members?.length > 0){
            res.status(200).json({
                status: 'success',
                message: 'Members fetched',
                data: members
            })

        } else{
            res.status(404).json({
                status: 'failure',
                message: 'No member(s) yet'
            })
        }
        
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        })
    }
})

// fetch One
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id

        const foundMember = await Member.findById(id)
        if(foundMember){
            res.status(200).json({
                status: 'success',
                message: 'Member found',
                data: foundMember
            })

        } else{
            res.status(404).json({
                status: 'failure',
                message: 'Record not found'
            })
        }

    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        })
    }
})

// create
router.post('/', async (req, res) => {
    try {
        const member_data = {
            fullname: req?.body?.fullname || 'anonymous',
            gender: req?.body?.gender.toUpperCase() || 'MALE',
            institution: req?.body?.institution || 'Fedpoffa',
            level: req?.body?.level.toUpperCase() || 'ND 1',
        }
        
        const newMember = await Member.create(member_data)
        await newMember.save()

        res.status(201).json({
            status: 'success',
            message: 'Member created',
            data: newMember
        })
    
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        })
    }
})

// update
router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id
        
        // Search for member with given id and update
        const foundMember = await Member.findById(id)

        if(foundMember){
            if(req?.body?.fullname){
                foundMember.fullname = req.body.fullname
            }

            if(req?.body?.gender){
                foundMember.gender = req.body.gender.toUpperCase()
            }

            if(req?.body?.institution){
                foundMember.institution = req.body.institution
            }

            if(req?.body?.level){
                foundMember.level = req.body.level.toUpperCase()
            }

            // Updating
            const updatedMember = await foundMember.save()

            res.status(200).json({ 
                status: 'success', 
                message: 'Record updated',
                data: updatedMember
            })

        } else{
            res.status(404).json({ 
                status: 'failure', 
                message: 'Record not found for update' 
            })
        }
    } catch (err) {
        res.status(500).json({ 
            status: 'error', 
            message: err.message 
        })
    }  
})

// delete
router.delete('/:id', async (req,res) => {
    try {
        const id = req.params.id
        const deletedMember = await Member.findByIdAndDelete(id)

        if(deletedMember){
            res.status(200).json({ 
                status: 'success', 
                message: 'Member deleted'
            })
        }else{
            res.status(404).json({ 
                status: 'failure', 
                message: 'Member not in database, most likely already deleted'
            })
        }
    } catch (err) {
        res.status(500).json({ 
            status: 'error', 
            message: err.message
        })
    }
})

module.exports = router