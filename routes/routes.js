import express from 'express';
import * as model from '../models/model_postgres.js';


const router = express.Router();

let renderFlights = function (req, res) {

  model.findJourneyViaCities(req.query.departure, req.query["depart-date"], req.query.arrival, req.query["arrival-date"], function(err, flights){
    return res.render('flights',{layout: 'main', user: req.user, formData:req.query, departFlights: flights[0], arriveFlights: flights[1]});
  });
}

let renderFlightPassengers = function (req, res) {
  const passengerCount= 1;
  const passengers = [];
  console.log(passengerCount);
  for(let i=0;i<passengerCount;i++){
    passengers.push(i);
  }
  return res.render('passengerInfo', {layout:'main', user: req.user, formData: req.query, passengerCount: passengers});
}

let renderHomePage = function (req, res) {
  if (!req.user) { 
    return res.render('home', {layout:'main', user: null});
  }

  return res.render('home', {layout:'main', user: req.user});
}

let renderDest = function (req, res) {
  res.render('popDestinations', {layout:'main', user: req.user});
}

let renderFaq = function (req, res) {
  res.render('FAQ', {layout:'main', user: req.user});
}

let renderSignUpPage = function (req, res) {
  res.render('signUp', {layout:'main', user: req.user});
}

let renderAboutUs = function (req, res) {
  res.render('aboutUs', {layout:'main', user: req.user});
}

let renderCustomerInfoForm = function (req, res) {
  res.render('customerInfoForm', {layout:'main', user: req.user});
}

let renderProfile = function (req, res) {
  res.render('profile', {layout:'main', user: req.user});
}


let renderContactUs = function(req, res){
  res.render('contactUs',{layout:'main',user:req.user});
}

let renderConfirmation=function(req,res){
  model.createTicketPassengerRelation(req.session.passport.user.id,req.body, function(err,passenger) {
    return res.render('confirmation',{layout:'main',user:req.user})
  });
}

let renderBookings=function(req,res){
  model.returnBookings(req.user.id, function(err, bookings){
    // for(let ticket = 0; ticket<bookings.length)
    return res.render('bookings', {layout:'main', user:req.user, bookings: bookings})
  })

}

router.route('/').get(renderHomePage);
router.route('/destinations').get(renderDest);
router.route('/faq').get(renderFaq);
router.route('/sign-up').get(renderSignUpPage);
router.route('/about-us').get(renderAboutUs);
router.route('/user-info-form').get(renderCustomerInfoForm);
router.route('/flights').get(renderFlights);
router.route('/flights/passengers').get(renderFlightPassengers);
router.route('/profile').get(renderProfile);
router.route('/contact-us').get(renderContactUs);
router.route('/flights/passengers/confirmation').post(renderConfirmation);
router.route('/bookings').get(renderBookings);
export default router;