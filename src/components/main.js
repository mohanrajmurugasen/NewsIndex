import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import authAxios from './interceptors/interceptor';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import YouTube from 'react-youtube'
var getYouTubeID = require('get-youtube-id')

export default function Main() {
    const [data, setData] = useState([])
    const fetch = async() => {
        await authAxios
        .post('getAllIndia')
        .then((res) => {
            setData(res.data)
            console.log(res.data)
        })
        .catch((err) => {
            console.error(err.message)
        })
    }
    useEffect(() => {
        fetch()
    }, [])
    const opts = {
        height: '120',
        width: '140',
        playerVars: {
          autoplay: false,
        },
    }
  return (
    <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg" style={{marginTop:100,textAlign:'center'}}>
            { data.map(itm => (
                <Card key={itm.id} sx={{ minWidth: 275,marginBottom:20 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {itm.heading}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {itm.author}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {itm.description}
                        </Typography>
                        <Typography variant="body2">
                            {itm.content}
                        </Typography>
                        <img src={`http://18.222.213.104:5000/${itm.image}`} alt='mn' />
                        <YouTube videoId={getYouTubeID(itm.video)} opts={opts} />
                    </CardContent>
                </Card>
            )) }
        </Container>
    </React.Fragment>
  );
}