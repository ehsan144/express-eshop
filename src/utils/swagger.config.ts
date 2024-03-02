import swaggerJSDoc from "swagger-jsdoc";

const options = {
    failOnErrors: true,
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hello World',
            version: '1.0.0',
        },
    },
    apis: ['./src/**/router.ts', './src/**/models/*.ts', './src/**/**/**/model.ts'],
};

const openapiSpecification = swaggerJSDoc(options);
export default openapiSpecification;