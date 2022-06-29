import Fastify from 'fastify';

import { users } from './users';

const fastify = Fastify({
  logger: true,
});
fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
});
fastify.register(import('@fastify/cookie'));

fastify.post('/uppercase', (request, reply) => {
  const str = request.body.toUpperCase();

  if (str.includes('FUCK')) {
    return reply.status(403).send('unresolved')
  } else {
    return reply.status(200).send(str);
  }
});

fastify.post('/lowercase', (request, reply) => {
  const str = request.body.toLowerCase();
  if (str.includes('fuck')) {
    return reply.status(403).send('unresolved')
  } else {
    return reply.status(200).send(str);
  }
});

fastify.get('/user/:id', (request, reply)=>{
  
  let id = request.params.id;

  if (users[id]) {
    return reply.send(users[id]);
  }
  return reply.code(400).send('User not exist');
});

fastify.get('/users', function (request, reply) {
  let usersArray = Object.values(users);
  let { filter, value } = request.query;

if (request.query) {
    usersArray = usersArray.filter(function (user) {
      return user[filter] == value;
    })
  }

  console.log(usersArray);

  return reply.send(usersArray);
});
export default fastify;
