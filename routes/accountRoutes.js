  
const express = require('express');
const router = express.Router();
const knex = require('../data/dbConfig');

// Read: /api/accounts - gets all accounts in the DB currently
router.get("/", (req, res) => {
	// GET req using knex
    knex
			.select()
			.from('accounts')
			.then(accounts => res.status(200).json({data: accounts}))
			.catch(err => res.status(500).json({message: "The database ran into an error", err: err}))
})

//Read: /api/accounts/:id - gets the account information for a specific ID
router.get("/:id", (req, res) => {

	// Accountid
	const accountID = req.params.id

	knex
		.select()
		.from('accounts')
		.where({id: accountID})
		.then(account => res.status(200).json({data: account}))
		.catch(err => res.status(500).json({message: "There was a issue in the DB", err: err}))
})

// Create: /api/accounts/newAccount - create a new account in the DB
router.post("/newAccount", (req, res) => {
	// Data to be sent to the DB
	const newAccount = req.body;

	// Insert with knex
	knex
		.insert(newAccount, 'id')
		.into('accounts')
		.then(accountID => res.status(201).json({data: accountID}))
		.catch(err => res.status(500).json({message: "There was an issue in the DB", err: err}))

})

// Update: /api/accounts/:id - edits existing data in a database
router.put("/:id", (req, res) => {
	
	// Account ID number
	const accountID = req.params.id;
	const updatedData = req.body;

	// Update Query
	knex('accounts')
		.where({id: accountID})
		.update(updatedData)
		.then( updatedAccount => res.status(200).json({data: updatedAccount}))
		.catch(err => res.status(500).json({message: "There was a issue with the DB", err: err}))
})

// Delete: /api/accounts/:id - deletes a record from the database
router.delete("/:id", (req, res) => {

	// Account ID
	const accountID = req.params.id;

	knex('accounts')
	.where({id: accountID})
	.del()
	.then(response => res.status(200).json({data: response}))
	.catch(err => res.status(500).json({message: "There was a problem in the DB", err: err}))
})

module.exports = router;