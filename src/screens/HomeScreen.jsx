import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product.jsx';
import axios from 'axios';

const client_id = '09977a71706b49f090b82c3073f78826';
const redirect_uri = 'http://localhost:3001';
const authEndpoint = 'https://accounts.spotify.com/authorize';
const responseType = 'token';
const scope = 'user-library-read';

const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      let parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

const HomeScreen = () => {
  const [token, setToken] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = '';
    const _token = hash.access_token;

    if (_token) {
      setToken(_token);
      setIsLoggedIn(true);

      axios
        .get('https://api.spotify.com/v1/browse/categories/classical/playlists', {
          headers: {
            Authorization: `Bearer ${_token}`,
          },
        })
        .then((response) => {
          const playlistId = response.data.playlists.items[0].id;

          axios
            .get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
              headers: {
                Authorization: `Bearer ${_token}`,
              },
            })
            .then((res) => {
              const classicalTracks = res.data.items.filter(item => item.track.preview_url);
              const products = classicalTracks.map(item => ({
                _id: item.track.id,
                name: item.track.name,
                image: item.track.album.images[0].url,
                music: item.track.preview_url,
              }));
              setProducts(products);
            });
        })
        .catch((error) => console.error('Error fetching classical playlists', error));
    }
  }, []);

  const handleLogin = () => {
    window.location = `${authEndpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=${responseType}&show_dialog=true`;
  };

  return (
    <>
      <h1>Famous Classical Songs</h1>
      {!isLoggedIn && (
        <button onClick={handleLogin}>Login to Spotify</button>
      )}
      
      {isLoggedIn && (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
