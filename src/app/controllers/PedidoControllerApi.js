/* eslint-disable func-names */
/* eslint-disable operator-assignment */
import Request from 'request';

class PedidoControllerApi {
  async pegaCarro(id) {
    let url = 'http://api-test.bhut.com.br:3000/api/cars/';
    url = url + id;
    return new Promise(function(resolve, reject) {
      Request(url, function(error, res, body) {
        if (!error && res.statusCode === 200) {
          resolve(JSON.parse(body));
        } else {
          reject(error);
        }
      });
    });
  }
}

export default new PedidoControllerApi();
