const express = require('express');
const mongoose = require('mongoose');

const { check, validationResult } = require('express-validator');

const router = express.Router();
const Registration = mongoose.model('Registration')

router.get('/', (req, res) => {
  res.render('form', { title: 'Registration form' }); });

router.get('/registrations', (req, res) => {
  Registration.find()
    .then((registrations) => {
      res.render('index', { title: 'Listing registrations', registrations });
    })
    .catch(() => { res.send('Sorry! Something went wrong.'); });
});

router.get('/contact', (req, res) => {
  res.render('contactpage', {title: 'Contact information' }); });

router.post(
  '/',
  [
    check('fname')
      .isLength({ min: 1 })
      .withMessage('Please enter your first name'),
    check('lname')
      .isLength({ min: 1 })
      .withMessage('Please enter your last name'),
    check('location')
      .isLength({ min: 1 })
      .withMessage('Please enter your location'),
  ],
  (req, res) => {
   console.log(req.body);
   const errors = validationResult(req);

   if (errors.isEmpty())
	{ 
		const registration = new Registration(req.body);
		registration.save()
		  .then(() => { res.send('Thank you for your registration!'); })
		  .catch((err) => {
		    console.log(err);
	 	    res.send('Sorry! Something went wrong.'); });
	}
	else 
	{
		res.render('form', 
			{
				title: 'Registration form',
				errors: errors.array(),
				data: req.body,
			}
			  );
	}
	}
);

module.exports = router;
