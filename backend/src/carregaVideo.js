let Vimeo = require("vimeo").Vimeo;
let client = new Vimeo(
  "1f32a70e79cdd37c839ec7bc10dfe8084a441363",
  "qRcFpATB5fTkmMGSADBI0nDw6qye1QAi18rENihmei6MONa4RAdtRh6OECEsjonjKLx+IdUM+1QwJH8dee3sCFoQ1UpyNIn/TBGUUbodUdeAZtfsFX0kL1Eh8cVubB25",
  "843e3ee41632fcd419ff986e9658a29c"
);

client.request(
  {
    method: "GET",
    path: "/tutorial",
  },
  function (error, body, status_code, headers) {
    if (error) {
      console.log(error);
    }

    console.log(body);
  }
);

let file_name = "downloads/pantera.mkv";
client.upload(
  file_name,
  {
    name: "Filme Video enviado",
    description: "Descrição do filme enviado aqui.",
  },
  function (uri) {
    console.log("Your video URI is: " + uri);
    statusTranscodificacao(uri)
  },
  function (bytes_uploaded, bytes_total) {
    var percentage = ((bytes_uploaded / bytes_total) * 100).toFixed(2);
    console.log(bytes_uploaded, bytes_total, percentage + "%");
  },
  function (error) {
    console.log("Failed because: " + error);
  }
);

function statusTranscodificacao(uri){

    client.request(uri + '?fields=transcode.status', function (error, body, status_code, headers) {
        if (body.transcode.status === 'complete') {
          console.log('Your video finished transcoding.')
        } else if (body.transcode.status === 'in_progress') {
          console.log('Your video is still transcoding.')
        } else {
          console.log('Your video encountered an error during transcoding.')
        }
      });

      client.request(uri + '?fields=link', function (error, body, statusCode, headers) {
        if (error) {
          console.log('There was an error making the request.')
          console.log('Server reported: ' + error)
          return
        }
      
        console.log('Your video link is: ' + body.link)
      });

}
