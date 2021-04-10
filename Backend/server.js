const PORT = 3000;
const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const formidable = require("formidable")
const utils = require('./utils.js')
const path = require("path");
// |=====================[ DATABASE ]=====================|
const Datastore = require('nedb');

// |=====================[ DB INIT ]=====================|
let collection = new Datastore({
  filename: 'db/database.db',
  autoload: true
});
// |=====================[ / DB INIT ]===================|

// inicjacja obiektu z danymi muzycznymi
const musicObject = {
  covers: [],
  dirs: [],
  currentListen: [],
  currentOpen: [],
  playlist: []
};

// czytanie pojedyńczych albumów
const readAlbum = albumName => {
  return new Promise((resolve, reject) => {
    return fs.readdir(__dirname + '/static/mp3/' + albumName, (err, files) => {
      if (err) {
        return reject(err);
      }
      const tracks = [];
      files.forEach(file => {
        if (file.split('.').pop() != 'mp3') return;

        const singleTrack = {};

        singleTrack.album = albumName;
        singleTrack.name = file;

        const stats = fs.statSync(__dirname + '/static/mp3/' + albumName + '/' + file);
        singleTrack.size = (stats.size / 1024 / 1024).toFixed(2) + 'MB';

        tracks.push(singleTrack);
      });

      // aktualizacja listy z obecnymi plikami
      musicObject.currentOpen = tracks;

      return resolve(tracks);
    });
  });
};

// czytanie folderów z muzyką
fs.readdir(__dirname + '/static/mp3/', (err, dirs) => {
  if (err) {
    return console.log(err);
  }

  //dodawanie folderów do tablicy
  dirs.forEach(dir => {
    musicObject.dirs.push(dir);

    // czytanie okładek
    musicObject.covers.push(dir + '/cover.jpg');
  });

  // czytanie plików z pierwszego folderu
  readAlbum(musicObject.dirs[0]).then(tracks => {
    musicObject.currentOpen = tracks;
  });
});


collection.find({ }, function (err, docs) {
  //zwracam dane w postaci JSON
  // console.log("----- tablica obiektów pobrana z bazy: \n")
  // console.log(docs)
  docs.forEach( row =>{
    const { album, name, size } = row;
      musicObject.playlist.push({ album: album, name: name, size: size });
  })
  // console.log("----- sformatowany z wcięciami obiekt JSON: \n")
  // console.log(JSON.stringify({ "docsy": docs }, null, 5))
});




// obsługa zapytania POST
const servResponse = (req, res) => {
  console.log(req.method + req.url)
  let allData = '';

  // zbieranie fragmentów danych
  req.on('data', data => {
    allData += data;
  });

  req.on('end', data => {
    const finish = qs.parse(allData);

    res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
    if (finish.coversRequest) {
      console.log("REQ")
      // WYSYŁANIE OKŁADEK
      res.end(JSON.stringify(musicObject.covers));
    }
    else if (finish.albumName) {
      // WYSYŁANIE LISTY Z ALBUMEM
      if (finish.albumName == 'first') {
        // jeśli jest to pierwsze żądanie to wysyłamy pierwszy folder do użytkownika
        readAlbum(musicObject.dirs[0]).then(tracks => {
          res.end(JSON.stringify(tracks));
        });
      }
      else if (finish.albumName == 'playlist') {
        res.end(JSON.stringify(musicObject.playlist));
      }
      else {
        // w przeciwnym razie wysyłamy to co sobie zażyczył
        readAlbum(finish.albumName).then(tracks => {
          res.end(JSON.stringify(tracks));
        });
      }
    }
    else if (finish.updateListening) {
      const albumName = finish.listeningAlbumName;
      if (albumName == 'playlist') {
        musicObject.currentListen = musicObject.playlist;
        return res.end('cyk playlista');
      }
      readAlbum(albumName).then(tracks => {
        musicObject.currentListen = tracks;
        res.end('aktualizacja aktywnego albumu');
      });
    }
    else if (finish.changeSong) {
      const current = finish.currentSong;
      let currentIndex = musicObject.currentListen.findIndex(song => song.name == current);
      if (finish.returnSong == 'prev') {
        //* POPRZEDNIA
        // możemy jechać do tyłu, ale obecny index musi być o 1 większy od ostatniego w tablicy
        if (currentIndex == 0) currentIndex = musicObject.currentListen.length;
        const previousSong = musicObject.currentListen[currentIndex - 1];
        const newSrc = `/${previousSong.album}/${previousSong.name}`;
        res.end(newSrc);
      } else {
        //* NASTĘPNA
        // możemy jechać do przodu ale obecny index musi być o 1 mniejszy od zerowego
        if (currentIndex == musicObject.currentListen.length - 1) currentIndex = -1;
        const nextSong = musicObject.currentListen[currentIndex + 1];
        try {
          const newSrc = `/${nextSong.album}/${nextSong.name}`;
          res.end(newSrc);
        } catch (err) {
          console.log('wystąpił błąd', err);
          res.end('#');
        }
      }
    }
    else if (finish.addToPlaylist) {
      const { album, name, size } = finish;

      let doc = {
        album: album,
        name: name,
        size: size
      };


      // sprawdzanie czy piosenka nie jest już w playliście
      let isInPlaylist = false;
      musicObject.playlist.forEach(song => {
        if (song.album == album && song.name == name && song.size == size) {
          isInPlaylist = true;
        }
      });

      if (isInPlaylist) return res.end('już jest w playliście');

      musicObject.playlist.push({ album: album, name: name, size: size });

      //|=====================[ Push do Bazy ]=====================|

      collection.insert(doc, function (err, newDoc) {
        console.log("dodano dokument (obiekt):")
        console.log(newDoc)
        console.log("losowe id dokumentu: "+newDoc._id)
      });


      res.end('dodano do playlisty');
    }
  });
};


const servResponseUpload = (req,res) => {
  let allData = "";

  req.on("data", function (data) {
    console.log("data: " + data)
    allData += data;
  })


  req.on("end", function (data) {
    let finish = qs.parse(allData)
    let plik = finish.name;
    console.log("==============================?>",finish.name)
    // res.writeHead(200, {"Content-Type": "text/plain"});
    // res.end(`${plik}`)
    // res.end("Odsyłam do przeglądarki" + JSON.stringify(finish));
  })
}

const server = http.createServer((req, res) => {
  // przesyłanie konkretnych plików do klienta
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');

  switch (req.method) {
    case 'GET':
      // dostajemy żądanie w którym każda spacja jest zamieniona na %20 więc odwracamy to
      const request = decodeURI(req.url);

      // rozszerzenie pliku zawsze będzie ostatnim elementem nazwy po kropce
      const extention = request.split('.').pop();

      switch (extention) {
        case '/':
          fs.readFile('static/index.html', (error, data) => {
            if (error) return;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
          });
          break;

        case '/tmp':
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(musicObject.covers));
          break

        case 'css':
          fs.readFile('static' + request, (error, data) => {
            if (error) return;
            res.writeHead(200, { 'Content-Type': 'text/css' });
            res.write(data);
            res.end();
          });
          break;

        case 'js':
          fs.readFile('static' + request, (error, data) => {
            if (error) return;
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.write(data);
            res.end();
          });
          break;

        case 'jpg':
          fs.readFile('static/mp3/' + request, (error, data) => {
            if (error) return;
            res.writeHead(200, { 'Content-Type': 'image/jpg' });
            res.write(data);
            res.end();
          });
          break;

        case 'mp3':
          fs.readFile('static/mp3' + request, (error, data) => {
            if (error) return;

            let stats = fs.statSync('static/mp3' + request)
            res.writeHead(200, { 'Content-Type': 'audio/mpeg',"Content-Length": stats.size, "Accept-Ranges": "bytes" });
            res.write(data);
            res.end();
          });
          break;

        case 'png':
          fs.readFile('static/icons' + request, (error, data) => {
            if (error) return;
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.write(data);
            res.end();
          });
          break;

        case '/admin':
          fs.readFile('static/admin.html', (error, data) => {
            if (error) return;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
          });
          break;
      }
      // koniec case'a dla GETa
      break;

    case 'POST':
      console.log("URL: ", req.url)
      if (req.url === '/upload'){

        let form = formidable({})
        let start = 0;
        let stop = 0;
        let total = 0;
        let dir = './static/upload/album-'+utils.getCurrentDate();
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir);
        }
        // form.uploadDir = "static/upload/"   // katalog na zuploadowane pliki
        form.uploadDir = dir  // katalog na zuploadowane pliki
        form.keepExtensions = true          // zapis z rozszerzeniem pliku
        form.multiples = true

        form.on("file", function () {
          console.log("file" + new Date().getTime())
        })

        form.on("progress", function (bytesReceived, bytesExpected) {
          console.log("progress ", bytesExpected, bytesReceived, new Date().getTime())
        })

        form.on("fileBegin", function (name, value) {
          // start = new Date().getTime()
          start = Date.now();
          console.log("fileBegin: " + start)
        })

        form.on("end", function () {
          // stop = new Date().getTime()
          stop = Date.now();
          console.log("end: " + stop)
          total = (stop-start);
          console.log('Czas załadowania pliku na server w [s]', total )
        })

        form.parse(req, function (err, fields, files) {
          console.log("FILES =>>>>>>>", files);
          files.file.forEach( f=>{
            fs.rename('./'+f.path, form.uploadDir +'/'+ f.name, function(err) {
              if (err)
                throw err;
              console.log('renamed complete');
            });
          })
          // fs.rename(files.file.path, form.uploadDir +'/'+ files.file.name, function(err) {
          //   if (err)
          //     throw err;
          //   console.log('renamed complete');
          // });


          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ fields, files }, null, 2));
        });
      } else{
        servResponse(req, res);
        // console.log(musicObject)
      }
      break;
  }
});

server.listen(PORT, () => {
  console.log('serwer startuje na porcie ' + PORT);
});
