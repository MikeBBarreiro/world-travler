/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Vacation    = require('../../app/models/vacations'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'vacation-test',
    Mongo     = require('mongodb');

describe('Vacation', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('Should create a vacation', function(){
      var v = {name:'Paris, France', start:'2013-08-05T00:00:00.000-0500', end:'2013-10-05T00:00:00.000-0500', lat:48.856614, lng:2.3522219000000177},
      paris = new Vacation(v);
      console.log(paris);

      expect(paris).to.be.instanceof(Vacation);
      expect(paris.name).to.equal('Paris, France');
      expect(paris.start).to.be.instanceof(Date);
      expect(paris.end).to.be.instanceof(Date);
      expect(paris.lat).to.equal(48.856614);
      expect(paris.lng).to.equal(2.3522219000000177);
    });
  });

  describe('.create', function(){
    it('should create a vacation', function(done){
      var v = {name:'Paris, France', start:'2013-08-05T00:00:00.000-0500', end:'2013-10-05T00:00:00.000-0500', lat:48.856614, lng:2.3522219000000177, photo:['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP-bi_BfgJ7uE1IMsg_0jbNGD4gN0B5pbJLKWpHHOHRPxrJkPc_w']},
      paris = new Vacation(v);
      Vacation.create(paris, function(err, vacations){
        expect(vacations._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('.all', function(){
    it('Should get all vacations', function(done){
      Vacation.all(function(err, vacations){
        expect(vacations).to.have.length(2);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a vacation by id', function(done){
      Vacation.findById('000000000000000000000001', function(vacation){
        var v = {name:'Paris, France', start:'2013-08-05T00:00:00.000-0500', end:'2013-10-05T00:00:00.000-0500', lat:48.856614, lng:2.3522219000000177, photo:['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP-bi_BfgJ7uE1IMsg_0jbNGD4gN0B5pbJLKWpHHOHRPxrJkPc_w']},
        paris = new Vacation(v);
        expect(paris).to.be.instanceof(Vacation);
        expect(paris.name).to.equal('Paris, France');
        done();
      });
    });
  });
});

