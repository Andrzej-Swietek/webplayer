const PORT = 3000;
const http = require('http');
const fs = require('fs');
const qs = require('querystring');

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
    console.log(finish)
    if (finish.coversRequest) {
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
        // w przeciwnym razie wysyłamy mu to co sobie zażyczył
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
        // możemy jechać do tyłu, ale obecny index musi być o 1 większy od ostatniego w tablicy
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

      // sprawdzanie czy piosenka nie jest już w playliście
      let isInPlaylist = false;
      musicObject.playlist.forEach(song => {
        if (song.album == album && song.name == name && song.size == size) {
          isInPlaylist = true;
        }
      });

      if (isInPlaylist) return res.end('już jest w playliście');

      musicObject.playlist.push({ album: album, name: name, size: size });
      res.end('dodano do playlisty');
    }
  });
};

const server = http.createServer((req, res) => {
  // przesyłanie konkretnych plików do klienta
  res.setHeader("Access-Control-Allow-Origin", "*");

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
            res.writeHead(200, { 'Content-Type': 'audio/mpeg' });
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
      }
      // koniec case'a dla GETa
      break;

    case 'POST':
      servResponse(req, res);
      console.log(musicObject)
      break;
  }
});

server.listen(PORT, () => {
  console.log('serwer startuje na porcie ' + PORT);
});
