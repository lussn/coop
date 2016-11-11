var mongoose = require('mongoose');
var Product = require('../../infrastructure/persistence/schemas/ProductPersistenceSchema.js');
var ProductsRepository = require("../../infrastructure/persistence/ProductsRepository.js");
var assert = require('chai').assert;
var db;

const ORIGINAL_NAME = 'productTest';
const NEW_NAME = 'testProductName';

function assertProductHasNewUsername(product) {
  assert.equal(NEW_NAME, product.name);
}

describe('ProductsRepository', function() {

  before(function (done) {
    db = mongoose.connect('mongodb://localhost/test');
    done();
  });

  after(function (done) {
    mongoose.connection.close();
    done();
  });

  beforeEach(function (done) {
    var product = new Product({
      name: ORIGINAL_NAME,
      description: 'test',
      price: '24',
      deliverAt: '12/12/2016'
    });

    product.save(function () {
      done();
    });
  });

  it('Update should return updated product', function (done) {
    Product.findOne({name: ORIGINAL_NAME}, function (err, product) {
      ProductsRepository.update(product._id, {
        name: NEW_NAME,
        description: product.description,
        price: product.price,
        deliverAt: product.deliverAt
      }).then(function(products) {
        assertProductHasNewUsername(products);
        done();
      });
    });
  });
});
