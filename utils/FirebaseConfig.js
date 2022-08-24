const { initializeApp } =require("firebase/app") ;
const { getStorage ,} =require("firebase/storage") ;

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    type: "service_account",
    project_id: "tentangdapur2022",
    private_key_id: "2286acac357613afbfef00e2355fe9c28661e3dc",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCxXYDY5Q99qNtj\n3ME3adpSsIS3/8oLa8EqnKDFEHK5PYgaG+Rtwpv80u7IBymfvx2DErhLpZuWKx0p\nFPiwgrVdS03OPBlJCKRCry0hrSIumFmDgsEvvmxlKHKh7892h1RJcscZoz36xhVv\ny2C8JrZ5wvDtCGQaztxUzUrQPvqNovpUYarVWNcX6H1y/cTO+bas7EkXw/Ivnudz\nbJTjzIS98aW3h7ItKNYUKbtevgHC9J7fvmoMwKOQe55RhJLLnK7aGennf83iyg9H\naYA8XJfs2YZfR21k/RxbW10Kv4HtLweH8wggQjsPZhnwMtv0JGEJ4nKZ1KbB4uAK\ncMBzA62dAgMBAAECggEAB6dNRA6+WGHM9cY04DtFHIRZdccn5M5Fi50uotJO4Qdy\ntA24EbRwHrzLaP5GIYqRr3JDWaBP0m8R1w/8m0FIqjnxpZCaVrh0vhvpCqb57qDM\nXAxsYa8J5mOUbsB2Z1r3nCPDy6trpUKe8jAIgJX7Ec4Dr3bJOw7qGw6wx8Ov9CSd\n1SYOe/Zx8VPu8G3zaWUrC/S8kIR5mYu0yuVCIYhhs555k5wsNcn4Y3pjV+yqjHkQ\n9x6zIBHriVjUMZQCGbYibor6NuN1yDPgvRVdw6v+i8Vn4Dxxkj19SC4yQTCnc9Ol\nWm8bVwt4k9T6WKXmy2gh6jtdm0CDWUKo/eXslVdcUQKBgQDhp3WWsj5vdQsKPGVy\nwouVJepFC8j2ZTvhGgZqPBPjjSOUSfAQOOWUymOcXg5Uq0eO+vUTuJXPg2LogiGq\nzkYwxpvTLnDWl5W6rAOiiXLqBTqPvpF0V2zPOd5AAolOvehY9CIy7GLvqUM685C4\nHEXCiFDdXUKmGleN5C3Kt7TOuwKBgQDJN50s8FNxbup2E8Djq1YxW5OHvDnLz7My\nprOPyeSDIweIXjnd4lKgv+1VeC0ZQVoDNB2AcWb4sF4XuDGwy7W1xvaY6FdS7xUa\n8njMliXyuUcBtDwlWPbRJMt3nGgcVEqO4xKSvqlgdqbWgvKTP+M07EUyJe29JQI+\n6HEVTN/rhwKBgQDAfju/G7pLFgse5jqcVP0BdGCOGemK1vznn23NfgZxXNr3CsOw\n8vhVnviuUUXkUGAwxj/+XL3fUXM0aJ4TuPcDcMlIsxsq1BC0Nzy6kInovCEisiwe\nlN2LQRAohoFfHH1yNIBf9GrJixiA13mitOuFcQeabo4GZ/48WmP9xAyHNQKBgQCX\nKMlRpiT5VRqbo5FHN0KkB6iX0oYUny5+gY7pGQEqppkVD7wm/MuX6TbQ+1vd2iNV\nvsPe5tI1RsEYzo29w/r42MQN8JURP3w6Zybqgm11n0xBcnWwlNmuGhcj/wKTLZtp\nJhqg1MyHI/uHsI2sotT7v/bnimjDq9a5DYNOPhcFZwKBgGfaqnYyb5f4+eXzEj/O\nnqGCStSwA5yyGkArJjRazmsDHhK/YF5JErjOt1x22MzeAHYhgbUBMM1yZQw7+qyP\ntwVtLvw6HLVr4WFJTYt10zebqKo/FBbLhVY5JlMQinI+6uGWnzqQtMzl9KIHdzx2\n0kOPpYuuTLabJTu+xKh99Cir\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-ruvs5@tentangdapur2022.iam.gserviceaccount.com",
    client_id: "112615543517405614794",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ruvs5%40tentangdapur2022.iam.gserviceaccount.com",
  storageBucket: 'gs://tentangdapur2022.appspot.com'
};

const app = initializeApp(firebaseConfig);


exports.storage = getStorage(app);
