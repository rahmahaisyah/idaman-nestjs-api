import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Auth & API Token (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  const testEmail = `tester-${Date.now()}@idaman.go.id`;
  const testPassword = `Pass${Date.now()}`;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/auth/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: testEmail,
        password: testPassword,
        name: 'Token Tester',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body.email).toEqual(testEmail);
        expect(res.body.password).toBeUndefined();
      });
  });

  it('/auth/login (POST) - Uji Coba Generate Token', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: testEmail, password: testPassword })
      .expect(200)
      .expect((res) => {
        expect(res.body.access_token).toBeDefined();
        jwtToken = res.body.access_token; // <--- INI ADALAH PROSES MENGAMBIL TOKEN E2E
      });
  });

  it('/users/me (GET) - Uji Coba Tanpa Token (Harus Gagal 401)', () => {
    return request(app.getHttpServer()).get('/users/me').expect(401); // Ditolak karena tidak ada JWT
  });

  it('/users/me (GET) - Uji Coba Memakai Token (Harus Sukses 200)', () => {
    return request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', `Bearer ${jwtToken}`) // <--- MENYISIPKAN TOKEN JWT KE HEADER
      .expect(200)
      .expect((res) => {
        expect(res.body.email).toEqual(testEmail);
      });
  });
});
