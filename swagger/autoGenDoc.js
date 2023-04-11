const mongooseToSwagger = require('mongoose-to-swagger');
const swaggerAutoGen = require('swagger-autogen')({
  openapi:'3.0.0',
  language: 'pt-BR'
});

const outputFile = './swagger_output.json';
const endpointsFiles = ['../index.js', '../src/routes.js'];

let doc = {
  info: {
    version: "1.0.0",
    title: "BoardTasks API",
    description: "BoardTasks API Documentation"
  },
  servers: [
    {
      url: "http://localhost:4000",
      description: "Localhost server"
    },
    {
      url: "http://add-here",
      description: "Production server"
    }
  ],
  consumes: ['application/json'],
  produces: ['application/json'],
  // securityDefinitions:{
  //   api_key: {
  //     type: "apiKey",
  //     name: "apiKey",
  //     in: "header"
  //   }
  // },
  // components:{
  //   schemas:{
  //     Usuario: mongooseToSwagger(EsquemaUsuario),
  //     Tarefa: mongooseToSwagger(TarefaUsuario)
  //   }
  // }
}

swaggerAutoGen(outputFile, endpointsFiles, doc).then(()=>{
  console.log("Documentação do Swagger gerada encontra-se em: " + outputFile);
  if(process.env.NODE_ENV !== 'production'){
    require("../index.js"); 
  }
})