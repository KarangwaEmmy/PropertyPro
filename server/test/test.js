import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe } from 'mocha';
import server from '../server';
import UserModel from '../model/Users';
import PropertyModel from '../models/Property';

const { expect } = chai;
const { assert } = chai;
// eslint-disable-next-line no-unused-vars
const should = chai.should();
chai.use(chaiHttp);

describe('POST /auth/signup', () => {
    it('Create user account if given valid input', (done) => {
      const user = {
        email: 'karangwa@hotmail.com',
        first_name: 'karangwa',
        last_name: 'Emmy',
        password: '7654321',
        phoneNumber: '+250 7876639530',
        address: 'P.O. BOX 3456-678',
      };
      chai.request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          res.body.data.should.be.a('object');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('first_name');
          res.body.data.should.have.property('last_name');
          done();
        });
    });

    it('Fail to create user account if given incomplete input', (done) => {
        const user = {
          email: 'raywachaga@hotmail.com',
          first_name: 'Raymond',
          last_name: 'Mwaura',
          password: '123456',
          phoneNumber: '+254706167087',
          // address: 'P.O. BOX 14195-00100',
        };
        chai.request(server)
          .post('/api/v1/auth/signup')
          .send(user)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error').eql('Address required');
            done();
          });
      });
    });
    
    describe('POST /auth/signin', () => {
      it('Log in user if given valid input', (done) => {
        const login = {
          email: 'raywachaga@hotmail.com',
          password: '123456',
        };
        chai.request(server)
          .post('/api/v1/auth/signin')
          .send(login)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('token');
            done();
          });
      });
    
      it('Fail to log in user if given invalid input and give failed login message', (done) => {
        const user = {
          email: 'raywachaga@hotmail.com',
          password: 'Wrong Password',
        };
        chai.request(server)
          .post('/api/v1/auth/signin')
          .send(user)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error').eql('Wrong credentials');
            done();
          });
      });
    
      it('Fail to log in user if some fields are missing', (done) => {
        const user = {
          email: 'raywachaga@hotmail.com',
          // password: 'Wrong Password',
        };
        chai.request(server)
          .post('/api/v1/auth/signin')
          .send(user)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error').eql('Password required');
            done();
          });
      });
    });
    
    describe('POST /property', () => {
      it('Create property advert if given complete request by user (agent)', (done) => {
        const userAgent = {
          email: 'agent@agent.agent',
          first_name: 'Agent',
          last_name: 'Agent',
          password: '123456',
          phoneNumber: '+254733367087',
          address: 'P.O. BOX 22295-00100',
          is_admin: false,
        };
        let { token } = UserModel.create(userAgent);
        token = `Bearer ${token}`;
        const advert = {
          type: '2 Bedroom',
          state: 'This State',
          city: 'This City',
          address: 'This Address',
          price: 40000.00,
          image_url: 'This Image Url',
        };
        chai.request(server)
          .post('/api/v1/property')
          .set('Authorization', token)
          .send(advert)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('id');
            res.body.data.should.have.property('status');
            res.body.data.should.have.property('type');
            res.body.data.should.have.property('state');
            res.body.data.should.have.property('city');
            res.body.data.should.have.property('address');
            res.body.data.should.have.property('price');
            res.body.data.should.have.property('image_url');
            res.body.data.should.have.property('created_on');
            done();
          });
      });
    
      it('Fail to create property advert if given invalid token', (done) => {
        const advert = {
          type: '2 Bedroom',
          state: 'This State',
          city: 'This City',
          address: 'This Address',
          price: 40000.00,
          image_url: 'This Image Url',
        };
        const invalidToken = 'invalidToken';
        chai.request(server)
          .post('/api/v1/property')
          .set('Authorization', invalidToken)
          .send(advert)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error').eql('Authorization failed');
            done();
          });
      });
    
      it('Fail to create property advert if given incomplete request', (done) => {
        const userAgent = {
          email: 'agent@agent.agent',
          first_name: 'Agent',
          last_name: 'Agent',
          password: '123456',
          phoneNumber: '+254733367087',
          address: 'P.O. BOX 22295-00100',
          is_admin: false,
        };
        const advert = {
          type: '2 Bedroom',
          state: 'This State',
          city: 'This City',
          address: 'This Address',
          price: 'This Price',
          // image_url: 'This Image Url',
        };
        let { token } = UserModel.create(userAgent);
        token = `Bearer ${token}`;
        chai.request(server)
          .post('/api/v1/property')
          .set('Authorization', token)
          .send(advert)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error').eql('Image URL required');
            done();
          });
      });
    });
    
    describe('PATCH /property/:id', () => {
      it('Update property advert if given complete request by user (agent)', (done) => {
        const userAgent = UserModel.create({
          email: 'agent2@agent.agent',
          first_name: 'Agent2',
          last_name: 'Agent2',
          password: '123456',
          phoneNumber: '+254777767087',
          address: 'P.O. BOX 66695-00100',
          is_admin: false,
        });
        const agentId = userAgent.id;
        const advert = PropertyModel.create({
          type: '2 Bedroom',
          state: 'This State',
          city: 'This City',
          address: 'This Address',
          price: 40000.00,
          image_url: 'This Image Url',
        }, agentId);
        let { token } = userAgent;
        token = `Bearer ${token}`;
        chai.request(server)
          .patch(`/api/v1/property/${advert.id}`)
          .set('Authorization', token)
          .send({
            status: 'sold',
            type: '3 Bedroom',
            state: 'Updated State',
            city: 'Updated City',
            address: 'Updated Address',
            price: 50000.00,
            image_url: 'Updated Image Url',
          })
          .end((err, res) => {
            expect(res.status).to.equal(201);
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('id');
            res.body.data.should.have.property('status');
            // Check for some deep copies
            res.body.data.should.have.property('status').eql('sold');
            res.body.data.should.have.property('type').eql('3 Bedroom');
            res.body.data.should.have.property('state').eql('Updated State');
            res.body.data.should.have.property('city').eql('Updated City');
            res.body.data.should.have.property('address').eql('Updated Address');
            res.body.data.should.have.property('price').eql(50000.00);
            res.body.data.should.have.property('created_on');
            res.body.data.should.have.property('image_url').eql('Updated Image Url');
            res.body.data.should.have.property('ownerEmail');
            res.body.data.should.have.property('ownerPhoneNumber');
            done();
          });
      });
    
      it('Fail to update property advert if given request by non-agent user', (done) => {
        const userAgent = {
          email: 'agent3@agent.agent',
          first_name: 'Agent3',
          last_name: 'Agent3',
          password: '123456',
          phoneNumber: '+254999967087',
          address: 'P.O. BOX 22295-00100',
          is_admin: false,
        };
        const agentId = UserModel.create(userAgent).id;
        const advert = PropertyModel.create({
          type: '2 Bedroom',
          state: 'This State',
          city: 'This City',
          address: 'This Address',
          price: 40000.00,
          image_url: 'This Image Url',
          owner: agentId,
        });
        const nonAgentUser = {
          email: 'client2@client.client',
          first_name: 'Client2',
          last_name: 'Client2',
          password: '123456',
          phoneNumber: '+254888867087',
          address: 'P.O. BOX 44495-00100',
          is_admin: false,
        };
        let { token } = UserModel.create(nonAgentUser);
        token = `Bearer ${token}`;
        chai.request(server)
          .patch(`/api/v1/property/${advert.id}`)
          .set('Authorization', token)
          .send({
            type: '3 Bedroom',
            state: 'Updated State',
            city: 'Updated City',
            address: 'Updated Address',
            price: 50000.00,
            image_url: 'Updated Image Url',
          })
          .end((err, res) => {
            expect(res.status).to.equal(403);
            res.body.should.be.a('object');
            res.body.should.have.property('error').eql('User not agent - cannot update advert');
            done();
          });
      });
    
      it('Fail to update specific property advert if given invalid property_id', (done) => {
        const mockAgent = UserModel.create({
          email: 'agent2@agent.agent',
          first_name: 'Agent2',
          last_name: 'Agent2',
          password: '123456',
          phoneNumber: '+254777767087',
          address: 'P.O. BOX 66695-00100',
          is_admin: false,
        });
        let { token } = mockAgent;
        token = `Bearer ${token}`;
        const invalidPropertyId = 0.01;
        chai.request(server)
          .patch(`/api/v1/property/${invalidPropertyId}`)
          .set('Authorization', token)
          .send({
            state: 'Updated State',
            city: 'Updated City',
            address: 'Updated Address',
            price: 50000.00,
            image_url: 'Updated Image Url',
          })
          .end((err, res) => {
            expect(res.status).to.equal(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error').eql('property not found');
            server.close();
            done();
          });
      });
    });
    
    describe('PATCH /property/:id/sold', () => {
      it('Update advert status if given request by user (agent)', (done) => {
        const userAgent = UserModel.create({
          email: 'agent2@agent.agent',
          first_name: 'Agent2',
          last_name: 'Agent2',
          password: '123456',
          phoneNumber: '+254777767087',
          address: 'P.O. BOX 66695-00100',
          is_admin: true,
        });
        let { token } = userAgent;
        token = `Bearer ${token}`;
        const userId = userAgent.id;
        const advert = PropertyModel.create({
          type: '2 Bedroom',
          state: 'This State',
          city: 'This City',
          address: 'This Address',
          price: 40000.00,
          image_url: 'This Image Url',
        }, userId);
        chai.request(server)
          .patch(`/api/v1/property/${advert.id}/sold`)
          .set('Authorization', token)
          .end((err, res) => {
            // console.log(res.body);
            expect(res.status).to.equal(200);
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('status').eql('sold');
            done();
          });
      });
    
      it('Fail to update advert status if given request by non-agent user', (done) => {
        const userAgent = {
          email: 'agent3@agent.agent',
          first_name: 'Agent3',
          last_name: 'Agent3',
          password: '123456',
          phoneNumber: '+254999967087',
          address: 'P.O. BOX 22295-00100',
          is_admin: true,
        };
        const agentId = UserModel.create(userAgent).id;
        const advert = PropertyModel.create({
          type: '2 Bedroom',
          state: 'This State',
          city: 'This City',
          address: 'This Address',
          price: 40000.00,
          image_url: 'This Image Url',
        }, agentId);
        const nonAgentUser = {
          email: 'client2@client.client',
          first_name: 'Client2',
          last_name: 'Client2',
          password: '123456',
          phoneNumber: '+254888867087',
          address: 'P.O. BOX 44495-00100',
          is_admin: false,
        };
        let { token } = UserModel.create(nonAgentUser);
        token = `Bearer ${token}`;
        chai.request(server)
          .patch(`/api/v1/property/${advert.id}/sold`)
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.status).to.equal(403);
            res.body.should.be.a('object');
            res.body.should.have.property('error').eql('User not agent - cannot change advert status');
            done();
          });
      });
    
      it('Fail to update advert status if given invalid property_id', (done) => {
        const mockAgent = {
          email: 'agent2@agent.agent',
          first_name: 'Agent2',
          last_name: 'Agent2',
          password: '123456',
          phoneNumber: '+254777767087',
          address: 'P.O. BOX 66695-00100',
          is_admin: true,
        };
        let { token } = UserModel.create(mockAgent);
        token = `Bearer ${token}`;
        const invalidPropertyId = 0.01;
        chai.request(server)
          .patch(`/api/v1/property/${invalidPropertyId}/sold`)
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error').eql('property not found');
            done();
          });
      });
    });
    
    describe('DELETE /property/:id', () => {
      it('Delete property advert if given request by user (agent)', (done) => {
        const userAgent = UserModel.create({
          email: 'agent2@agent.agent',
          first_name: 'Agent2',
          last_name: 'Agent2',
          password: '123456',
          phoneNumber: '+254777767087',
          address: 'P.O. BOX 66695-00100',
          is_admin: true,
        });
        let { token } = userAgent;
        token = `Bearer ${token}`;
        const userId = userAgent.id;
        const advert = PropertyModel.create({
          type: '2 Bedroom',
          state: 'This State',
          city: 'This City',
          address: 'This Address',
          price: 40000.00,
          image_url: 'This Image Url',
        }, userId);
        chai.request(server)
          .delete(`/api/v1/property/${advert.id}`)
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('message').eql('Advert successfully deleted');
            done();
          });
      });
    
      it('Fail to delete property advert if given request by non-agent user', (done) => {
        const userAgent = UserModel.create({
          email: 'agent3@agent.agent',
          first_name: 'Agent3',
          last_name: 'Agent3',
          password: '123456',
          phoneNumber: '+254999967087',
          address: 'P.O. BOX 22295-00100',
          is_admin: true,
        });
        const agentId = userAgent.id;
        const advert = PropertyModel.create({
          type: '2 Bedroom',
          state: 'This State',
          city: 'This City',
          address: 'This Address',
          price: 40000.00,
          image_url: 'This Image Url',
        }, agentId);
        const nonAgentUser = {
          email: 'client2@client.client',
          first_name: 'Client2',
          last_name: 'Client2',
          password: '123456',
          phoneNumber: '+254888867087',
          address: 'P.O. BOX 44495-00100',
          is_admin: false,
        };
        let { token } = UserModel.create(nonAgentUser);
        token = `Bearer ${token}`;
        chai.request(server)
          .delete(`/api/v1/property/${advert.id}`)
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.status).to.equal(403);
            res.body.should.be.a('object');
            res.body.should.have.property('error').eql('User not agent - cannot delete advert');
            done();
          });
      });
    
      it('Fail to delete property advert if given invalid property_id', (done) => {
        const mockAgent = {
          email: 'agent2@agent.agent',
          first_name: 'Agent2',
          last_name: 'Agent2',
          password: '123456',
          phoneNumber: '+254777767087',
          address: 'P.O. BOX 66695-00100',
          is_admin: true,
        };
        let { token } = UserModel.create(mockAgent);
        token = `Bearer ${token}`;
        const invalidPropertyId = 0.01;
        chai.request(server)
          .delete(`/api/v1/property/${invalidPropertyId}`)
          .set('Authorization', token)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error').eql('property not found');
            server.close();
            done();
          });
      });
    });
    
    describe('GET /property', () => {
      it('List all property adverts', (done) => {
        const userAgent = {
          email: 'agent@agent.agent',
          first_name: 'Agent',
          last_name: 'Agent',
          password: '123456',
          phoneNumber: '+254733367087',
          address: 'P.O. BOX 22295-00100',
          is_admin: true,
        };
        const userId = UserModel.create(userAgent).id;
        // remove any existing properties from our Property Array
        PropertyModel.properties = [];
        // eslint-disable-next-line no-unused-vars
        const advert1 = PropertyModel.create({
          type: '2 Bedroom',
          state: 'This State',
          city: 'This City',
          address: 'This Address',
          price: 40000.00,
          image_url: 'This Image Url',
          owner: userId,
        });
        // eslint-disable-next-line no-unused-vars
        const advert2 = PropertyModel.create({
          type: '2 Bedroom',
          state: 'This State',
          city: 'This City',
          address: 'This Address',
          price: 40000.00,
          image_url: 'This Image Url',
          owner: userId,
        });
        chai.request(server)
          .get('/api/v1/property')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            assert(Object.keys(res.body).length === 2, 'Number of properties wrong!');
            done();
          });
      });
      it('Show no property adverts message if none posted', (done) => {
        // remove any existing properties from our Property Array
        PropertyModel.properties = [];
        chai.request(server)
          .get('/api/v1/property')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            res.body.should.have.property('error').eql('No property adverts posted');
            done();
          });
      });
    });
    
    describe('GET /property/?type=propertyType', () => {
      it('List all property by given type', (done) => {
        const userAgent = {
          email: 'agent@agent.agent',
          first_name: 'Agent',
          last_name: 'Agent',
          password: '123456',
          phoneNumber: '+254733367087',
          address: 'P.O. BOX 22295-00100',
          is_admin: true,
        };
        const userId = UserModel.create(userAgent).id;
        // remove any existing properties from our Property Array
        PropertyModel.properties = [];
        // eslint-disable-next-line no-unused-vars
        const advert1 = PropertyModel.create({
          type: '1 Bedroom',
          state: '1st State',
          city: '1st City',
          address: '1st Address',
          price: 20000.00,
          image_url: '1st Image Url',
          owner: userId,
        });
        // eslint-disable-next-line no-unused-vars
        const advert2 = PropertyModel.create({
          type: '2 Bedroom',
          state: '2nd State',
          city: '2nd City',
          address: '2nd Address',
          price: 30000.00,
          image_url: '2nd Image Url',
          owner: userId,
        });
        // eslint-disable-next-line no-unused-vars
        const advert22 = PropertyModel.create({
          type: '2 Bedroom',
          state: '22nd State',
          city: '22nd City',
          address: '22nd Address',
          price: 35000.00,
          image_url: '22nd Image Url',
          owner: userId,
        });
        // eslint-disable-next-line no-unused-vars
        const advert3 = PropertyModel.create({
          type: '3 Bedroom',
          state: '3rd State',
          city: '3rd City',
          address: '3rd Address',
          price: 40000.00,
          image_url: '3rd Image Url',
          owner: userId,
        });
        const type2 = '2 Bedroom';
        chai.request(server)
          .get(`/api/v1/property/?type=${type2}`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            assert(Object.keys(res.body).length === 2, 'Number of properties wrong!');
            done();
          });
      });
    
      it('Fail to list all property by given type if parameter type non-existent', (done) => {
        const userAgent = {
          email: 'agent@agent.agent',
          first_name: 'Agent',
          last_name: 'Agent',
          password: '123456',
          phoneNumber: '+254733367087',
          address: 'P.O. BOX 22295-00100',
          is_admin: true,
        };
        const userId = UserModel.create(userAgent).id;
        // eslint-disable-next-line no-unused-vars
        const advert1 = PropertyModel.create({
          type: '1 Bedroom',
          state: '1st State',
          city: '1st City',
          address: '1st Address',
          price: 20000.00,
          image_url: '1st Image Url',
          owner: userId,
        });
        // eslint-disable-next-line no-unused-vars
        const advert2 = PropertyModel.create({
          type: '2 Bedroom',
          state: '2nd State',
          city: '2nd City',
          address: '2nd Address',
          price: 30000.00,
          image_url: '2nd Image Url',
          owner: userId,
        });
        // eslint-disable-next-line no-unused-vars
        const advert22 = PropertyModel.create({
          type: '2 Bedroom',
          state: '22nd State',
          city: '22nd City',
          address: '22nd Address',
          price: 35000.00,
          image_url: '22nd Image Url',
          owner: userId,
        });
        // eslint-disable-next-line no-unused-vars
        const advert3 = PropertyModel.create({
          type: '3 Bedroom',
          state: '3rd State',
          city: '3rd City',
          address: '3rd Address',
          price: 40000.00,
          image_url: '3rd Image Url',
          owner: userId,
        });
        const type2 = '4 Bedroom';
        chai.request(server)
          .get(`/api/v1/property/?type=${type2}`)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            res.body.should.have.property('error').eql('No such property type found');
            done();
          });
      });
    
      it('List all property by given type even when parameter in lower case', (done) => {
        const userAgent = {
          email: 'agent@agent.agent',
          first_name: 'Agent',
          last_name: 'Agent',
          password: '123456',
          phoneNumber: '+254733367087',
          address: 'P.O. BOX 22295-00100',
          is_admin: true,
        };
        const userId = UserModel.create(userAgent).id;
        // remove any existing properties from our Property Array
        PropertyModel.properties = [];
        // eslint-disable-next-line no-unused-vars
        const advert1 = PropertyModel.create({
          type: '1 Bedroom',
          state: '1st State',
          city: '1st City',
          address: '1st Address',
          price: 20000.00,
          image_url: '1st Image Url',
          owner: userId,
        });
        // eslint-disable-next-line no-unused-vars
        const advert2 = PropertyModel.create({
          type: '2 Bedroom',
          state: '2nd State',
          city: '2nd City',
          address: '2nd Address',
          price: 30000.00,
          image_url: '2nd Image Url',
          owner: userId,
        });
        // eslint-disable-next-line no-unused-vars
        const advert22 = PropertyModel.create({
          type: '2 Bedroom',
          state: '22nd State',
          city: '22nd City',
          address: '22nd Address',
          price: 35000.00,
          image_url: '22nd Image Url',
          owner: userId,
        });
        // eslint-disable-next-line no-unused-vars
        const advert3 = PropertyModel.create({
          type: '3 Bedroom',
          state: '3rd State',
          city: '3rd City',
          address: '3rd Address',
          price: 40000.00,
          image_url: '3rd Image Url',
          owner: userId,
        });
        // parameter given in lowercase
        const type2 = '2 bedroom';
        chai.request(server)
          .get(`/api/v1/property/?type=${type2}`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            assert(Object.keys(res.body).length === 2, 'Number of properties wrong!');
            done();
          });
      });
    });
    
    describe('GET /property/:id', () => {
      it('Fetch one specific property advert', (done) => {
        const userAgent = {
          email: 'agent@agent.agent',
          first_name: 'Agent',
          last_name: 'Agent',
          password: '123456',
          phoneNumber: '+254733367087',
          address: 'P.O. BOX 22295-00100',
          is_admin: true,
        };
        const userId = UserModel.create(userAgent).id;
        // remove any existing properties from our Property Array
        PropertyModel.properties = [];
        // eslint-disable-next-line no-unused-vars
        const advert1 = PropertyModel.create({
          type: '2 Bedroom',
          state: 'This State',
          city: 'This City',
          address: 'This Address',
          price: 40000.00,
          image_url: 'This Image Url',
        }, userId);
        const advert2 = PropertyModel.create({
          type: '2 Bedroom',
          state: 'Specific State',
          city: 'Specific City',
          address: 'Specific Address',
          price: 40000.00,
          image_url: 'Specific Image Url',
        }, userId);
        chai.request(server)
          .get(`/api/v1/property/${advert2.id}`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            // Check for some deep copies
            res.body.data.should.have.property('type').eql('2 bedroom');
            res.body.data.should.have.property('state').eql('Specific State');
            res.body.data.should.have.property('city').eql('Specific City');
            res.body.data.should.have.property('address').eql('Specific Address');
            res.body.data.should.have.property('price').eql(40000.00);
            res.body.data.should.have.property('image_url').eql('Specific Image Url');
            res.body.data.should.have.property('ownerEmail');
            res.body.data.should.have.property('ownerPhoneNumber');
            done();
          });
      });
    
      it('Fail to fetch one specific property advert if given invalid property_id', (done) => {
        const invalidPropertyId = 0.01;
        chai.request(server)
          .get(`/api/v1/property/${invalidPropertyId}`)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error').eql('property not found');
            server.close();
            done();
          });
      });
    });
    