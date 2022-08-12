import chai from 'chai';
import chaiHttp from 'chai-http';

const expect = chai.expect;
const url = 'http://localhost:3001';
chai.use(chaiHttp);

describe('Products rest API', () => {
  it('Should get a list of products', (done) => {
    chai
      .request(url)
      .get('/products')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('Should get a product with the specified ID', (done) => {
    chai
      .request(url)
      .get('/products/62e328337d5c0555986a12a8')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('_id').to.be.equal('62e328337d5c0555986a12a8');
        done();
      });
  });

  it('Should get a invalid ObjectId error', (done) => {
    chai
      .request(url)
      .get('/products/asdasdasd')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message').to.be.equal('Invalid ObjectId');
        done();
      });
  });

  it('Should update a product', (done) => {
    const title = `updated product${Math.floor(Math.random() * 100).toString(36)}`;

    chai
      .request(url)
      .put('/products/62e328337d5c0555986a12a8')
      .send({
        product: {
          title,
        },
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('title').to.equal(title);
        expect(res.body).to.have.property('_id').to.equal('62e328337d5c0555986a12a8');
        done();
      });
  });

  it('Should delete a product', (done) => {
    const title = `updated product${Math.floor(Math.random() * 100).toString(36)}`;
    const _id = '62e325205ba0d549295b67ef';

    chai
      .request(url)
      .get('/products')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        let length = res.body.length;

        chai
          .request(url)
          .post('/products')
          .send({
            product: {
              _id,
              title,
              price: 150,
              thumbnail: 'url something',
            },
          })
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('title').to.equal(title);
            expect(res.body).to.have.property('_id').to.equal(_id);

            chai
              .request(url)
              .delete(`/products/${_id}`)
              .end((err, res) => {
                expect(res).to.have.status(200);

                chai
                  .request(url)
                  .get('/products')
                  .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body)
                      .to.be.an('array')
                      .to.not.have.members([
                        {
                          _id,
                          title,
                          price: 150,
                          thumbnail: 'url something',
                        },
                      ]);
                    done();
                  });
              });
          });
      });
  });
});
