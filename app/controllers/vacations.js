'use strict';

var Vacation = require('../models/vacations'),
          mp = require('multiparty');

exports.init = function(req, res){
  res.render('vacations/new');
};

exports.create = function(req, res){
  Vacation.create(req.body, function(){
    res.redirect('/vacations');
  });
};

exports.vacations = function(req, res){
  Vacation.all(function(err, vacations){
    console.log(vacations);
    res.render('vacations/vacations', {vacations:vacations});
  });
};

exports.show = function(req,res){
  Vacation.findById(req.params.id, function(err, vacation){
    res.render('vacations/show', {vacation: vacation});
  });
};

exports.downloadPhoto = function(req,res){
  Vacation.findById(req.params.id, function(err, vacation){
    vacation.downloadPhoto(req.body.url, function(){
      res.redirect('/vacations/' + req.params.id);
    });
  });
};

exports.uploadPhoto = function(req,res){
  Vacation.findById(req.params.id, function(err, vacation){
    var form = new mp.Form();
    form.parse(req, function(err, fields, files){
      vacation.uploadPhoto(files, function(){
        res.redirect('/vacations/' + req.params.id);
      });
    });
  });
};
