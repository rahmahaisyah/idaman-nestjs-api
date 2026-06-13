const fs = require('fs');

const collection = {
  info: {
    name: 'Idaman NestJS API - Enterprise Edition',
    description: 'Koleksi lengkap API IDAMAN beserta Dokumentasi (Saved Responses) untuk kemudahan integrasi Frontend.',
    schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
  },
  item: [
    {
      name: 'Authentication',
      item: [
        {
          name: 'Register User',
          request: {
            method: 'POST',
            header: [{ key: 'Content-Type', value: 'application/json' }],
            body: { mode: 'raw', raw: JSON.stringify({ email: 'admin@idaman.go.id', password: 'password123', name: 'Administrator' }, null, 2) },
            url: { raw: '{{base_url}}/auth/register', host: ['{{base_url}}'], path: ['auth', 'register'] }
          },
          response: [
            {
              name: 'Success 201',
              status: 'Created',
              code: 201,
              _postman_previewlanguage: 'json',
              header: [{ key: 'Content-Type', value: 'application/json' }],
              body: JSON.stringify({ statusCode: 201, message: 'Success', data: { id: 'uuid-1234', email: 'admin@idaman.go.id', name: 'Administrator' } }, null, 2)
            },
            {
              name: 'Email Already Exists 409',
              status: 'Conflict',
              code: 409,
              _postman_previewlanguage: 'json',
              header: [{ key: 'Content-Type', value: 'application/json' }],
              body: JSON.stringify({ statusCode: 409, message: 'Email already exists', error: 'Conflict' }, null, 2)
            }
          ]
        },
        {
          name: 'Login',
          event: [
            {
              listen: 'test',
              script: {
                exec: [
                  'var jsonData = pm.response.json();',
                  'if (jsonData.data && jsonData.data.access_token) {',
                  '    pm.collectionVariables.set(\\'jwt_token\\', jsonData.data.access_token);',
                  '} else if (jsonData.access_token) {',
                  '    pm.collectionVariables.set(\\'jwt_token\\', jsonData.access_token);',
                  '}'
                ],
                type: 'text/javascript'
              }
            }
          ],
          request: {
            method: 'POST',
            header: [{ key: 'Content-Type', value: 'application/json' }],
            body: { mode: 'raw', raw: JSON.stringify({ email: 'admin@idaman.go.id', password: 'password123' }, null, 2) },
            url: { raw: '{{base_url}}/auth/login', host: ['{{base_url}}'], path: ['auth', 'login'] }
          },
          response: [
            {
              name: 'Success 200',
              status: 'OK',
              code: 200,
              _postman_previewlanguage: 'json',
              header: [{ key: 'Content-Type', value: 'application/json' }],
              body: JSON.stringify({ statusCode: 200, message: 'Success', data: { access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' } }, null, 2)
            },
            {
              name: 'Unauthorized 401',
              status: 'Unauthorized',
              code: 401,
              _postman_previewlanguage: 'json',
              header: [{ key: 'Content-Type', value: 'application/json' }],
              body: JSON.stringify({ statusCode: 401, message: 'Unauthorized' }, null, 2)
            }
          ]
        }
      ]
    },
    {
      name: 'Users',
      item: [
        {
          name: 'Get Me (Profile)',
          request: {
            auth: { type: 'bearer', bearer: [{ key: 'token', value: '{{jwt_token}}', type: 'string' }] },
            method: 'GET',
            header: [],
            url: { raw: '{{base_url}}/users/me', host: ['{{base_url}}'], path: ['users', 'me'] }
          },
          response: [
            {
              name: 'Success 200',
              status: 'OK',
              code: 200,
              _postman_previewlanguage: 'json',
              header: [{ key: 'Content-Type', value: 'application/json' }],
              body: JSON.stringify({ statusCode: 200, message: 'Success', data: { id: 'uuid-1234', email: 'admin@idaman.go.id', name: 'Administrator' } }, null, 2)
            }
          ]
        },
        {
          name: 'Get All Users',
          request: {
            auth: { type: 'bearer', bearer: [{ key: 'token', value: '{{jwt_token}}', type: 'string' }] },
            method: 'GET',
            header: [],
            url: { raw: '{{base_url}}/users', host: ['{{base_url}}'], path: ['users'] }
          },
          response: [
            {
              name: 'Success 200',
              status: 'OK',
              code: 200,
              _postman_previewlanguage: 'json',
              header: [{ key: 'Content-Type', value: 'application/json' }],
              body: JSON.stringify({ statusCode: 200, message: 'Success', data: [{ id: 'uuid-1234', email: 'admin@idaman.go.id', name: 'Administrator' }] }, null, 2)
            }
          ]
        }
      ]
    },
    {
      name: 'Referensi TSL (Taxonomy)',
      item: [
        {
          name: 'Create Referensi TSL',
          request: {
            auth: { type: 'bearer', bearer: [{ key: 'token', value: '{{jwt_token}}', type: 'string' }] },
            method: 'POST',
            header: [{ key: 'Content-Type', value: 'application/json' }],
            body: {
              mode: 'raw',
              raw: JSON.stringify({
                jenis: 'satwa_liar',
                namaDaerah: 'Harimau Sumatera',
                namaIlmiah: 'Panthera tigris sumatrae',
                kingdom: 'Animalia',
                divisi: 'Chordata',
                kelas: 'Mammalia',
                ordo: 'Carnivora',
                famili: 'Felidae',
                genus: 'Panthera',
                spesies: 'P. tigris sumatrae',
                statusCites: 'apendiks_i',
                statusIucn: 'sangat_terancam_punah',
                statusPerlindunganNasional: 'dilindungi'
              }, null, 2)
            },
            url: { raw: '{{base_url}}/referensi-tsl', host: ['{{base_url}}'], path: ['referensi-tsl'] }
          },
          response: [
            {
              name: 'Success 201',
              status: 'Created',
              code: 201,
              _postman_previewlanguage: 'json',
              header: [{ key: 'Content-Type', value: 'application/json' }],
              body: JSON.stringify({ statusCode: 201, message: 'Success', data: { id: 'uuid-tsl-123', jenis: 'satwa_liar', namaDaerah: 'Harimau Sumatera' } }, null, 2)
            },
            {
              name: 'Validation Error 400',
              status: 'Bad Request',
              code: 400,
              _postman_previewlanguage: 'json',
              header: [{ key: 'Content-Type', value: 'application/json' }],
              body: JSON.stringify({ message: ['statusCites must be one of the following values: non_apendiks, apendiks_i...'], error: 'Bad Request', statusCode: 400 }, null, 2)
            }
          ]
        },
        {
          name: 'Get All Referensi TSL',
          request: {
            auth: { type: 'bearer', bearer: [{ key: 'token', value: '{{jwt_token}}', type: 'string' }] },
            method: 'GET',
            header: [],
            url: { raw: '{{base_url}}/referensi-tsl', host: ['{{base_url}}'], path: ['referensi-tsl'] }
          },
          response: [
             {
              name: 'Success 200',
              status: 'OK',
              code: 200,
              _postman_previewlanguage: 'json',
              header: [{ key: 'Content-Type', value: 'application/json' }],
              body: JSON.stringify({ statusCode: 200, message: 'Success', data: [{ id: 'uuid-tsl-123', namaDaerah: 'Harimau Sumatera' }] }, null, 2)
            }
          ]
        }
      ]
    },
    {
      name: 'Penangkaran (with Azure Upload)',
      item: [
        {
          name: 'Create Penangkaran',
          request: {
            auth: { type: 'bearer', bearer: [{ key: 'token', value: '{{jwt_token}}', type: 'string' }] },
            method: 'POST',
            header: [],
            body: {
              mode: 'formdata',
              formdata: [
                { key: 'facilityName', value: 'Penangkaran Harimau Lestari', type: 'text' },
                { key: 'facilityAddress', value: 'Hutan Lindung Sumatera', type: 'text' },
                { key: 'referensiTslId', value: 'PASTE_UUID_REFERENSI_TSL', type: 'text' },
                { key: 'permitNumber', value: 'SK-12345', type: 'text' },
                { key: 'directorName', value: 'Budi Santoso', type: 'text' },
                { key: 'permitFile', type: 'file', src: [] }
              ]
            },
            url: { raw: '{{base_url}}/penangkaran', host: ['{{base_url}}'], path: ['penangkaran'] }
          },
          response: [
            {
              name: 'Success 201 (Azure File)',
              status: 'Created',
              code: 201,
              _postman_previewlanguage: 'json',
              header: [{ key: 'Content-Type', value: 'application/json' }],
              body: JSON.stringify({ statusCode: 201, message: 'Success', data: { id: 'uuid-penangkaran', facilityName: 'Penangkaran Harimau', permitFileUrl: 'https://fileproting.blob.core.windows.net/idaman-nest-api/filesk/1781305139341-837753803.pdf' } }, null, 2)
            },
            {
              name: 'Foreign Key Error 400',
              status: 'Bad Request',
              code: 400,
              _postman_previewlanguage: 'json',
              header: [{ key: 'Content-Type', value: 'application/json' }],
              body: JSON.stringify({ message: 'Referensi TSL dengan UUID tersebut tidak terdaftar di database.', error: 'Bad Request', statusCode: 400 }, null, 2)
            },
            {
              name: 'Duplicate SK Error 400',
              status: 'Bad Request',
              code: 400,
              _postman_previewlanguage: 'json',
              header: [{ key: 'Content-Type', value: 'application/json' }],
              body: JSON.stringify({ message: 'Nomor SK (permitNumber) tersebut sudah terdaftar. Gunakan nomor SK yang unik.', error: 'Bad Request', statusCode: 400 }, null, 2)
            }
          ]
        }
      ]
    }
  ],
  variable: [
    { key: 'base_url', value: 'http://localhost:3000' },
    { key: 'jwt_token', value: '' }
  ]
};

fs.writeFileSync('Idaman_NestJS_API.postman_collection.json', JSON.stringify(collection, null, 2));
console.log('Postman collection with examples generated successfully!');

